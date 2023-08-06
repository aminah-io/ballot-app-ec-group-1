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
    const ballotContract = ballotFactory.attach("0xdBB0C5c95C69e4396eB7Cf8Bcc1A23D76687bCB6") as Ballot;

    const contractAddress = await ballotContract.getAddress();
    console.log(`Contract deployed at address ${contractAddress}`);

    const winningProposalName = await ballotContract.winnerName();

    console.log("Winning proposal name is ", ethers.decodeBytes32String(winningProposalName));

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});