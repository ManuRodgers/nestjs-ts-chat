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
    const chatListByCombinedId = await this.eventsGateway.getChatListByCombinedId(
      combinedId,
    );
    try {
      return {
        code: CodeNumber.SUCCESS,
        message: ' getChatListByCombinedId successfully',
        data: chatListByCombinedId,
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
}
