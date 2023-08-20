import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';

dotenv.config({ path: '../../../.env' });

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getAddress')
  getAddress(): string {
    return this.appService.getTokenAddress();
  }

  @Post('getVotingToken/:address')
  getVotingToken(@Param('address') address: string): Promise<bigint> {
    return this.appService.getVotingToken(address);
  }

  @Get('getTokenBalance/:address')
  getTokenBalance(@Param('address') address: string): Promise<bigint> {
    return this.appService.getBalance(address);
  }
}
