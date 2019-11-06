import { Injectable, Body } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUser } from './get-user.decorator';
import { BossInfoDto } from './dto/bossInfo.dto';
import { GeniusInfoDto } from './dto/geniusInfo.dto';
import { User } from './user.entity';
import { Kind } from '../interfaces/';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async updateBossInfo(
    @Body() bossInfoDto: BossInfoDto,
    @GetUser() user: User,
  ): Promise<User> {
    const { avatar, title, company, money, description } = bossInfoDto;
    const updatingBoss = await this.userRepository.findOne(user.id);
    updatingBoss.avatar = avatar;
    updatingBoss.title = title;
    updatingBoss.company = company;
    updatingBoss.money = money;
    updatingBoss.description = description;
    await updatingBoss.save();

    return updatingBoss;
  }
  async updateGeniusInfo(
    @Body() geniusInfoDto: GeniusInfoDto,
    @GetUser() user: User,
  ): Promise<User> {
    const { avatar, job, salary, profile } = geniusInfoDto;
    const updatingGenius = await this.userRepository.findOne(user.id);
    updatingGenius.avatar = avatar;
    updatingGenius.job = job;
    updatingGenius.salary = salary;
    updatingGenius.profile = profile;
    await updatingGenius.save();
    return updatingGenius;
  }

  async getGeniusList(): Promise<User[]> {
    return this.userRepository.find({ kind: Kind.GENIUS });
  }
  async getBossList(): Promise<User[]> {
    return this.userRepository.find({ kind: Kind.BOSS });
  }
}
