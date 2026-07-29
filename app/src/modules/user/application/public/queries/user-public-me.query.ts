import { Membership } from "@src/modules/membership/domain/membership.entity";

export class UserPublicMeQuery {
  public constructor(public readonly membership: Membership) {}
}
