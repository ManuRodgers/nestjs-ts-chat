import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Logger,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { GetUser } from './get-user.decorator';
import { IResult, CodeNumber } from '../interfaces/result.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(200)
  async signup(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<IResult<User>> {
    try {
      const user = await this.authService.signup(authCredentialsDto);
      delete user.password;
      delete user.salt;
      return {
        code: CodeNumber.SUCCESS,
        message: 'register successfully',
        data: user,
      };
    } catch (error) {
      return {
        code: CodeNumber.FAILED,
        message: 'register unsuccessfully',
        error,
      };
    }
  }
  @Post('/signin')
  @HttpCode(200)
  async signIn(
    @Body() authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return await this.authService.signIn(authCredentialsDto);
  }
}
