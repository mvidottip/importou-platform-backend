import { Person } from "@src/modules/person/domain/person.entity";
import { Id } from "@src/shared/value-objects/id.value-object";

export abstract class IPersonRepository {
  public abstract findByIdOrThrow(id: Id): Promise<Person>;
  public abstract findByUserIdOrThrow(userId: Id): Promise<Person>;
}
