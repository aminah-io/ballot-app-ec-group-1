import { ethers } from "hardhat";
import { Ballot__factory } from "../typechain-types";

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

async function main() {
  const proposals = process.argv.slice(2);
  console.log("deploying Ballot Contract");
  console.log("Proposals: ");
  proposals.forEach((element, index) => {
    console.log(`Proposal N. ${index + 1}: ${element}`);
  });

  const provider = ethers.getDefaultProvider("sepolia");
  const lastBlock = provider.getBlock("latest");
  console.log(lastBlock);
  
  
  const ballotFactory = new Ballot__factory();
  const ballotContract = await ballotFactory.deploy(
    proposals.map(ethers.encodeBytes32String)
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
