import { plainToInstance } from "class-transformer";

export function toOutput<T>(dtoClass: new () => T, data: unknown): T {
  return plainToInstance(dtoClass, data, {
    enableImplicitConversion: true,
    excludeExtraneousValues: false,
    exposeDefaultValues: true,
  });
}
