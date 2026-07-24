/** Port — Serpro / RADAR do importador. */
export abstract class RadarGateway {
  public abstract check(input: {
    taxId: string;
  }): Promise<{
    status: "none" | "pending" | "active" | "failed" | "unknown";
    type?: "express" | "limited" | "unlimited";
  }>;
}

export class NullRadarGateway extends RadarGateway {
  public async check(): Promise<{ status: "unknown" }> {
    throw new Error("RadarGateway not configured");
  }
}
