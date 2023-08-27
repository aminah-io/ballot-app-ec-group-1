import styles from "./mainComponent.module.css";
import PageBody from "../PageBody";
import {
  useAccount,
} from "wagmi";

import * as dotenv from "dotenv";
dotenv.config({ path: "./../../../.env" });


const TOKENIZED_BALLOT_ADDRESS = process.env.TOKENIZED_BALLOT_ADDRESS as `0x${string}` ?? "";

import { TokenizedBallotAbi } from "@/assets/TokenizedBallotAbi";
import TokenBalance from "../TokenBalance";
import TokenName from "../TokenName";
import GetWinner from "../GetWinner";
import DelegateVote from "../DelegateVote";

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
          <TokenBalance address={address} tokenizedBallotAddress={undefined} abi={undefined}></TokenBalance>
          <TokenName tokenizedBallotAddress={undefined} abi={undefined}></TokenName>
          <DelegateVote tokenizedBallotAddress={undefined} abi={undefined}></DelegateVote>
          <GetWinner tokenizedBallotAddress={undefined} abi={undefined}></GetWinner>

        </div>
      ) : (
        <div className={styles.container}>
          <h2>Please connect your wallet</h2>
        </div>
      )}
    </div>
  );
}




