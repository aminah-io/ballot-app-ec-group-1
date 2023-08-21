import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ethers } from 'ethers';
// import * as myTokenJson from '../../../../homework03/artifacts/contracts/ERC20Votes.sol/MyToken.json';
import { MyTokenAbi } from './abi/MyTokenAbi';

dotenv.config();

const TOKEN_CONTRACT_ADDRESS = process.env.TOKEN_CONTRACT_ADDRESS ?? "";
const PRIVATE_KEY = process.env.PRIVATE_KEY ?? "";
const RPC_ENDPOINT_URL = process.env.RPC_ENDPOINT_URL ?? "";

@Injectable()
export class AppService {
  provider: ethers.Provider;
  wallet: ethers.Wallet;
  contract: ethers.Contract;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(RPC_ENDPOINT_URL);
    this.wallet = new ethers.Wallet(PRIVATE_KEY, this.provider);
    this.contract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, MyTokenAbi, this.wallet);
  }

  getTokenAddress(): string {
    return TOKEN_CONTRACT_ADDRESS;
  }

  requestVotingTokens(address: string, amount: number): Promise<bigint> {
    const amountToString = amount.toString();
    return this.contract.mint(address, ethers.parseUnits(amountToString));
  }

  getBalance(address: string): Promise<bigint> {
    return this.contract.balanceOf(address);
  }
}
