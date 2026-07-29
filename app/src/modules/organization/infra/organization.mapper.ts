import { Organization as OrganizationPrisma } from "@prisma/client";
import {
  Organization,
  OrganizationStatus,
  OrganizationType,
  RadarStatus,
  RadarType,
} from "@src/modules/organization/domain/organization.entity";
import { Id } from "@src/shared/value-objects/id.value-object";

export class OrganizationMapper {
  public static toDomain(prisma: OrganizationPrisma): Organization {
    return Organization.restore({
      id: Id.restore(prisma.id),
      isActive: prisma.isActive,
      type: prisma.type as OrganizationType,
      status: prisma.status as OrganizationStatus,
      name: prisma.name,
      legalName: prisma.legalName,
      taxId: prisma.taxId,
      foreignTaxId: prisma.foreignTaxId,
      licenseNumber: prisma.licenseNumber,
      radarStatus: prisma.radarStatus as RadarStatus | null,
      radarType: prisma.radarType as RadarType | null,
      radarCheckedAt: prisma.radarCheckedAt,
      country: prisma.country,
      city: prisma.city,
      createdAt: prisma.createdAt,
      updatedAt: prisma.updatedAt,
    });
  }
}
