import { Role } from "@src/modules/role/domain/role.entity";
import { Id } from "@src/shared/value-objects/id.value-object";

export abstract class IRoleRepository {
  public abstract findByIdOrThrow(id: Id): Promise<Role>;
}
