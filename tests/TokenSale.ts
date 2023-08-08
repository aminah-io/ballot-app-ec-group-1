import { expect } from "chai";
import { ethers } from "hardhat";
import { ERC20, MyERC20Token, TokenSale } from "../typechain-types";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { Typed, AddressLike } from "ethers";

const RATIO = 10;

describe("NFT Shop", async () => {
    let deployer: HardhatEthersSigner;
    let acc1: HardhatEthersSigner;
    let acc2: HardhatEthersSigner;
    let tokenSaleContract: TokenSale;
    let myTokenContract: MyERC20Token;

    async function deployContracts() {
        // Deploying an ERC20 Token contract
        const myTokenContractFactory = await ethers.getContractFactory("MyERC20Token");
        const myTokenContract_ = await myTokenContractFactory.deploy();
        await myTokenContract_.waitForDeployment();
        const myTokenContractAddress = await myTokenContract_.getAddress();

        // Deploying the Token Sale contract
        const tokenSaleContractFactory = await ethers.getContractFactory("TokenSale");
        const tokenSaleContract_ = await tokenSaleContractFactory.deploy(RATIO, myTokenContractAddress);
        await tokenSaleContract_.waitForDeployment();

        return { tokenSaleContract_, myTokenContract_ }
    }

  beforeEach(async () => {
    [ deployer, acc1, acc2 ] = await ethers.getSigners();
    const { tokenSaleContract_, myTokenContract_ } = await loadFixture(deployContracts);
    tokenSaleContract = tokenSaleContract_;
    myTokenContract = myTokenContract_;
  });

  describe("When the Shop contract is deployed", async () => {

    it("defines the ratio as provided in parameters", async () => {
        const ratio = await tokenSaleContract.ratio();
        expect(ratio).to.eq(RATIO);
    });

    it("uses a valid ERC20 as payment token", async () => {
      const paymentTokenAddress = await tokenSaleContract.paymentToken();
      const tokenSaleContractFactory = await ethers.getContractFactory("ERC20");
      const paymentToken = tokenSaleContractFactory.attach(paymentTokenAddress) as ERC20;
      // let's call the balanceOf method and it should not revert
      await expect(paymentToken.balanceOf(deployer.address)).not.to.be.reverted;
      await expect(paymentToken.totalSupply()).not.to.be.reverted;
    });
  });

  describe("When a user buys an ERC20 from the Token contract", async () => {
    beforeEach(async () => {});

    it("charges the correct amount of ETH", async () => {
      throw new Error("Not implemented");
    });

    it("gives the correct amount of tokens", async () => {
      throw new Error("Not implemented");
    });
  });

  describe("When a user burns an ERC20 at the Shop contract", async () => {
    it("gives the correct amount of ETH", async () => {
      throw new Error("Not implemented");
    });

    it("burns the correct amount of tokens", async () => {
      throw new Error("Not implemented");
    });
  });

  describe("When a user buys an NFT from the Shop contract", async () => {
    it("charges the correct amount of ERC20 tokens", async () => {
      throw new Error("Not implemented");
    });

    it("gives the correct NFT", async () => {
      throw new Error("Not implemented");
    });
  });

  describe("When a user burns their NFT at the Shop contract", async () => {
    it("gives the correct amount of ERC20 tokens", async () => {
      throw new Error("Not implemented");
    });
  });

  describe("When the owner withdraws from the Shop contract", async () => {
    it("recovers the right amount of ERC20 tokens", async () => {
      throw new Error("Not implemented");
    });

    it("updates the owner pool account correctly", async () => {
      throw new Error("Not implemented");
    });
  });
});
