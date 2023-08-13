import { ethers } from "ethers";
import { TokenizedBallot, TokenizedBallot__factory } from "../typechain-types";

import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
    const args = process.argv.slice(2);

    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

    const tokenizedBallotContractAddress = "0xC572b96f571FB5bfe6438C3981A4E4dF02c7ad43";

    const tokenizedBallotFactory = new TokenizedBallot__factory(wallet);
    const tokenizedBallotContract = await tokenizedBallotFactory.attach(tokenizedBallotContractAddress) as TokenizedBallot;

    // const proposal = args[0];
    // const amount = ethers.parseUnits(args[1]);

    const voteTx = await tokenizedBallotContract.votingPower("0x5836e20e8720aF26E04a5Bd31E46726533b4fa51");
    console.log("vote power", voteTx);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});