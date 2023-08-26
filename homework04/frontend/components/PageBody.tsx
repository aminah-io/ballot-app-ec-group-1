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
  abi: Narrow<readonly unknown[] | Abi> | undefined;
}

export default function PageBody({
  address,
  tokenizedBallotAddress,
  abi,
}: PageBodyProps) {
  return (
    <div>
      <RequestVotingTokens
        address={address}
      />
      <TokenBalance
        address={address}
        tokenizedBallotAddress={tokenizedBallotAddress}
        abi={abi}
      />
      <TokenName
        tokenizedBallotAddress={tokenizedBallotAddress}
        abi={abi}
      />
      <VotingPower
        address={address}
        tokenizedBallotAddress={tokenizedBallotAddress}
        abi={abi}
      />
      <DelegateVote
        tokenizedBallotAddress={tokenizedBallotAddress}
        abi={abi}
      />
      <Vote
        tokenizedBallotAddress={tokenizedBallotAddress}
        abi={abi}
      />
      <GetWinner
        tokenizedBallotAddress={tokenizedBallotAddress}
        abi={abi}
      />
    </div>
  );
}
