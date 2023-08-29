import { ethers } from "ethers";
import { MyToken, MyToken__factory } from "../typechain-types";

import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
    const args = process.argv.slice(2);

    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

    console.log(`Using address ${wallet.address}`);


    const myTokenContractAddress = "0xeC6f798a7Ad0D224b12C3c3Ef8876842580322C5";
    const myTokenFactory = new MyToken__factory(wallet);
    const myTokenContract = myTokenFactory.attach(myTokenContractAddress) as MyToken;

    const mintTo = args[0];
    const mintAmount = ethers.parseUnits(args[1]);

    const mintTx = await myTokenContract.mint(mintTo, mintAmount);
    mintTx.wait();

    console.log("Minted amount ", mintAmount, "to the address ", mintTo);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});