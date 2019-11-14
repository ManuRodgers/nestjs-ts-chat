import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as config from 'config';
import { IServerConfig } from '../config/interfaces';
import { ChatRepository } from './chat.repository';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat } from './chat.entity';

const serverConfig: IServerConfig = config.get('server');

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatRepository: ChatRepository) {}

  @SubscribeMessage('sendMsgAsync')
  async sendMsgAsync(
    @MessageBody() data: CreateChatDto,
    @ConnectedSocket() io: Socket,
  ): Promise<WsResponse<unknown>> {
    try {
      const { text, from, to, combinedId, position, createdAt, isRead } = data;
      const newChat = this.chatRepository.create({
        text,
        from,
        to,
        combinedId,
        position,
        isRead,
        createdAt,
      });
      await newChat.save();
      // broadcast the new chat to every one
      this.server.emit(`receiveMsgAsync`, newChat);
      const event = 'sendMsgAsync';
      return { event, data: newChat };
    } catch (error) {
      console.error('TCL: error', error);
    }
  }

  async getChatListByCombinedId(combinedId: string): Promise<Chat[]> {
    try {
      return this.chatRepository.find({
        where: {
          combinedId,
        },
      });
    } catch (error) {
      console.error('TCL: error', error);
    }
  }
  async getChatListByToId(toId: string): Promise<Chat[]> {
    try {
      return this.chatRepository.find({
        where: {
          to: toId,
        },
      });
    } catch (error) {
      console.error('TCL: error', error);
    }
  }
}
