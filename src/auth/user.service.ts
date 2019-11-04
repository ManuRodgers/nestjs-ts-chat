import { Injectable, Body } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { GetUser } from './get-user.decorator';
import { BossInfoDto } from './dto/bossInfo.dto';
import { User } from './user.entity';

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
    const b = { ...updatingBoss, ...bossInfoDto } as User;
    updatingBoss.avatar = avatar;
    updatingBoss.title = title;
    updatingBoss.company = company;
    updatingBoss.money = money;
    updatingBoss.description = description;
    await updatingBoss.save();

    return updatingBoss;
  }
}
