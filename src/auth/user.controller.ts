import {
  Controller,
  Get,
  UseGuards,
  HttpStatus,
  Put,
  Body,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { IResult, CodeNumber, Kind } from '../interfaces/result.interface';
import { BossInfoDto } from './dto/bossInfo.dto';
import { GeniusInfoDto } from './dto/geniusInfo.dto';
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
      if (user.kind === Kind.BOSS) {
        delete user.job;
        delete user.salary;
        delete user.profile;
      }
      if (user.kind === Kind.GENIUS) {
        delete user.title;
        delete user.company;
        delete user.money;
        delete user.description;
      }
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

  @Get('/targetUser/:id')
  async getUserById(
    @Param('id', ParseUUIDPipe) id: number,
  ): Promise<IResult<User>> {
    try {
      const foundUser = await this.userService.getUserById(id);
      delete foundUser.password;
      delete foundUser.salt;
      return {
        code: CodeNumber.SUCCESS,
        message: 'get target user successfully',
        data: foundUser,
      };
    } catch (error) {
      return {
        code: CodeNumber.FAILED,
        message: 'get target user unsuccessfully',
        error,
      };
    }
  }

  @Put('/updateBossInfo')
  async updateBossInfo(
    @Body() bossInfoDto: BossInfoDto,
    @GetUser() user: User,
  ): Promise<IResult<User>> {
    try {
      const updatedBoss = await this.userService.updateBossInfo(
        bossInfoDto,
        user,
      );
      delete updatedBoss.password;
      delete updatedBoss.salt;
      return {
        code: CodeNumber.SUCCESS,
        message: 'update boss info successfully',
        data: updatedBoss,
      };
    } catch (error) {
      return {
        code: CodeNumber.FAILED,
        message: 'update boss info unsuccessfully',
        error,
      };
    }
  }
  @Put('/updateGeniusInfo')
  async updateGeniusInfo(
    @Body() geniusInfoDto: GeniusInfoDto,
    @GetUser() user: User,
  ): Promise<IResult<User>> {
    try {
      const updatedGenius = await this.userService.updateGeniusInfo(
        geniusInfoDto,
        user,
      );
      delete updatedGenius.password;
      delete updatedGenius.salt;
      return {
        code: CodeNumber.SUCCESS,
        message: 'update Genius info successfully',
        data: updatedGenius,
      };
    } catch (error) {
      return {
        code: CodeNumber.FAILED,
        message: 'update Genius info unsuccessfully',
        error,
      };
    }
  }

  @Get('/geniusList')
  async getGeniusList(): Promise<IResult<User[]>> {
    try {
      return {
        code: CodeNumber.SUCCESS,
        message: 'get Genius List successfully',
        data: await this.userService.getGeniusList(),
      };
    } catch (error) {
      return {
        code: CodeNumber.FAILED,
        message: 'get Genius List unsuccessfully',
        error,
      };
    }
  }
  @Get('/bossList')
  async getBossList(): Promise<IResult<User[]>> {
    try {
      return {
        code: CodeNumber.SUCCESS,
        message: 'get Boss List successfully',
        data: await this.userService.getBossList(),
      };
    } catch (error) {
      return {
        code: CodeNumber.FAILED,
        message: 'get Boss List unsuccessfully',
        error,
      };
    }
  }
}
