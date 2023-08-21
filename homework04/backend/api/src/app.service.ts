import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ethers } from 'ethers';
// import * as myTokenJson from '../../../frontend/artifacts/contracts/MyToken.sol/MyToken.json';

dotenv.config({ path: '../../.env' });

const TOKEN_CONTRACT_ADDRESS = process.env.TOKEN_CONTRACT_ADDRESS ?? ""

@Injectable()
export class AppService {
  provider: ethers.Provider;
  wallet: ethers.Wallet;
  contract: ethers.Contract;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", this.provider);
    // this.contract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, myTokenJson.abi, this.wallet);
  }

  getTokenAddress(): string {
    return TOKEN_CONTRACT_ADDRESS;
  }

  getVotingToken(amount: string): Promise<bigint> {
    return this.contract.mint(ethers.parseUnits(amount));
  }

  getBalance(address: string): Promise<bigint> {
    return this.contract.balanceOf(address);
  }
}
