import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
// import * as myTokenJson from './assets/MyToken.json';

const TOKEN_CONTRACT_ADDRESS = "0x83555B198FB77d64B296d5963203B4a160C241bc"

import { MyTokenAbi } from './abi/MyTokenAbi';


// const TOKEN_CONTRACT_ADDRESS = process.env.TOKEN_CONTRACT_ADDRESS ?? "";
const PRIVATE_KEY = process.env.PRIVATE_KEY ?? "";
const RPC_ENDPOINT_URL = process.env.RPC_ENDPOINT_URL ?? "";


@Injectable()
export class AppService {
  provider: ethers.Provider;
  wallet: ethers.Wallet;
  contract: ethers.Contract;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", this.provider);
    this.contract = new ethers.Contract(TOKEN_CONTRACT_ADDRESS, MyTokenAbi, this.wallet);
  }

  getHello(): string {
    return 'Hello World!';
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

  async mintTokens(address: string): Promise<any> {

    console.log("Minting tx to" + address);
    const mintAmount = ethers.parseUnits("1");
    const tx = await this.contract.mint(address, mintAmount);
    const receipt = await tx.wait();

    return { result: true, txHash: receipt.hash };
  }

}
