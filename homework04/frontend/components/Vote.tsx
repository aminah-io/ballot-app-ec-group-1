import { useState } from "react";
import { Narrow, Abi } from "viem";
import {
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import * as dotenv from "dotenv";

dotenv.config({ path: "./../../../.env" });

const TOKENIZED_BALLOT_ADDRESS = process.env.TOKENIZED_BALLOT_ADDRESS as `0x${string}` ?? "";

import { TokenizedBallotAbi } from "../assets/TokenizedBallotAbi";

interface VoteProps {
  tokenizedBallotAddress: `0x${string}` | undefined;
  abi: Narrow<readonly unknown[] | Abi> | undefined;
}

export default function Vote({ tokenizedBallotAddress, abi }: VoteProps) {
  const [responseData, setResponseData] = useState<any>(null);
  const [voteProposal, setVoteProposal] = useState<string>("0");
  const [voteAmount, setVoteAmount] = useState<string>("0.1");

  const { config } = usePrepareContractWrite({
    address: TOKENIZED_BALLOT_ADDRESS,
    abi: TokenizedBallotAbi,
    functionName: "vote",
    args: [parseInt(voteProposal), ethers.parseUnits(voteAmount)],
    onError(error) {
      console.log("🛑 VOTE ERROR: ", error);
    },
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  return (
    <div className="m-10 flex flex-col">
      <h3 className="text-center font-semibold mb-2">Proposals:</h3>
      <form>
        <label>Choose the proposal you want to vote for:</label>
        <div className="flex flex-col">
          <select
            className="border-gray-500 border bg-gray-200 p-2 rounded-md"
            name="voteProposal"
            onChange={(e) => setVoteProposal(e.target.value)}
          >
            <option value="0">Football</option>
            <option value="1">Basketball</option>
            <option value="2">Tennis</option>
          </select>
        </div>
        <div>
        <label>How much voting power do you want to allocate to your chosen proposal?:</label>
        <input
            className="mt-2 border-gray-400 border p-2 rounded-md"
            type="number"
            min={0.1}
            max={1.0}
            step={0.1}
            placeholder="0.5"
            value={voteAmount}
            onChange={(e) => setVoteAmount(e.target.value)}
          />
        </div>
      </form>
      <button
        disabled={!write}
        className="mt-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-normal text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => write?.()}
      >
        Vote Now
      </button>
      {isLoading && <div>Check Wallet</div>}
      {isSuccess && <div className="mt-3">Transaction: <a className="text-sm hover:underline" href={`https://sepolia.etherscan.io/address/${data?.hash}`}>{data?.hash}</a></div>}
    </div>
  );
}
