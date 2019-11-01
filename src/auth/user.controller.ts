import { Controller, Get, UseGuards, HttpStatus } from '@nestjs/common';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { IResult, CodeNumber } from '../interfaces/result.interface';

@Controller('/user')
@UseGuards(AuthGuard(`jwt`))
export class UserController {
  @Get(`/info`)
  async getUserInfo(@GetUser() user: User): Promise<IResult<User>> {
    try {
      delete user.password;
      delete user.salt;
      return {
        code: CodeNumber.SUCCESS,
        message: 'get current user successfully',
        data: user,
      };
    } catch (error) {
      return {
        code: CodeNumber.FAILED,
        message: 'get current user unsuccessfully',
        error,
        data: user,
      };
    }
  }
}
