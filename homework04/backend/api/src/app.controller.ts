import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MintTokensDto } from './dtos/mintTokens.dto';
import { RequestVotingTokensDto } from './dtos/requestVotingTokens.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

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

  @Post('mint-tokens')
  mintTokens(@Body() body: MintTokensDto): Promise<any> {
    return this.appService.mintTokens(body.address);
  }
}
