import { ethers } from "ethers";
import { TokenizedBallot, TokenizedBallot__factory } from "../typechain-types";

import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

    const tokenizedBallotContractAddress = "0xC572b96f571FB5bfe6438C3981A4E4dF02c7ad43";

    const tokenizedBallotFactory = new TokenizedBallot__factory(wallet);
    const tokenizedBallotContract = await tokenizedBallotFactory.attach(tokenizedBallotContractAddress) as TokenizedBallot;

    const winnerName = await tokenizedBallotContract.winnerName();
    const winner = await tokenizedBallotContract.winningProposal();
    const winnerVoteCount = (await tokenizedBallotContract.proposals(Number(winner))).voteCount;

    console.log("Winning proposal name is ", ethers.decodeBytes32String(winnerName), "with number of votes", winnerVoteCount);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});