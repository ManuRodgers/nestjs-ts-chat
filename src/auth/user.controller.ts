import {
  Controller,
  Get,
  UseGuards,
  HttpStatus,
  Put,
  Body,
} from '@nestjs/common';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { IResult, CodeNumber } from '../interfaces/result.interface';
import { BossInfoDto } from './dto/bossInfo.dto';
import { UserService } from './user.service';

@Controller('/user')
@UseGuards(AuthGuard(`jwt`))
export class UserController {
  constructor(private readonly userService: UserService) {}
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

  @Put('/updateBossInfo')
  async updateBossInfo(
    @Body() bossInfoDto: BossInfoDto,
    @GetUser() user: User,
  ): Promise<IResult<User>> {
    const updatedBoss = await this.userService.updateBossInfo(
      bossInfoDto,
      user,
    );
    console.log(
      'TCL: UserController -> constructor -> updatingBoss',
      updatedBoss,
    );
    return;
  }
}
