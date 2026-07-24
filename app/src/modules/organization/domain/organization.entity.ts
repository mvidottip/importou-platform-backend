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
