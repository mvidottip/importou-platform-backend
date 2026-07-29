import { Id } from "@src/shared/value-objects/id.value-object";

export enum MembershipStatus {
  Created = "created",
  Deactivated = "deactivated",
}

export interface MembershipProps {
  id: Id;
  isActive: boolean;
  status: MembershipStatus;
  createdAt: Date;
  updatedAt: Date;
  deactivatedAt: Date | null;
  userId: Id;
  organizationId: Id;
  roleId: Id;
}

export class Membership {
  private readonly _id: Id;
  private readonly _isActive: boolean;
  private readonly _status: MembershipStatus;
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;
  private readonly _deactivatedAt: Date | null;
  private readonly _userId: Id;
  private readonly _organizationId: Id;
  private readonly _roleId: Id;

  private constructor(props: MembershipProps) {
    this._id = props.id;
    this._isActive = props.isActive;
    this._status = props.status;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
    this._deactivatedAt = props.deactivatedAt;
    this._userId = props.userId;
    this._organizationId = props.organizationId;
    this._roleId = props.roleId;
  }

  public static restore(props: MembershipProps): Membership {
    return new Membership(props);
  }

  public get id(): Id {
    return this._id;
  }

  public get isActive(): boolean {
    return this._isActive;
  }

  public get status(): MembershipStatus {
    return this._status;
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

  public get organizationId(): Id {
    return this._organizationId;
  }

  public get roleId(): Id {
    return this._roleId;
  }
}
