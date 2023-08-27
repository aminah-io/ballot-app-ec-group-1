import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-toolbox";
// import "hardhat";
// import "ethers";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
	solidity: "0.8.19",
	paths: { tests: "tests", artifacts: '../frontend/artifacts' },
};

export default config;