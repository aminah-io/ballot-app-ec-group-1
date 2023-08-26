import { useContractRead } from "wagmi";

import { Narrow, Abi } from "viem";

interface VotingPowerProps {
  address: `0x${string}` | undefined;
  tokenizedBallotAddress: `0x${string}` | undefined;
  abi: Narrow<readonly unknown[] | Abi> | undefined;
}

export default function VotingPower({ address, tokenizedBallotAddress, abi }: VotingPowerProps) {
  const { data, isError, isLoading } = useContractRead({
    address: tokenizedBallotAddress,
    abi: abi,
    functionName: "votingPower",
    args: [address],
  });

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (isError) return <p className="text-center">Error fetching voting power</p>;

  const votingPower = (data as BigInt).toString();

  return (
    <div className="mt-10">
      <h3 className="text-center font-semibold">What's My Voting Power?</h3>
      <p className="text-center">Voting Power: {votingPower}</p>
    </div>
  );
}