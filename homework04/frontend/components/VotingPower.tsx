import { useContractRead } from "wagmi";
import { Narrow, Abi } from "viem";
import { MyTokenAbi } from "../assets/MyTokenAbi";
import { TokenizedBallotAbi } from "../assets/TokenizedBallotAbi";
import * as dotenv from "dotenv";

dotenv.config({ path: "./../../../.env" });

const TOKEN_CONTRACT_ADDRESS = process.env.TOKEN_CONTRACT_ADDRESS as `0x${string}` ?? "";

interface VotingPowerProps {
  address: `0x${string}` | undefined;
  tokenizedBallotAddress: `0x${string}` | undefined;
  abi: Narrow<readonly unknown[] | Abi> | undefined;
  myToken: `0x${string}` | undefined;
}

export default function VotingPower({
  address,
  tokenizedBallotAddress,
  abi,
  myToken,
}: VotingPowerProps) {
  const { data, isError, isLoading } = useContractRead({
    address: TOKEN_CONTRACT_ADDRESS,
    abi: MyTokenAbi,
    functionName: "getVotes",
    args: [address],
    onError(error) {
      console.log("🛑 VOTING POWER ERROR: ", error);
    },
  });

  if (isLoading) return <p className="text-center m-2">Loading...</p>;
  if (isError)
    return <p className="text-center m-10">Error fetching voting power</p>;

  const votingPower = (data as BigInt).toString();

  return (
    <div className="m-2">
      <h3 className="text-center font-semibold mb-2">
        What's My Voting Power?
      </h3>
      <p className="text-center">Voting Power: {votingPower}</p>
    </div>
  );
}
