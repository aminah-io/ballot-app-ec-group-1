import styles from "./mainComponent.module.css";
import PageBody from "../PageBody";
import {
  useAccount,
  useNetwork,
  useBalance,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
  usePrepareContractWrite,
} from "wagmi";

import { ethers, BytesLike } from "ethers";

// import { tokenBalanceAbi, tokenNameAbi } from "../../abis/tokenAbi";
const TOKEN_CONTRACT_ADDRESS = "0x83555B198FB77d64B296d5963203B4a160C241bc";

const TOKENIZED_BALLOT_ADDRESS = "0xC572b96f571FB5bfe6438C3981A4E4dF02c7ad43";

import { MyTokenAbi } from "../../assets/MyTokenAbi";
import { useEffect, useState } from "react";
import { TokenizedBallotAbi } from "@/assets/TokenizedBallotAbi";

export default function MainComponent() {
  const { address, isConnecting, isDisconnected } = useAccount();
  return (
    <div className={styles.container}>
      <header className={styles.header_container}>
        <div className={styles.header}>
          <h1>
            Group <span>1 Tokenized Ballot</span> dApp
          </h1>
        </div>
      </header>
      {address ? (
        <div className={styles.get_started}>
          <PageBody
            address={address}
            tokenizedBallotAddress={TOKENIZED_BALLOT_ADDRESS}
            abi={TokenizedBallotAbi}
          />
          {/* <TokenBalance address={address}></TokenBalance>
          <TokenName></TokenName>
          <DelegateVote></DelegateVote>
          <GetWinner></GetWinner> */}

        </div>
      ) : (
        <div className={styles.container}>
          <h2>Please connect your wallet</h2>
        </div>
      )}
    </div>
  );
}




