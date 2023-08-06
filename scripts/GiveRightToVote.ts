import { ethers } from "ethers";
import { Ballot, Ballot__factory } from "../typechain-types";

import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
    const args = process.argv.slice(2);

    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

    console.log(`Using address ${wallet.address}`);

    const ballotFactory = new Ballot__factory(wallet);
    const ballotContract = ballotFactory.attach("0xF6b84057fa1188E99c257d80d96e5C8EE0192992") as Ballot;

    const contractAddress = await ballotContract.getAddress();
    console.log(`Contract deployed at address ${contractAddress}`);

    const voterAddress = await args[0];
    console.log(`Giving right to vote for address ${voterAddress}`);

    await ballotContract.giveRightToVote(voterAddress);

    const voterWeight = (await ballotContract.voters(voterAddress)).weight;
    console.log("Voter weight now is", voterWeight);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});