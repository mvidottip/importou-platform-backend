import { Global, Module } from "@nestjs/common";
import { PrismaService } from "@src/infra/database/@prisma/prisma.service";
import { IContactRepository } from "@src/modules/contact/domain/contact.repository";
import { ContactRepository } from "@src/modules/contact/infra/contact.repository";
import { IMembershipRepository } from "@src/modules/membership/domain/membership.repository";
import { MembershipRepository } from "@src/modules/membership/infra/membership.repository";
import { IOrganizationRepository } from "@src/modules/organization/domain/organization.repository";
import { OrganizationRepository } from "@src/modules/organization/infra/organization.repository";
import { IPersonRepository } from "@src/modules/person/domain/person.repository";
import { PersonRepository } from "@src/modules/person/infra/person.repository";
import { IRoleRepository } from "@src/modules/role/domain/role.repository";
import { RoleRepository } from "@src/modules/role/infra/role.repository";
import { IUserRepository } from "@src/modules/user/domain/user.repository";
import { UserDataAccessObject } from "@src/modules/user/infra/user.data-access-object";
import { UserRepository } from "@src/modules/user/infra/user.repository";

@Global()
@Module({
  providers: [
    PrismaService,
    { provide: IContactRepository, useClass: ContactRepository },
    { provide: IPersonRepository, useClass: PersonRepository },
    { provide: IUserRepository, useClass: UserRepository },
    { provide: IMembershipRepository, useClass: MembershipRepository },
    { provide: IOrganizationRepository, useClass: OrganizationRepository },
    { provide: IRoleRepository, useClass: RoleRepository },
    UserDataAccessObject,
  ],
  exports: [
    PrismaService,
    IContactRepository,
    IPersonRepository,
    IUserRepository,
    IMembershipRepository,
    IOrganizationRepository,
    IRoleRepository,
    UserDataAccessObject,
  ],
})
export class DatabaseModule {}
