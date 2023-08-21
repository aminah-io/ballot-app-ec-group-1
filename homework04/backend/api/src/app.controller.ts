import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../../../.env' });

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get-address')
  getAddress(): string {
    return this.appService.getTokenAddress();
  }

  @Post('request-voting-tokens/:amount')
  getVotingToken(@Param('amount') amount: string): Promise<bigint> {
    return this.appService.getVotingToken(amount);
  }

  @Get('get-token-balance/:address')
  getTokenBalance(@Param('address') address: string): Promise<bigint> {
    return this.appService.getBalance(address);
  }
}
