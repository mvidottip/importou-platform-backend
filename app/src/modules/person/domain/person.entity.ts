import { Id } from "@src/shared/value-objects/id.value-object";

export enum PersonStatus {
  Created = "created",
  Deactivated = "deactivated",
}

export interface PersonProps {
  id: Id;
  isActive: boolean;
  status: PersonStatus;
  name: string;
  cpf: string | null;
  birthdate: Date | null;
  nationality: string | null;
  createdAt: Date;
  updatedAt: Date;
  deactivatedAt: Date | null;
  userId: Id;
}

export class Person {
  private readonly _id: Id;
  private readonly _isActive: boolean;
  private readonly _status: PersonStatus;
  private readonly _name: string;
  private readonly _cpf: string | null;
  private readonly _birthdate: Date | null;
  private readonly _nationality: string | null;
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;
  private readonly _deactivatedAt: Date | null;
  private readonly _userId: Id;

  private constructor(props: PersonProps) {
    this._id = props.id;
    this._isActive = props.isActive;
    this._status = props.status;
    this._name = props.name;
    this._cpf = props.cpf;
    this._birthdate = props.birthdate;
    this._nationality = props.nationality;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
    this._deactivatedAt = props.deactivatedAt;
    this._userId = props.userId;
  }

  public static restore(props: PersonProps): Person {
    return new Person(props);
  }

  public get id(): Id {
    return this._id;
  }

  public get isActive(): boolean {
    return this._isActive;
  }

  public get status(): PersonStatus {
    return this._status;
  }

  public get name(): string {
    return this._name;
  }

  public get cpf(): string | null {
    return this._cpf;
  }

  public get birthdate(): Date | null {
    return this._birthdate;
  }

  public get nationality(): string | null {
    return this._nationality;
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

  public get userId(): Id {
    return this._userId;
  }
}
