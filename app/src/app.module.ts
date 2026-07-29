import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { DatabaseModule } from "@src/infra/database/database.module";
import { EnvModule } from "@src/infra/env/env.module";
import { GatewaysModule } from "@src/infra/gateways/gateways.module";
import { AuditModule } from "@src/modules/audit/audit.module";
import { AuthModule } from "@src/modules/auth/auth.module";
import { BrokerProposalModule } from "@src/modules/broker-proposal/broker-proposal.module";
import { ContactModule } from "@src/modules/contact/contact.module";
import { ExporterQuoteModule } from "@src/modules/exporter-quote/exporter-quote.module";
import { HealthModule } from "@src/modules/health/health.module";
import { ImportOperationModule } from "@src/modules/import-operation/import-operation.module";
import { MembershipModule } from "@src/modules/membership/membership.module";
import { OrganizationModule } from "@src/modules/organization/organization.module";
import { PersonModule } from "@src/modules/person/person.module";
import { RoleModule } from "@src/modules/role/role.module";
import { UserModule } from "@src/modules/user/user.module";

@Module({
  imports: [
    EnvModule,
    CqrsModule,
    DatabaseModule,
    GatewaysModule,
    HealthModule,
    RoleModule,
    OrganizationModule,
    MembershipModule,
    ContactModule,
    UserModule,
    PersonModule,
    AuthModule,
    AuditModule,
    ImportOperationModule,
    ExporterQuoteModule,
    BrokerProposalModule,
  ],
})
export class AppModule {}
