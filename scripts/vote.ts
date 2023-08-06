import { ethers } from "ethers";
import { Ballot, Ballot__factory } from "../typechain-types";
import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
    const parameter = process.argv.slice(2);

    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");

    // Refused to work with mnemonics for some reason
    const wallet = new ethers.Wallet (process.env.PRIVATE_KEY ?? "", provider);

    console.log(`Using address ${wallet.address}`);
    const balanceBN = await provider. getBalance(wallet.address);
    const balance = Number (ethers. formatUnits (balanceBN));
    console.log(`Wallet balance ${balance}`);

    if (balance < 0.01) {
        throw new Error("Not enough ethers");
    }

    const ballotfactory = new Ballot__factory(wallet);
    const ballotContract = ballotfactory.attach("0xF6b84057fa1188E99c257d80d96e5C8EE0192992") as Ballot;


    const tx = await ballotContract.vote(Number(parameter))
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
