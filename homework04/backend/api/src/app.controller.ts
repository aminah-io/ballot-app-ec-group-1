import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MintTokensDto } from './dtos/mintTokens.dto';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

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

  @Post('mint-tokens')
  mintTokens(@Body() body: MintTokensDto): Promise<any> {
    return this.appService.mintTokens(body.address);
  }
}
