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

const serverConfig: IServerConfig = config.get('server');

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatRepository: ChatRepository) {}

  @SubscribeMessage('sendMsg')
  identity(
    @MessageBody() data: number,
    @ConnectedSocket() io: Socket,
  ): WsResponse<unknown> {
    console.log(`hello`);
    console.log('TCL: EventsGateway -> constructor -> data', data);
    const event = 'sendMsg';
    return { event, data };
  }
}
