import { Id } from "@src/shared/value-objects/id.value-object";

export enum ContactType {
  Email = "email",
  Phone = "phone",
}

export enum ContactStatus {
  Created = "created",
  Deactivated = "deactivated",
}

export enum ContactParentType {
  Person = "person",
  Organization = "organization",
}

export interface ContactProps {
  id: Id;
  isActive: boolean;
  status: ContactStatus;
  type: ContactType;
  parentType: ContactParentType;
  parentId: Id;
  value: string;
  createdAt: Date;
  updatedAt: Date;
  deactivatedAt: Date | null;
}

export class Contact {
  private readonly _id: Id;
  private readonly _isActive: boolean;
  private readonly _status: ContactStatus;
  private readonly _type: ContactType;
  private readonly _parentType: ContactParentType;
  private readonly _parentId: Id;
  private readonly _value: string;
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;
  private readonly _deactivatedAt: Date | null;

  private constructor(props: ContactProps) {
    this._id = props.id;
    this._isActive = props.isActive;
    this._status = props.status;
    this._type = props.type;
    this._parentType = props.parentType;
    this._parentId = props.parentId;
    this._value = props.value;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
    this._deactivatedAt = props.deactivatedAt;
  }

  public static restore(props: ContactProps): Contact {
    return new Contact(props);
  }

  public get id(): Id {
    return this._id;
  }

  public get isActive(): boolean {
    return this._isActive;
  }

  public get status(): ContactStatus {
    return this._status;
  }

  public get type(): ContactType {
    return this._type;
  }

  public get parentType(): ContactParentType {
    return this._parentType;
  }

  public get parentId(): Id {
    return this._parentId;
  }

  public get value(): string {
    return this._value;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public get deactivatedAt(): Date | null {
    return this._deactivatedAt;
  }
}
