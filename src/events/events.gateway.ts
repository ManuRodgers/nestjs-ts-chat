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

const serverConfig: IServerConfig = config.get('server');

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('sendMsg')
  identity(
    @MessageBody() data: number,
    @ConnectedSocket() io: Socket,
  ): WsResponse<unknown> {
    const event = 'sendMsg';
    return { event, data };
  }
}
