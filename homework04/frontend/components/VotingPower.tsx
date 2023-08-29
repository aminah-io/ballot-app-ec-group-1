import { useContractRead } from "wagmi";

import { Narrow, Abi } from "viem";

interface VotingPowerProps {
  address: `0x${string}` | undefined;
  tokenizedBallotAddress: `0x${string}` | undefined;
  abi: Narrow<readonly unknown[] | Abi> | undefined;
}

export default function VotingPower({
  address,
  tokenizedBallotAddress,
  abi,
}: VotingPowerProps) {
  const { data, isError, isLoading } = useContractRead({
    address: tokenizedBallotAddress,
    abi: abi,
    functionName: "votingPower",
    args: [address],
  });

  if (isLoading) return <p className="text-center m-10">Loading...</p>;
  if (isError)
    return <p className="text-center m-10">Error fetching voting power</p>;

  let votingPower;

  if (votingPower != null) {
  votingPower = (data as BigInt).toString();
  }

  return (
    <div className="m-10">
      <h3 className="text-center font-semibold mb-2">
        What's My Voting Power?
      </h3>
      <p className="text-center">Voting Power: {votingPower}</p>
    </div>
  );
}
