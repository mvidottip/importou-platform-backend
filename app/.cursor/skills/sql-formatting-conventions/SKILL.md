---
name: sql-formatting-conventions
description: Formats and writes SQL queries (SELECT, CTEs, INSERT, UPDATE, DELETE, and data-migration scripts) following the user's personal style — leading-comma lists, lowercase keywords, 2-space nested indentation, short semantic table aliases, `is true`/`is not null` boolean checks, kebab-case slug name + pt-BR description for every query, and a source -> source_id -> insert CTE pipeline with `do $$` validation blocks for migrations. Use whenever writing, reviewing, or refactoring any SQL query, CTE, or migration script for this user.
---

# SQL Formatting Conventions

Personal SQL style extracted from the user's `final.sql` migration scripts. Apply the "Core rules" to **any** SQL you write for this user. Apply "Migration pipeline pattern" specifically when writing data-migration / ETL-style scripts (moving rows from one schema/table to another).

## Query name and description (always)

Whenever you deliver a SQL query (Redash, ad-hoc, report, or extracted from code), **always** include, before the SQL:

1. **Name** — kebab-case slug, matching project naming (`module-entity-action-scope`). No spaces, no brackets, no Title Case.
2. **Description** — one short sentence in **pt-BR** stating what the query returns and the main filters/scope.

```text
Name: import-operation-count-by-status
Description: Contagem de operações de importação por status para uma organization importadora.
```

Slug rules:

- lowercase kebab-case only (`a-z`, `0-9`, `-`)
- start with the domain/module when clear (`import-operation-`, `organization-`, `broker-proposal-`, …)
- mirror existing codebase method names when useful (`searchByOrganization` → `import-operation-search-by-organization`)
- keep it short; drop filler words (`find`, `get`) unless needed to disambiguate

Skip name/description only for tiny inline fragments that are not a standalone runnable query (e.g. a one-line `where` tweak inside an existing script).

## Core rules (any SQL)

1. **Keywords lowercase**: `select`, `from`, `left join`, `where`, `insert into`, `with`, `case`, `when`, `then`, `end`, `do $$`, `begin`, `end $$`.
2. **Leading commas** for `select` column lists and for chained CTE definitions (comma glued to the next keyword, no space):

```sql
select
  column_one
  ,column_two
  ,column_three
from some_table
```

```sql
with source as (
  select ...
)
,source_id as (
  select ...
)
```

3. **Trailing commas** only for literal `values (...)` tuples and for a plain literal `insert into table (col, col, ...)` column list (i.e. when the statement has no `select`/CTE, just hard-coded values):

```sql
insert into schema.table (
  id,
  name,
  slug
)
values (
  65,
  'name',
  'slug'
);
```

4. **Indentation is 2 spaces per nesting level.** `select`/`from`/`join`/`where` sit at the same indent as each other inside their CTE; the column/condition list sits one level deeper. Nested subqueries or `lateral` joins add one more level, recursively:

```sql
with source as (
  select
    a.column
    ,b.column
  from table_a a
  left join lateral (
    select
      x.column
    from table_x x
    where
      x.id = a.id
      and (
        x.status = 'a'
        or x.status = 'b'
      )
    limit 1
  ) b on true
)
```

5. **Boolean checks**: always `is true` / `is false` / `is not null` / `is null`, never `= true`.
6. **`case` expressions**: `case` (and `case column`) at the column's indent; each `when ... then ...` indented +2; `end alias` back at the `case` indent:

```sql
,case
  when v7co.slug = 'foo' then 'a'
  when v7co.slug = 'bar' then 'b'
end model
```

7. **Table aliases**: short, semantic, lowercase, no underscores. Prefix with the source hint when relevant (`v7` for the legacy/source schema, `v8` for the new/target schema even when its real schema name is `public`), followed by a 2-4 letter abbreviation of the table name (`v7co` = `v7.company`, `v8un` = `public.unit`, `v7pa` = `v7.payment`, `v8ac` = `public.account`). When the same table is joined more than once (e.g. via a `lateral` lookup for a different role), differentiate with an extra letter (`v7usl` vs `v8us`, `v8acl`) instead of `_1`/`_2` suffixes. Derived one-off lateral subqueries that don't map 1:1 to a real table can use a short mnemonic without the version prefix (e.g. `pc` for a "payment charge" lookup).
8. **One blank line** between top-level statements. No blank line inside a single CTE chain or `do $$` block.
9. Every top-level statement ends with `;`.

