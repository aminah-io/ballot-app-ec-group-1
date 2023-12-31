import RequestVotingTokens from "./RequestVotingTokens";
import { Narrow, Abi } from "viem";

import Vote from "./Vote";
import TokenBalance from "./TokenBalance";
import TokenName from "./TokenName";
import DelegateVote from "./DelegateVote";
import VotingPower from "./VotingPower";
import GetWinner from "./GetWinner";


interface PageBodyProps {
  address: `0x${string}` | undefined;
  tokenizedBallotAddress: `0x${string}` | undefined;
  myToken: `0x${string}` | undefined;
  abi: Narrow<readonly unknown[] | Abi> | undefined;
}

export default function PageBody({
  address,
  tokenizedBallotAddress,
  abi,
  myToken,
}: PageBodyProps) {
  return (
    <div>
      <RequestVotingTokens
        address={address}
      />
      <hr />
      <TokenBalance
        address={address}
        tokenizedBallotAddress={tokenizedBallotAddress}
        abi={abi}
        myToken={myToken}
      />
      <hr />
      <TokenName
        tokenizedBallotAddress={tokenizedBallotAddress}
        abi={abi}
      />
      <hr />
      <VotingPower
        address={address}
        tokenizedBallotAddress={tokenizedBallotAddress}
        abi={abi}
        myToken={myToken}
      />
      <hr />
      <DelegateVote
        myToken={myToken}
        abi={abi}
      />
      <hr />
      <Vote
        tokenizedBallotAddress={tokenizedBallotAddress}
        abi={abi}
      />
      <hr />
      <GetWinner
        tokenizedBallotAddress={tokenizedBallotAddress}
        abi={abi}
      />
    </div>
  );
}
