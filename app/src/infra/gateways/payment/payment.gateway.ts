/** Port — implementar adapter Pay depois. */
export abstract class PaymentGateway {
  public abstract createCharge(input: {
    operationId: string;
    amountMinor: number;
    currency: string;
  }): Promise<{ externalId: string }>;
}

export class NullPaymentGateway extends PaymentGateway {
  public async createCharge(): Promise<{ externalId: string }> {
    throw new Error("PaymentGateway not configured");
  }
}
