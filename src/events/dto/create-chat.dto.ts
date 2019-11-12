import { IsString, IsNumber, IsBoolean } from 'class-validator';
import { Position } from '../../interfaces/index';
export class CreateChatDto {
  @IsString()
  text: string;

  @IsString()
  from: string;

  @IsString()
  to: string;

  @IsString()
  combinedId: string;

  @IsString()
  position: Position;

  @IsBoolean()
  isRead: boolean;

  @IsNumber()
  createdAt!: number;
}
