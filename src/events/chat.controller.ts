import { Controller, Body, Post } from '@nestjs/common';
import { IResult, CodeNumber } from '../interfaces/result.interface';
import { Chat } from './chat.entity';
import { EventsGateway } from './events.gateway';

@Controller('/chat')
export class ChatController {
  constructor(private readonly eventsGateway: EventsGateway) {}

  @Post(`/chatListByCombinedId`)
  async getChatListByCombinedId(
    @Body(`combinedId`) combinedId: string,
  ): Promise<IResult<Chat[]>> {
    try {
      return {
        code: CodeNumber.SUCCESS,
        message: ' getChatListByCombinedId successfully',
        data: await this.eventsGateway.getChatListByCombinedId(combinedId),
      };
    } catch (error) {
      console.error('TCL: error', error);
      return {
        code: CodeNumber.FAILED,
        message: ' getChatListByCombinedId unsuccessfully',
        error,
      };
    }
  }
  @Post(`/chatListByToId`)
  async getChatListByToId(
    @Body(`toId`) toId: string,
  ): Promise<IResult<Chat[]>> {
    try {
      return {
        code: CodeNumber.SUCCESS,
        message: ' getChatListByToId successfully',
        data: await this.eventsGateway.getChatListByToId(toId),
      };
    } catch (error) {
      console.error('TCL: error', error);
      return {
        code: CodeNumber.FAILED,
        message: ' getChatListByToId unsuccessfully',
        error,
      };
    }
  }
}
