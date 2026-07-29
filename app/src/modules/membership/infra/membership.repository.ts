import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@src/infra/database/@prisma/prisma.service";
import { Membership } from "@src/modules/membership/domain/membership.entity";
import { IMembershipRepository } from "@src/modules/membership/domain/membership.repository";
import { MembershipMapper } from "@src/modules/membership/infra/membership.mapper";
import { Id } from "@src/shared/value-objects/id.value-object";

@Injectable()
export class MembershipRepository implements IMembershipRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findByIdOrThrow(id: Id): Promise<Membership> {
    const membership = await this.prismaService.membership.findUnique({
      where: { id: id.value },
    });

    if (!membership) {
      throw new NotFoundException("Membership not found");
    }

    return MembershipMapper.toDomain(membership);
  }

  public async findActiveByUserIdOrThrow(userId: Id): Promise<Membership> {
    const membership = await this.prismaService.membership.findFirst({
      where: {
        isActive: true,
        userId: userId.value,
      },
    });

    if (!membership) {
      throw new NotFoundException("Membership not found");
    }

    return MembershipMapper.toDomain(membership);
  }
}
