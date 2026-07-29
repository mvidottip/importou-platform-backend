import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";

export class UserMeOrganizationOutput {
  @ApiProperty()
  @Expose()
  public readonly id!: string;

  @ApiProperty()
  @Expose()
  public readonly name!: string;

  @ApiProperty({ example: "importer" })
  @Expose()
  public readonly type!: string;

  @ApiProperty({ example: "activated" })
  @Expose()
  public readonly status!: string;

  @ApiProperty({ nullable: true })
  @Expose()
  public readonly taxId!: string | null;

  @ApiProperty({ nullable: true })
  @Expose()
  public readonly foreignTaxId!: string | null;

  @ApiProperty({ nullable: true })
  @Expose()
  public readonly licenseNumber!: string | null;

  @ApiProperty({ nullable: true })
  @Expose()
  public readonly radarStatus!: string | null;

  @ApiProperty({ nullable: true })
  @Expose()
  public readonly radarType!: string | null;
}

export class UserMeOutput {
  @ApiProperty()
  @Expose()
  public readonly id!: string;

  @ApiProperty()
  @Expose()
  public readonly membershipId!: string;

  @ApiProperty({ example: "importer@importou.com" })
  @Expose()
  public readonly email!: string;

  @ApiProperty({ example: "Importer Demo" })
  @Expose()
  public readonly name!: string;

  @ApiProperty({ example: "active" })
  @Expose()
  public readonly status!: string;

  @ApiProperty({ example: "importer", description: "Membership role (admin|importer|exporter|broker)" })
  @Expose()
  public readonly role!: string;

  @ApiProperty({ example: true })
  @Expose()
  public readonly isActive!: boolean;

  @ApiProperty()
  @Expose()
  public readonly createdAt!: Date;

  @ApiProperty()
  @Expose()
  public readonly updatedAt!: Date;

  @ApiProperty({ type: UserMeOrganizationOutput })
  @Expose()
  @Type(() => UserMeOrganizationOutput)
  public readonly organization!: UserMeOrganizationOutput;
}
