export enum ImportOperationStatus {
  InterestCreated = "interest_created",
  AwaitingQuote = "awaiting_quote",
  QuoteReceived = "quote_received",
  SimulationReady = "simulation_ready",
  QuoteLocked = "quote_locked",
  PaymentPending = "payment_pending",
  Shipping = "shipping",
  Customs = "customs",
  Completed = "completed",
  Cancelled = "cancelled",
}
