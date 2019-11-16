import { Controller, Body, Post, Put, UseGuards } from '@nestjs/common';
import { IResult, CodeNumber } from '../interfaces/result.interface';
import { Chat } from './chat.entity';
import { EventsGateway } from './events.gateway';
import { AuthGuard } from '@nestjs/passport';

@Controller('/chat')
@UseGuards(AuthGuard(`jwt`))
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
  @Post(`/chatListByUserId`)
  async getChatListByUserId(
    @Body(`userId`) userId: string,
  ): Promise<IResult<Chat[]>> {
    try {
      return {
        code: CodeNumber.SUCCESS,
        message: ' getChatListByUserId successfully',
        data: await this.eventsGateway.getChatListByUserId(userId),
      };
    } catch (error) {
      console.error('TCL: error', error);
      return {
        code: CodeNumber.FAILED,
        message: ' getChatListByUserId unsuccessfully',
        error,
      };
    }
  }
  @Put(`/readMsgAsync`)
  async readMsgAsync(@Body() body: { to: string; from: string }): Promise<
    IResult<Chat[]>
  > {
    const { from, to } = body;
    await this.eventsGateway.readMsgAsync(from, to);
    try {
      return {
        code: CodeNumber.SUCCESS,
        message: ' getChatListByUserId successfully',
        // data: await this.eventsGateway.getChatListByUserId(userId),
      };
    } catch (error) {
      console.error('TCL: error', error);
      return {
        code: CodeNumber.FAILED,
        message: ' getChatListByUserId unsuccessfully',
        error,
      };
    }
  }
}
