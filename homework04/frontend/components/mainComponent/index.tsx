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
          <PageBody address={address}></PageBody>
          <TokenBalance address={address}></TokenBalance>
          <TokenName></TokenName>
          <DelegateVote></DelegateVote>
          <GetWinner></GetWinner>
        </div>
      ) : (
        <div className={styles.container}>
          <h2>Please connect your wallet</h2>
        </div>
      )}
    </div>
  );
}

function TokenBalance(params: { address: `0x${string}` }) {
  const { data, isError, isLoading } = useContractRead({
    address: TOKEN_CONTRACT_ADDRESS,
    abi: MyTokenAbi,
    functionName: "balanceOf",
    args: [params.address],
  });

  if (isLoading) return <div>Fetching balance…</div>;
  if (!data) return <p>No profile data</p>;

  const balance = (data as BigInt).toString();

  if (isError) return <div>Error fetching balance</div>;
  return <div>Balance: {balance}</div>;
}

function TokenName() {
  const { data, isError, isLoading } = useContractRead({
    address: TOKEN_CONTRACT_ADDRESS,
    abi: MyTokenAbi,
    functionName: "name",
  });

  const name = typeof data === "string" ? data : 0;

  if (isLoading) return <div>Fetching name…</div>;
  if (isError) return <div>Error fetching name</div>;
  return <div>Token name: {name}</div>;
}

function DelegateVote() {
  const [address, setAddress] = useState<string>("");

  const { config } = usePrepareContractWrite({
    address: TOKEN_CONTRACT_ADDRESS,
    abi: MyTokenAbi,
    functionName: "delegate",
    args: [address],
  });

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div>
      Address:{" "}
      <input type="text" onChange={(e) => setAddress(e.target.value)}></input>
      <button disabled={isLoading} onClick={() => write?.()}>
        Delegate
      </button>
      {isLoading && <p>Delegating...</p>}
      {isSuccess && (
        <div>
          <p>Successfully delegated</p>
          <p>{`Transaction Hash: ${data?.hash}`}</p>
        </div>
      )}
    </div>
  );
}

function VotingPower() {
  const { address } = useAccount();

  const { data, isError, isLoading } = useContractRead({
    address: TOKENIZED_BALLOT_ADDRESS,
    abi: TokenizedBallotAbi,
    functionName: "votingPower",
    args: [address],
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching voting power</p>;

  const votingPower = (data as BigInt).toString();

  return (
    <div>
      <p>Your voting Power: {votingPower}</p>
    </div>
  );
}

function Vote() {
  // Add here parameters from UI

  const { config } = usePrepareContractWrite({
    address: TOKENIZED_BALLOT_ADDRESS,
    abi: TokenizedBallotAbi,
    functionName: "vote",
    args: ["", ""],
    onError(error) {
      console.log(error);
    },
  });

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div>
      <p>Proposal Number:</p>
      <p>Amount:</p>
      <button disabled={isLoading} onClick={() => write?.()}>
        Vote
      </button>
      {isLoading && <p>Voting...</p>}
      {isSuccess && (
        <div>
          <p>Successfully voted</p>
          <p>{`Transaction Hash: ${data?.hash}`}</p>
        </div>
      )}
    </div>
  );
}

function GetWinner() {
  const { data, isError, isLoading } = useContractRead({
    address: TOKENIZED_BALLOT_ADDRESS,
    abi: TokenizedBallotAbi,
    functionName: "winnerName",
    onError(error) {
      console.log(error);
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching winner</p>;

  const winnerBytes = data as string;
  const winner = ethers.decodeBytes32String(winnerBytes);

  return (
    <div>
      <p>The winner is {winner}!</p>
    </div>
  );
}
