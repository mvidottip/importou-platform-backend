import { typeid } from "typeid-js";

export class Id {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
  }

  public get value(): string {
    return this._value;
  }

  public static create(prefix: string): Id {
    return new Id(typeid(prefix).toString());
  }

  public static restore(value: string): Id {
    return new Id(value);
  }

  public equals(other: Id): boolean {
    return this._value === other._value;
  }
}
