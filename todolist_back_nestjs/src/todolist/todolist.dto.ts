import { PartialType } from '@nestjs/mapped-types';

import {
  IsBoolean,
  IsOptional,
  IsString,
  Length
} from "class-validator";

export class CreateTodolistDto {

  @IsString()
  @Length(3, 50)
  item: string;

}

export class UpdateTodolistDto extends PartialType(CreateTodolistDto) {

  @IsBoolean()
  @IsOptional()
  done: boolean;

}
