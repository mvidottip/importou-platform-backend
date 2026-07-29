import { Organization } from "@src/modules/organization/domain/organization.entity";
import { Id } from "@src/shared/value-objects/id.value-object";

export abstract class IOrganizationRepository {
  public abstract findByIdOrThrow(id: Id): Promise<Organization>;
}
