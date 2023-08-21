import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ethers } from 'ethers';
// import * as myTokenJson from '../../../../homework03/artifacts/contracts/ERC20Votes.sol/MyToken.json';
import { MyTokenAbi } from './abi/MyTokenAbi';

dotenv.config();

const TOKEN_CONTRACT_ADDRESS = process.env.TOKEN_CONTRACT_ADDRESS ?? "";
const PRIVATE_KEY = process.env.PRIVATE_KEY ?? "";
const RPC_ENDPOINT_URL = process.env.RPC_ENDPOINT_URL ?? "";

interface RequestVotingTokensOutput {

}

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

  async requestVotingTokens(address: string, amount: number): Promise<any> {
    const amountToString = amount.toString();
    const tx = await this.contract.mint(address, ethers.parseUnits(amountToString));
    const receipt = await tx.wait();
    return {
      success: true,
      txHash: receipt.hash,
    }
  }

  getBalance(address: string): Promise<bigint> {
    return this.contract.balanceOf(address);
  }
}
