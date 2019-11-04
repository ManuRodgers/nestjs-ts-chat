import { IsString, IsOptional } from 'class-validator';

export class BossInfoDto {
  @IsString()
  avatar: string;

  @IsString()
  title: string;

  @IsString()
  company: string;

  @IsString()
  money: string;

  @IsString()
  description: string;
}
