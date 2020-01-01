import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from './events/events.module';
import { AppController } from './app/app.controller';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, EventsModule],
  controllers: [AppController],
})
export class AppModule {}
