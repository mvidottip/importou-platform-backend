import { Injectable } from "@nestjs/common";
import { PrismaService } from "@src/infra/database/@prisma/prisma.service";
import { Contact, ContactType } from "@src/modules/contact/domain/contact.entity";
import { IContactRepository } from "@src/modules/contact/domain/contact.repository";
import { ContactMapper } from "@src/modules/contact/infra/contact.mapper";

@Injectable()
export class ContactRepository implements IContactRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findEmailByValue(value: string): Promise<Contact | null> {
    const contact = await this.prismaService.contact.findFirst({
      where: {
        isActive: true,
        type: ContactType.Email,
        value: value,
      },
    });

    if (!contact) {
      return null;
    }

    return ContactMapper.toDomain(contact);
  }
}
