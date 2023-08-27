import { useContractRead } from "wagmi";
import { ethers } from "ethers";

import { Narrow, Abi } from "viem";

interface GetWinnerProps {
  tokenizedBallotAddress: `0x${string}` | undefined;
  abi: Narrow<readonly unknown[] | Abi> | undefined;
}

export default function GetWinner({ tokenizedBallotAddress, abi }: GetWinnerProps) {
  const { data, isError, isLoading } = useContractRead({
    address: tokenizedBallotAddress,
    abi: abi,
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
      <p className="text-3xl text-center m-10">The winner is <span className="text-orange-600">{winner}</span>!</p>
    </div>
  );
}