import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AuthPublicAuthenticateCreateInput {
  @ApiProperty({ description: "User email", format: "email", example: "importer@importou.com" })
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => (value as string).toLowerCase().trim())
  public readonly email!: string;

  @ApiProperty({ description: "User password", example: "importou" })
  @IsNotEmpty()
  @IsString()
  public readonly password!: string;
}
