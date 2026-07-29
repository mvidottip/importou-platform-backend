import { Id } from "@src/shared/value-objects/id.value-object";

export enum RoleStatus {
  Created = "created",
  Activated = "activated",
  Deactivated = "deactivated",
}

export enum RoleType {
  Admin = "admin",
  Importer = "importer",
  Exporter = "exporter",
  Broker = "broker",
}

export interface RoleProps {
  id: Id;
  isActive: boolean;
  status: RoleStatus;
  type: RoleType;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  activatedAt: Date | null;
  deactivatedAt: Date | null;
}

export class Role {
  private readonly _id: Id;
  private readonly _isActive: boolean;
  private readonly _status: RoleStatus;
  private readonly _type: RoleType;
  private readonly _description: string;
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;
  private readonly _activatedAt: Date | null;
  private readonly _deactivatedAt: Date | null;

  private constructor(props: RoleProps) {
    this._id = props.id;
    this._isActive = props.isActive;
    this._status = props.status;
    this._type = props.type;
    this._description = props.description;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
    this._activatedAt = props.activatedAt;
    this._deactivatedAt = props.deactivatedAt;
  }

  public static restore(props: RoleProps): Role {
    return new Role(props);
  }

  public get id(): Id {
    return this._id;
  }

  public get isActive(): boolean {
    return this._isActive;
  }

  public get status(): RoleStatus {
    return this._status;
  }

  public get type(): RoleType {
    return this._type;
  }

  public get description(): string {
    return this._description;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }

  public get activatedAt(): Date | null {
    return this._activatedAt;
  }

  public get deactivatedAt(): Date | null {
    return this._deactivatedAt;
  }
}
