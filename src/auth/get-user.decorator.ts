import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { User } from './user.entity';

export const GetUser = createParamDecorator(
  (data: any, req: Request): User => req.user as User,
);
