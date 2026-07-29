import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class ApiBadRequestErrorOutput {
  @ApiProperty({ example: "Bad Request" })
  @Expose()
  public readonly message!: string;

  @ApiProperty({ example: "Bad Request" })
  @Expose()
  public readonly error!: string;

  @ApiProperty({ example: 400 })
  @Expose()
  public readonly statusCode!: number;
}

export class ApiUnauthorizedErrorOutput {
  @ApiProperty({ example: "Authorization not found" })
  @Expose()
  public readonly message!: string;

  @ApiProperty({ example: "Unauthorized" })
  @Expose()
  public readonly error!: string;

  @ApiProperty({ example: 401 })
  @Expose()
  public readonly statusCode!: number;
}

export class ApiForbiddenErrorOutput {
  @ApiProperty({ example: "You are not allowed to access this resource" })
  @Expose()
  public readonly message!: string;

  @ApiProperty({ example: "Forbidden" })
  @Expose()
  public readonly error!: string;

  @ApiProperty({ example: 403 })
  @Expose()
  public readonly statusCode!: number;
}

export class ApiNotFoundErrorOutput {
  @ApiProperty({ example: "Resource not found" })
  @Expose()
  public readonly message!: string;

  @ApiProperty({ example: "Not Found" })
  @Expose()
  public readonly error!: string;

  @ApiProperty({ example: 404 })
  @Expose()
  public readonly statusCode!: number;
}

export class ApiInternalServerErrorOutput {
  @ApiProperty({ example: "Internal Server Error" })
  @Expose()
  public readonly message!: string;

  @ApiProperty({ example: "Internal Server Error" })
  @Expose()
  public readonly error!: string;

  @ApiProperty({ example: 500 })
  @Expose()
  public readonly statusCode!: number;
}
