import { Injectable } from "@nestjs/common";
import { ethers } from "ethers";
import * as myTokenJson from "./assets/MyToken.json";
import * as dotenv from "dotenv";

dotenv.config({ path: "./../../.env" });

const TOKENIZED_BALLOT_ADDRESS = process.env.TOKENIZED_BALLOT_ADDRESS ?? "";

@Injectable()
export class AppService {
  provider: ethers.Provider;
  wallet: ethers.Wallet;
  contract: ethers.Contract;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(
      process.env.RPC_ENDPOINT_URL ?? "",
    );
    this.wallet = new ethers.Wallet(
      process.env.PRIVATE_KEY ?? "",
      this.provider,
    );
    this.contract = new ethers.Contract(
      TOKENIZED_BALLOT_ADDRESS,
      myTokenJson.abi,
      this.wallet,
    );
  }

  getTokenAddress(): string {
    return TOKENIZED_BALLOT_ADDRESS;
  }

  async requestVotingTokens(address: string, amount: number): Promise<any> {
    const amountToString = amount.toString();
    const tx = await this.contract.mint(
      address,
      ethers.parseUnits(amountToString),
    );
    const receipt = await tx.wait();
    return {
      success: true,
      txHash: receipt.hash,
    };
  }

  getBalance(address: string): Promise<bigint> {
    return this.contract.balanceOf(address);
  }

  async mintTokens(address: string): Promise<any> {
    console.log("Minting Tx to" + address);
    const mintAmount = ethers.parseUnits("1");
    const tx = await this.contract.mint(address, mintAmount);
    const receipt = await tx.wait();

    return { result: true, txHash: receipt.hash };
  }
}
