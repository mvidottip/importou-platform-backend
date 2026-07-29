import {
  Contact,
  ContactParentType,
  ContactStatus,
  ContactType,
} from "@src/modules/contact/domain/contact.entity";
import { Id } from "@src/shared/value-objects/id.value-object";

type ContactPrisma = {
  id: string;
  isActive: boolean;
  status: string;
  type: string;
  parentType: string;
  parentId: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;
  deactivatedAt: Date | null;
};

export class ContactMapper {
  public static toDomain(prisma: ContactPrisma): Contact {
    return Contact.restore({
      id: Id.restore(prisma.id),
      isActive: prisma.isActive,
      status: prisma.status as ContactStatus,
      type: prisma.type as ContactType,
      parentType: prisma.parentType as ContactParentType,
      parentId: Id.restore(prisma.parentId),
      value: prisma.value,
      createdAt: prisma.createdAt,
      updatedAt: prisma.updatedAt,
      deactivatedAt: prisma.deactivatedAt,
    });
  }
}
