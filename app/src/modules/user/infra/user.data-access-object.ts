import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@src/infra/database/@prisma/prisma.service";
import { ContactType } from "@src/modules/contact/domain/contact.entity";
import { Membership } from "@src/modules/membership/domain/membership.entity";
import { UserMeOutput } from "@src/modules/user/api/common/user.output";

@Injectable()
export class UserDataAccessObject {
  public constructor(private readonly prismaService: PrismaService) {}

  public async me(membership: Membership): Promise<UserMeOutput> {
    const row = await this.prismaService.membership.findFirst({
      where: {
        id: membership.id.value,
        isActive: true,
      },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            status: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
            person: {
              select: {
                name: true,
                id: true,
              },
            },
          },
        },
        role: {
          select: {
            type: true,
          },
        },
        organization: {
          select: {
            id: true,
            name: true,
            type: true,
            status: true,
            taxId: true,
            foreignTaxId: true,
            licenseNumber: true,
            radarStatus: true,
            radarType: true,
          },
        },
      },
    });

    if (!row || !row.user.person) {
      throw new NotFoundException("User not found");
    }

    const emailContact = await this.prismaService.contact.findFirst({
      where: {
        isActive: true,
        type: ContactType.Email,
        parentType: "person",
        parentId: row.user.person.id,
      },
      select: {
        value: true,
      },
    });

    if (!emailContact) {
      throw new NotFoundException("User email not found");
    }

    const result: UserMeOutput = {
      id: row.user.id,
      membershipId: row.id,
      email: emailContact.value,
      name: row.user.person.name,
      status: row.user.status,
      role: row.role.type,
      isActive: row.user.isActive,
      createdAt: row.user.createdAt,
      updatedAt: row.user.updatedAt,
      organization: {
        id: row.organization.id,
        name: row.organization.name,
        type: row.organization.type,
        status: row.organization.status,
        taxId: row.organization.taxId,
        foreignTaxId: row.organization.foreignTaxId,
        licenseNumber: row.organization.licenseNumber,
        radarStatus: row.organization.radarStatus,
        radarType: row.organization.radarType,
      },
    };

    return result;
  }
}
