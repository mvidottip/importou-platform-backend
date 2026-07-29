import { Person as PersonPrisma } from "@prisma/client";
import { Person, PersonStatus } from "@src/modules/person/domain/person.entity";
import { Id } from "@src/shared/value-objects/id.value-object";

export class PersonMapper {
  public static toDomain(prisma: PersonPrisma): Person {
    return Person.restore({
      id: Id.restore(prisma.id),
      isActive: prisma.isActive,
      status: prisma.status as PersonStatus,
      name: prisma.name,
      cpf: prisma.cpf,
      birthdate: prisma.birthdate,
      nationality: prisma.nationality,
      createdAt: prisma.createdAt,
      updatedAt: prisma.updatedAt,
      deactivatedAt: prisma.deactivatedAt,
      userId: Id.restore(prisma.userId),
    });
  }
}
