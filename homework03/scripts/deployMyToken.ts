import { ethers } from "ethers";
import { MyToken__factory } from "../typechain-types";

import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

    const myTokenFactory = new MyToken__factory(wallet);
    const myTokenContract = await myTokenFactory.deploy(
    );
    await myTokenContract.waitForDeployment();

    const address = await myTokenContract.getAddress();
    console.log(`Contract deployed at address ${address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});