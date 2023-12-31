import { Ballot__factory } from "../typechain-types";
import hre, { ethers } from "hardhat";
import * as dotenv from "dotenv";
import { confirmContinue } from "./utils"
dotenv.config();

const PROPOSALS = ["Coffee", "Tea", "Juice", "Water"]

async function main() {
  await confirmContinue({
    contract: "Ballot",
    network: hre.network.name,
    chainId: hre.network.config.chainId,
  });

  const proposals = process.argv.slice(2);
  console.log("deploying Ballot Contract");
  console.log("Proposals: ");
  PROPOSALS.forEach((element, index) => {
    console.log(`Proposal #${index + 1}: ${element}`);
  });

  const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

  console.log(`Using address ${wallet.address}`);
  
  
  const ballotFactory = new Ballot__factory(wallet);
  const ballotContract = await ballotFactory.deploy(
    PROPOSALS.map(ethers.encodeBytes32String)
  );
  await ballotContract.waitForDeployment();
  const address = await ballotContract.getAddress();
  console.log(`Contract deployed at address: ${address}`);
  for (let i = 0; i < proposals.length; i++) {
    const proposal = await ballotContract.proposals(i);
    const name = ethers.decodeBytes32String(proposal.name);
    console.log({ i, name, proposal });
  }
    
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
