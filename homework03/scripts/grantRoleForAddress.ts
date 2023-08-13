import { ethers } from "ethers";
import { MyToken, MyToken__factory } from "../typechain-types";

import * as dotenv from 'dotenv';
dotenv.config();

async function main() {
    const args = process.argv.slice(2);

    const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

    console.log(`Using address ${wallet.address}`);


    const myTokenContractAddress = "";
    const myTokenFactory = new MyToken__factory(wallet);
    const myTokenContract = myTokenFactory.attach(myTokenContractAddress) as MyToken;

    const grantRoleAddress = args[0];
    const minterRole = await myTokenContract.MINTER_ROLE();

    const grantRoleTx = await myTokenContract.grantRole(minterRole, grantRoleAddress);
    grantRoleTx.wait();

    console.log("Minter role granted for the address ", grantRoleAddress);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});