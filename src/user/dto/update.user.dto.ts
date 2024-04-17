import { IsString, IsOptional, IsUrl } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  nickname?: string;

  @IsString()
  @IsOptional()
  tag?: string;

  @IsUrl()
  @IsOptional()
  tagImg?: string; // tagImg 속성 추가
}
