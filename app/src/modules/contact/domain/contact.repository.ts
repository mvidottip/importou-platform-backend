import { Contact } from "@src/modules/contact/domain/contact.entity";

export abstract class IContactRepository {
  public abstract findEmailByValue(value: string): Promise<Contact | null>;
}
