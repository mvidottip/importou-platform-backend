import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class AuthPublicAuthenticateCreateInput {
  @ApiProperty({ description: "User email", format: "email", example: "importer@importou.com" })
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }) => (value as string).toLowerCase().trim())
  public readonly email!: string;

  @ApiProperty({ description: "User password", minLength: 8, example: "importou" })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  public readonly password!: string;
}
