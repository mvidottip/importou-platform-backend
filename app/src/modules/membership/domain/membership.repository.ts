import { Membership } from "@src/modules/membership/domain/membership.entity";
import { Id } from "@src/shared/value-objects/id.value-object";

export abstract class IMembershipRepository {
  public abstract findByIdOrThrow(id: Id): Promise<Membership>;
  public abstract findActiveByUserIdOrThrow(userId: Id): Promise<Membership>;
}
