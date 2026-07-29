---
name: atomic-commits
description: Split the current working tree into focused commits, grouping related files and changes together, with Conventional Commit messages in the style of this repository; proposes a branch split when the groups are independent, and typechecks before committing. Use when the user asks to commit their changes, to commit work spread across several fronts, to group related changes into commits, or says things like "faça o commit das changes e junte em commits arquivos/alterações relacionadas".
---

# Atomic Commits

Turn a messy working tree — several unrelated fronts edited in one session — into a sequence of commits where **each commit is one coherent change**, and where the files that belong to that change are committed together.

## Non-negotiable rules

- **Never push.** Create the commits and stop. The user pushes.
- **Never amend, reset, rebase or stash.** Only `git add`, `git commit` and — with explicit approval — `git switch -c`.
- **Never `git add -A` / `git add .`** Stage each group with explicit pathspecs so nothing leaks between commits.
- **Never commit secrets**: `.env`, `.env.test`, keys, credentials. If one shows up in the working tree, leave it uncommitted and say so in the summary. The CI secrets scan is non-blocking, so it will not catch this for you.
- **Never bypass the hook.** Messages are validated by commitlint through the husky `commit-msg` hook. A rejected message means **no commit was created** — fix the message and commit again. Do not reach for `--no-verify` or `HUSKY=0`.
- **Leave nothing behind silently.** Every changed file either lands in a commit or is reported as intentionally skipped.

## Step 1: read the whole working tree

The git root is one level **above** `app/`, and the repo also holds `infra/` and `hous3-pipes.yml`. Running `git status` from `app/` hides changes outside it, so always work from the root:

```bash
cd "$(git rev-parse --show-toplevel)"
git status --porcelain
git diff --stat && git diff --cached --stat
git log --pretty=format:'%s' -20
```

Then read the actual diff of every group before writing its message — `git diff -- <paths>`. The message must describe what the code does now, not what the filenames suggest.

Anything already staged by the user is a signal, not a constraint: fold it into whichever group it belongs to.

## Step 2: group the changes

Aim for **the smallest number of commits where each one tells a single story**. Over-splitting (one commit per file, or one per layer) is as wrong as one giant commit.

**Belongs in the same commit:**

- A vertical slice of one feature across layers: `domain/` + `application/` + `api/` + `infra/` of the same module.
- Tests with the code they cover (`__tests__/@unit/...` alongside the entity, `__tests__/@integration/...` alongside the handler).
- `schema.prisma` with its migration in `src/infra/database/@prisma/migrations/`.
- A rename or moved file with the import updates it forced.
- A new DTO with the controller and handler that use it.

**Belongs in a separate commit:**

- Two different modules changed for unrelated reasons.
- A refactor and a behavior change — never mix `refactor:` with `feat:`/`fix:`.
- Formatting-only or Prettier churn → its own `style:` commit.
- Seed data (`src/infra/database/seeds/*.sql`) → `chore:` unless the seed exists to support the feature in the same commit.
- Docs, ADRs (`docs/adrs/`), `README.md`, `AGENTS.md`, `.cursor/` rules and skills → `docs:`/`chore:`.
- Dependency bumps (`package.json`, `yarn.lock`) → `chore(deps):`.

**Order the commits so each one is coherent on its own**: schema/migration → domain → application → api → tests → seeds → docs.

If one file mixes changes belonging to two groups, do **not** try to split the hunks (`git add -p` is interactive and unavailable). Put the file with the group that dominates its diff and mention the mix in the summary.

## Step 3: decide commits or separate branches

Well-split commits inside one branch still ship as **one PR, reviewed as a whole and deployed as one unit** — the fix cannot go out without the risky refactor riding along. So when the groups are genuinely independent, the right answer is more than one branch, not more commits.

**Propose a branch split when all of these hold:**

- Two or more groups touch different modules and share no files.
- Each one would stand on its own as a PR a reviewer could approve without the others.
- At least one group is something you would want to ship — or revert — separately.

**Stay on one branch when:** the groups are layers of a single feature; one group only exists to support another (a seed row for a new rule); or the branch already has an open PR under review, where extra commits are normal.

Every push to `feat/**`, `fix/**`, `chore/**`, `refactor/**` runs the shared CI (lint, tests, security and secrets scans), so each branch also buys an independent green signal.

**Never move work between branches on your own initiative** — ask first, and state which groups would go where. Once approved, and while everything is still uncommitted:

```bash
git switch -c fix/<slug>           # from the current base, commit group 1 here
git switch -c refactor/<slug> <base>   # uncommitted changes travel along; commit group 2 here
```

Create the second branch from the **base** (`development`, `staging`), not from the branch that already carries group 1. If git refuses the switch because a modified file differs between branches, stop: commit everything on the current branch, tell the user, and let the `split-to-prs` skill handle the split afterwards.

## Step 4: write each message

Conventional Commits, **English**, lowercase subject, imperative mood, no trailing period. Aim for a subject ≤ 72 chars. Scope is the module directory name (`compliance`, `payment`, `token`, `kyc`) or a layer (`api`, `prisma`, `test`) — optional, and commonly omitted in this repo.

