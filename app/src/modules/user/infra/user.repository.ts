import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@src/infra/database/@prisma/prisma.service";
import { User } from "@src/modules/user/domain/user.entity";
import { IUserRepository } from "@src/modules/user/domain/user.repository";
import { UserMapper } from "@src/modules/user/infra/user.mapper";
import { Id } from "@src/shared/value-objects/id.value-object";

@Injectable()
export class UserRepository implements IUserRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findByIdOrThrow(id: Id): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id: id.value },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return UserMapper.toDomain(user);
  }
}
