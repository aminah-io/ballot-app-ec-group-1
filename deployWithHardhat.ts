import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

async function main() {
  const proposals = process.argv.slice(2);
  console.log("deploying Ballot Contract");
  console.log("Proposals: ");
  proposals.forEach((element, index) => {
    console.log(`Proposal N. ${index + 1}: ${element}`);
  });

  const ballotFactory = await ethers.getContractFactory("Ballot");
  const ballotContract = await ballotFactory.deploy(
    proposals.map(ethers.encodeBytes32String)
  );
  await ballotContract.waitForDeployment();
  const address = await ballotContract.getAddress();

  const provider = new ethers.JsonRpcProvider(process.env.RPC_ENDPOINT_URL ?? "");
  const lastBlock = await provider.getBlock("latest");
  console.log({lastBlock});

  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider)

  console.log(`Using address ${wallet.address}`);
  const balanceBN = await provider.getBalance(wallet.address);
  const balance = Number(ethers.formatUnits(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }
  
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
