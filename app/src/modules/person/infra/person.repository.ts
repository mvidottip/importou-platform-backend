import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@src/infra/database/@prisma/prisma.service";
import { Person } from "@src/modules/person/domain/person.entity";
import { IPersonRepository } from "@src/modules/person/domain/person.repository";
import { PersonMapper } from "@src/modules/person/infra/person.mapper";
import { Id } from "@src/shared/value-objects/id.value-object";

@Injectable()
export class PersonRepository implements IPersonRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findByIdOrThrow(id: Id): Promise<Person> {
    const person = await this.prismaService.person.findUnique({
      where: { id: id.value },
    });

    if (!person) {
      throw new NotFoundException("Person not found");
    }

    return PersonMapper.toDomain(person);
  }

  public async findByUserIdOrThrow(userId: Id): Promise<Person> {
    const person = await this.prismaService.person.findUnique({
      where: { userId: userId.value },
    });

    if (!person) {
      throw new NotFoundException("Person not found");
    }

    return PersonMapper.toDomain(person);
  }
}
