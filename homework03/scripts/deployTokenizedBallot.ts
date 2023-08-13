import { ethers } from "ethers";
import { TokenizedBallot__factory } from "../typechain-types";

import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
    const proposals = process.argv.slice(2);
    console.log("deploying TokenizedBallot Contract");
    console.log("Proposals: ");
    proposals.forEach((element, index) => {
        console.log(`Proposal N. ${index + 1}: ${element}`);
    });
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

    const myTokenAddress = "0x83555B198FB77d64B296d5963203B4a160C241bc";
    const blockNumber = await provider.getBlockNumber();

    const tokenizedBallotFactory = new TokenizedBallot__factory(wallet);
    const tokenizedBallotContract = await tokenizedBallotFactory.deploy(
        proposals.map(ethers.encodeBytes32String),
        myTokenAddress, blockNumber);
    await tokenizedBallotContract.waitForDeployment();

    const address = await tokenizedBallotContract.getAddress();
    console.log(`Contract deployed at address ${address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});