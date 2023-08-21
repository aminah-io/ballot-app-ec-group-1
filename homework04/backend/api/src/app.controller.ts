import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
import { RequestVotingTokensDto } from './dtos/requestVotingTokens.dto';

dotenv.config({ path: '../../.env' });

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get-address')
  getAddress(): string {
    return this.appService.getTokenAddress();
  }

  @Post('request-voting-tokens')
  requestVotingTokens(@Body() body: RequestVotingTokensDto): Promise<bigint> {
    return this.appService.requestVotingTokens(body.address, body.amount);
  }

  @Get('get-token-balance/:address')
  getTokenBalance(@Param('address') address: string): Promise<bigint> {
    return this.appService.getBalance(address);
  }
}
