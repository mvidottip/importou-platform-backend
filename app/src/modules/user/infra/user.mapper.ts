import { User as UserPrisma } from "@prisma/client";
import { User, UserStatus } from "@src/modules/user/domain/user.entity";
import { Id } from "@src/shared/value-objects/id.value-object";
import { Password } from "@src/shared/value-objects/password.value-object";

export class UserMapper {
  public static toDomain(prisma: UserPrisma): User {
    return User.restore({
      id: Id.restore(prisma.id),
      isActive: prisma.isActive,
      status: prisma.status as UserStatus,
      password: Password.restore(prisma.password),
      isBlocked: prisma.isBlocked,
      blockedReason: prisma.blockedReason,
      createdAt: prisma.createdAt,
      updatedAt: prisma.updatedAt,
      activatedAt: prisma.activatedAt,
      deactivatedAt: prisma.deactivatedAt,
    });
  }
}
