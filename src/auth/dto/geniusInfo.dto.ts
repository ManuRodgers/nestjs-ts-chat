import { IsString } from 'class-validator';

export class GeniusInfoDto {
  @IsString()
  avatar!: string;

  @IsString()
  job!: string;

  @IsString()
  salary!: string;

  @IsString()
  profile!: string;
}
