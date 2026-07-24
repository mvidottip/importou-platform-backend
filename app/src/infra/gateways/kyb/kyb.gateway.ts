/** Port — KYB BR (CNPJ) para importer/broker. */
export abstract class KybGateway {
  public abstract verifyCompany(input: {
    taxId: string;
  }): Promise<{ ok: boolean; legalName?: string; raw?: unknown }>;
}

export class NullKybGateway extends KybGateway {
  public async verifyCompany(): Promise<{ ok: boolean }> {
    throw new Error("KybGateway not configured");
  }
}
