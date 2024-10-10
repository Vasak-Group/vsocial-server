import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class UpdateUserDto {
  @ApiProperty()
  @IsString()
  public name?: string;

  @ApiProperty()
  @IsOptional()
  public avatar?: string;
}
