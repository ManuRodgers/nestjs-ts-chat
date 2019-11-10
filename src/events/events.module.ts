import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsGateway } from './events.gateway';
import { ChatRepository } from './chat.repository';
@Module({
  imports: [TypeOrmModule.forFeature([ChatRepository])],
  providers: [EventsGateway],
})
export class EventsModule {}
