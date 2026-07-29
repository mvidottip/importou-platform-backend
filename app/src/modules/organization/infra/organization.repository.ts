import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@src/infra/database/@prisma/prisma.service";
import { Organization } from "@src/modules/organization/domain/organization.entity";
import { IOrganizationRepository } from "@src/modules/organization/domain/organization.repository";
import { OrganizationMapper } from "@src/modules/organization/infra/organization.mapper";
import { Id } from "@src/shared/value-objects/id.value-object";

@Injectable()
export class OrganizationRepository implements IOrganizationRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findByIdOrThrow(id: Id): Promise<Organization> {
    const organization = await this.prismaService.organization.findUnique({
      where: { id: id.value },
    });

    if (!organization) {
      throw new NotFoundException("Organization not found");
    }

    return OrganizationMapper.toDomain(organization);
  }
}
