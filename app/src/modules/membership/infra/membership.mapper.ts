import { Membership as MembershipPrisma } from "@prisma/client";
import { Membership, MembershipStatus } from "@src/modules/membership/domain/membership.entity";
import { Id } from "@src/shared/value-objects/id.value-object";

export class MembershipMapper {
  public static toDomain(prisma: MembershipPrisma): Membership {
    return Membership.restore({
      id: Id.restore(prisma.id),
      isActive: prisma.isActive,
      status: prisma.status as MembershipStatus,
      createdAt: prisma.createdAt,
      updatedAt: prisma.updatedAt,
      deactivatedAt: prisma.deactivatedAt,
      userId: Id.restore(prisma.userId),
      organizationId: Id.restore(prisma.organizationId),
      roleId: Id.restore(prisma.roleId),
    });
  }
}
