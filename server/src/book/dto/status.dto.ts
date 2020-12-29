import { IsBoolean } from "class-validator";

export class statusDTO {
  @IsBoolean()
  readonly bool: boolean;
} 