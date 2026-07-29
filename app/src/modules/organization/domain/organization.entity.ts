import { Id } from "@src/shared/value-objects/id.value-object";

export enum OrganizationType {
  Importer = "importer",
  Exporter = "exporter",
  Broker = "broker",
  Platform = "platform",
}

export enum OrganizationStatus {
  DocsPending = "docs_pending",
  InReview = "in_review",
  AwaitingApproval = "awaiting_approval",
  Approved = "approved",
  Rejected = "rejected",
  Activated = "activated",
  Deactivated = "deactivated",
}

export enum RadarStatus {
  None = "none",
  Pending = "pending",
  Active = "active",
  Failed = "failed",
  Unknown = "unknown",
}

export enum RadarType {
  Express = "express",
  Limited = "limited",
  Unlimited = "unlimited",
}

export interface OrganizationProps {
  id: Id;
  isActive: boolean;
  type: OrganizationType;
  status: OrganizationStatus;
  name: string;
  legalName: string;
  taxId: string | null;
  foreignTaxId: string | null;
  licenseNumber: string | null;
  radarStatus: RadarStatus | null;
  radarType: RadarType | null;
  radarCheckedAt: Date | null;
  country: string | null;
  city: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Organization {
  private readonly _id: Id;
  private readonly _isActive: boolean;
  private readonly _type: OrganizationType;
  private readonly _status: OrganizationStatus;
  private readonly _name: string;
  private readonly _legalName: string;
  private readonly _taxId: string | null;
  private readonly _foreignTaxId: string | null;
  private readonly _licenseNumber: string | null;
  private readonly _radarStatus: RadarStatus | null;
  private readonly _radarType: RadarType | null;
  private readonly _radarCheckedAt: Date | null;
  private readonly _country: string | null;
  private readonly _city: string | null;
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;

  private constructor(props: OrganizationProps) {
    this._id = props.id;
    this._isActive = props.isActive;
    this._type = props.type;
    this._status = props.status;
    this._name = props.name;
    this._legalName = props.legalName;
    this._taxId = props.taxId;
    this._foreignTaxId = props.foreignTaxId;
    this._licenseNumber = props.licenseNumber;
    this._radarStatus = props.radarStatus;
    this._radarType = props.radarType;
    this._radarCheckedAt = props.radarCheckedAt;
    this._country = props.country;
    this._city = props.city;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  public static restore(props: OrganizationProps): Organization {
    return new Organization(props);
  }

  public get id(): Id {
    return this._id;
  }

  public get isActive(): boolean {
    return this._isActive;
  }

  public get type(): OrganizationType {
    return this._type;
  }

  public get status(): OrganizationStatus {
    return this._status;
  }

  public get name(): string {
    return this._name;
  }

  public get legalName(): string {
    return this._legalName;
  }

  public get taxId(): string | null {
    return this._taxId;
  }

  public get foreignTaxId(): string | null {
    return this._foreignTaxId;
  }

  public get licenseNumber(): string | null {
    return this._licenseNumber;
  }

  public get radarStatus(): RadarStatus | null {
    return this._radarStatus;
  }

  public get radarType(): RadarType | null {
    return this._radarType;
  }

  public get radarCheckedAt(): Date | null {
    return this._radarCheckedAt;
  }

  public get country(): string | null {
    return this._country;
  }

  public get city(): string | null {
    return this._city;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date {
    return this._updatedAt;
  }
}