`commitlint.config.js` enforces the parts a machine can check, and the hook rejects the commit otherwise:

- one of `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`, `style`, `test` — `wip` and `hotfix` are **not** valid (WIP should not land; a hotfix is a `fix`);
- header ≤ 100 chars, subject ≥ 15 chars, lowercase.

The 15-char minimum exists to kill the `chore: conflicts` / `fix: rule` / `chore: seed` pattern. Satisfying it with padding misses the point: say what changed.

| Type       | Use for                                               |
| ---------- | ----------------------------------------------------- |
| `feat`     | new behavior reachable by a caller                    |
| `fix`      | corrected behavior                                    |
| `refactor` | same behavior, different shape                        |
| `test`     | tests only                                            |
| `chore`    | seeds, migrations resequencing, deps, tooling, config |
| `docs`     | docs, ADRs, Swagger descriptions and API text         |
| `style`    | formatting only, zero behavior change                 |
| `perf`     | performance work                                      |

Add a body of 1–3 wrapped lines whenever the subject can't carry the **why** or the change touches more than a couple of files. Explain the reason and the consequence, not a file-by-file list. Always end with the trailer.

```
refactor(compliance): consolidate kyc reproved rule and remove invalid document rule

Replace the invalid profile and invalid document KYC rules with a single
ComplianceRuleKycReprovedRule triggered by kyc-reproved, and drop the obsolete
seed data for the removed rule.

Co-authored-by: Cursor <cursoragent@cursor.com>
```

Short, self-evident changes take a subject alone:

```
fix(payment): skip webhook processing for terminal payment states
```

## Step 5: typecheck, then commit group by group

Gate the whole tree once, before the first commit:

```bash
yarn typecheck   # tsc --noEmit -p tsconfig.json, ~10s
```

If it fails, **stop and report** instead of committing broken code. If the failure is confined to one group, commit the unrelated groups and leave that one out, saying why.

Two things this gate does not cover, so don't be surprised by them: `tsconfig.json` excludes `__tests__` (which carries pre-existing type errors), and `ts-jest` runs with `isolatedModules: true`, so specs are transpiled without any typecheck. Don't try to gate on tests. Don't try to verify each commit in isolation either — the generated Prisma client is gitignored, so a temporary worktree wouldn't compile without regenerating it. One full-tree check plus dependency-ordered commits is the practical compromise.

Then one `git add` with explicit paths, then one `git commit`, repeated per group. Pass the message via HEREDOC:

```bash
git add -- app/src/modules/payment/domain app/__tests__/@unit/entities/payment.spec.ts
git commit -m "$(cat <<'EOF'
feat(payment): enforce cancel validation and add status helpers

Block cancellation from terminal states and expose isTerminal/isPending
helpers used by the expiration cron.

Co-authored-by: Cursor <cursoragent@cursor.com>
EOF
)"
```

Verify staging matches your intent before committing when a group is large: `git diff --cached --stat`.

Do **not** run `yarn lint`, `yarn test:unit` or `yarn build` as part of this workflow — `yarn lint` triggers a full Nest build plus Hardhat contract compilation and is far slower than the commit itself. `yarn typecheck` is the deliberate cheap substitute. Run the others only if the user asks, or if the diff shows something you suspect is broken.

## Step 6: report

Finish with `git status --porcelain` to confirm the tree is clean, then tell the user, in prose:

1. Each commit created, as `type(scope): subject`, with one line on what it groups — and which branch it landed on, if a split happened.
2. Anything deliberately left uncommitted, and why.
3. Whether `yarn typecheck` passed.
4. That nothing was pushed.

## Worked example

Working tree: auth login command + handler, its unit test for password validation, a seed tweak for demo users, a migration renaming an audit column, and reindented import-operation specs.

Three commits:

```
feat(auth): add login command and public auth controller
  → domain/application/api + __tests__ for password validation + seed email alignment

chore(prisma): rename audit body column migration
  → schema.prisma + the migration directory

style(test): fix indentation in import-operation specs
  → whitespace-only, isolated so review is trivial
```

The seed tweak rides with the feature when login depends on it; the migration is unrelated, so it stands alone; reindentation stays separate.

## Anti-patterns

| Don't                                         | Do                                                      |
| --------------------------------------------- | ------------------------------------------------------- |
| `git add -A` then decide the grouping         | Decide the groups first, stage each with explicit paths |
| One commit per file or per layer              | One commit per vertical slice of behavior               |
| Tests in a separate `test:` commit by default | Tests with the code they cover                          |
| `chore: fixes` / `chore: conflicts`           | Say what changed and why                                |
| Portuguese subjects                           | English, imperative, lowercase                          |
| Mixing a rename's import churn into a feature | Rename commit first, feature on top                     |
| `--no-verify` to get past the hook            | Fix the message the hook complained about               |
| Unrelated concerns stacked on one branch      | Offer a branch split, then let the user decide          |
| Committing without knowing it compiles        | `yarn typecheck` once before the first commit           |
| Pushing "to be helpful"                       | Stop after committing                                   |
