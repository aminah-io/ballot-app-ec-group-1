import { ethers } from "ethers";
import { MyToken, MyToken__factory } from "../typechain-types";

import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
    const args = process.argv.slice(2);

    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

    console.log(`Using address ${wallet.address}`);

    const myTokenContractAddress = "0x83555B198FB77d64B296d5963203B4a160C241bc";
    const myTokenFactory = new MyToken__factory(wallet);
    const myTokenContract = myTokenFactory.attach(myTokenContractAddress) as MyToken;

    const delegateAddress = args[0];

    const delegateTx = await myTokenContract.delegate(delegateAddress);
    delegateTx.wait();

    console.log("Delegate to the address ", delegateAddress);

    // Check the voting power
    const votes = await myTokenContract.getVotes(delegateAddress);
    console.log(
        `Account ${delegateAddress} has ${votes.toString()} units of voting power`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});