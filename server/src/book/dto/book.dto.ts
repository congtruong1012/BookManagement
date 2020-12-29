import { IsBoolean, IsNumber, IsString } from "class-validator";

export class bookDTO {
  @IsString()
  readonly name: string;
  @IsNumber()
  readonly price: number;
  @IsString()
  readonly type: string;
  @IsString()
  readonly author: string;
  @IsBoolean()
  readonly published: boolean;
} 