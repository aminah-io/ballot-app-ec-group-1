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
const TOKEN_CONTRACT_ADDRESS = "0xeC6f798a7Ad0D224b12C3c3Ef8876842580322C5";

const TOKENIZED_BALLOT_ADDRESS = "0x8255121e40298D8b80d9D648A2c525810Df77E58";

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
            myToken={TOKEN_CONTRACT_ADDRESS}
          />
        </div>
      ) : (
        <div className={styles.container}>
          <h2>Please connect your wallet</h2>
        </div>
      )}
    </div>
  );
}