## Section dividers (multi-statement scripts)

When a script has multiple logical steps/entities, separate them with a 3-line comment divider (lowercase, singular-ish label), blank line before and after:

```sql
--
-- unit
--

<statements for this entity>

--
-- product
--
```

## Migration pipeline pattern (source -> target scripts)

This is the default shape for "move/transform rows from table A into table B" requests. Follow this exact stage order, skipping stages that aren't needed:

1. **Pre-cleanup / backfill** (optional, before the CTE): grouped `update`/`delete` one-liners fixing the source data, no blank lines between them, one blank line after the group.

```sql
update v7.order set confirmed_at = updated_at where status = 'confirmed' and confirmed_at is null;
update v7.order set failed_at = updated_at where status = 'failed' and failed_at is null;

delete from v7.order where order_id in (
  select v7or.order_id
  from v7.order v7or
  left join v7.order_item v7oi on v7oi.order_id = v7or.order_id
  where v7oi.order_item_id is null
);
```

2. **`source`**: select and reshape raw columns from the origin table(s), keep the legacy identifiers as `old_id` / `old_slug`, derive `version` from a timestamp helper (e.g. `round_up_to_millisecond_timestamptz(created_at)`).
3. **`source_pivot`** (optional, only for entities with historical state/status transitions): unpivot several `*_at` timestamp columns into `(priority, state, reversion)` rows via a `left join lateral (values ...) l(...) on l.reversion is not null`.
4. **`source_dedupe`** (optional, pairs with `source_pivot`): compute a unique `version` per state row, breaking ties with a tiny fixed offset:

```sql
,source_dedupe as (
  select
    reversion + (row_number() over (partition by old_id order by old_id, priority) - 1) * interval '17 millisecond' version
    ,*
  from source_pivot
)
```

5. **`source_id`**: generate the new primary key with `typeid_generate_text('<table_prefix>', version)`. If the entity has multiple version rows (from `source_dedupe`), generate the id only once (on the first/`created` state row) and self-join back so every version of the same entity shares one id:

```sql
,source_id as (
  select
    sd2.account_id
    ,sd1.*
  from source_dedupe sd1
  left join (
    select
      typeid_generate_text('account', sd1.version) account_id
      ,sd1.version
      ,sd1.old_id
    from source_dedupe sd1
    where sd1.state = 'created'
  ) sd2 on sd2.old_id = sd1.old_id
)
```

For simple entities without history, `source_id` just adds the id column to every row:

```sql
,source_id as (
  select
    typeid_generate_text('product', version) product_id
    ,*
  from source
)
```

6. **`source_active`** (optional, pairs with `source_pivot`/`source_dedupe`): compute `is_active` as `row_number() over (partition by <id> order by version desc) = 1`.
7. **Final insert**: always `insert into <target> \n select * from <last_cte>;` — never list target columns explicitly here, rely on column order matching.

```sql
insert into public.legal
select * from source_id;
```

8. **Post-insert validation**: immediately after every migration insert, add a `do $$` block asserting the row count matches the source (use `count(distinct old_id)` when the target can have multiple versions per entity, plain `count(*)` otherwise):

```sql
do $$
begin
  if (select count(distinct old_id) from public.legal) != (select count(*) from v7.company) then
    raise exception 'legal error';
  end if;
end $$;
```

The exception message is always `'<target_table> error'`.

## Full worked example

```sql
--
-- legal
--

with source as (
  select
    v8un.version
    ,true is_active
    ,v7co.legal_name
    ,v7co.cnpj
    ,v7co.state_registration
    ,v8un.unit_id
    ,v7co.company_id old_id
    ,v7co.slug old_slug
  from public.unit v8un
  left join public.company v8co on v8co.company_id = v8un.company_id and v8co.is_active is true
  left join v7.company v7co on v7co.company_id = v8co.old_id
  where v8un.is_active is true
)
,source_id as (
  select
    typeid_generate_text('legal', version) legal_id
    ,*
  from source
)
insert into public.legal
select * from source_id;

do $$
begin
  if (select count(distinct old_id) from public.legal) != (select count(*) from v7.company) then
    raise exception 'legal error';
  end if;
end $$;

--
-- product
--
```
