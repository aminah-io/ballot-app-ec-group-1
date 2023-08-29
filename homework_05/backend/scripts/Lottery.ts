import { ethers } from "ethers";
import { Lottery, Lottery__factory } from "../typechain-types";

let lotteryContract: Lottery;

const BET_PRICE = 1;
const BET_FEE = 0.2;
const TOKEN_RATIO = 1n;

async function main() {
  await initLotteryContract();

  async function initLotteryContract() {
    // -------------- BEGIN Get wallet for deployer
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

    console.log(`Contract deployed using address: ${wallet.address}`);
    // -------------- END Get wallet for deployer

    // -------------- BEGIN Create and deploy Lottery Contract
    const lotteryContractFactory = new Lottery__factory(wallet);
    lotteryContract = await lotteryContractFactory.deploy(
      "LotteryToken",
      "LT0",
      TOKEN_RATIO,
      ethers.parseUnits(BET_PRICE.toFixed(18)),
      ethers.parseUnits(BET_FEE.toFixed(18))
    );
    await lotteryContract.waitForDeployment();

    const tokenAddress = await lotteryContract.paymentToken();
    console.log(`🪙 Lottery Contract Token deployed to address: ${tokenAddress}`);
    // -------------- END Create and deploy Lottery Contract
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});