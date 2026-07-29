import { User } from "@src/modules/user/domain/user.entity";
import { Id } from "@src/shared/value-objects/id.value-object";

export abstract class IUserRepository {
  public abstract findByIdOrThrow(id: Id): Promise<User>;
}
