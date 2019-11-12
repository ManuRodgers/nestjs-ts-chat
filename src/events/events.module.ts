import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsGateway } from './events.gateway';
import { ChatRepository } from './chat.repository';
import { ChatController } from './chat.controller';
@Module({
  imports: [TypeOrmModule.forFeature([ChatRepository])],
  controllers: [ChatController],
  providers: [EventsGateway],
})
export class EventsModule {}
