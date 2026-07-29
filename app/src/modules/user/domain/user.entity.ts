import { Id } from "@src/shared/value-objects/id.value-object";
import { Password } from "@src/shared/value-objects/password.value-object";

export enum UserStatus {
  Invited = "invited",
  Active = "active",
  Blocked = "blocked",
  Deactivated = "deactivated",
}

export interface UserProps {
  id: Id;
  isActive: boolean;
  status: UserStatus;
  password: Password;
  isBlocked: boolean;
  blockedReason: string | null;
  createdAt: Date;
  updatedAt: Date;
  activatedAt: Date | null;
  deactivatedAt: Date | null;
}

export class User {
  private readonly _id: Id;
  private readonly _isActive: boolean;
  private readonly _status: UserStatus;
  private readonly _password: Password;
  private readonly _isBlocked: boolean;
  private readonly _blockedReason: string | null;
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;
  private readonly _activatedAt: Date | null;
  private readonly _deactivatedAt: Date | null;

  private constructor(props: UserProps) {
    this._id = props.id;
    this._isActive = props.isActive;
    this._status = props.status;
    this._password = props.password;
    this._isBlocked = props.isBlocked;
    this._blockedReason = props.blockedReason;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
    this._activatedAt = props.activatedAt;
    this._deactivatedAt = props.deactivatedAt;
  }

  public static restore(props: UserProps): User {
    return new User(props);
  }

  public get id(): Id {
    return this._id;
  }

  public get isActive(): boolean {
    return this._isActive;
  }

  public get status(): UserStatus {
    return this._status;
  }

  public get password(): Password {
    return this._password;
  }

  public get isBlocked(): boolean {
    return this._isBlocked;
  }

  public get blockedReason(): string | null {
    return this._blockedReason;
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
