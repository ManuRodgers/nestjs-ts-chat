import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signup(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    try {
      const { email, password } = authCredentialsDto;
      const user = new User();
      user.email = email;
      user.salt = await bcrypt.genSalt(8);
      user.password = await this.hashPassword(password, user.salt);
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(error.detail);
      } else {
        throw new InternalServerErrorException(error.detail);
      }
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    try {
      const { email, password } = authCredentialsDto;
      const user = await this.findOne({ email });
      if (user && (await user.validatePassword(password))) {
        return user.email;
      } else {
        return null;
      }
    } catch (error) {
      throw new InternalServerErrorException(error.detail);
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
