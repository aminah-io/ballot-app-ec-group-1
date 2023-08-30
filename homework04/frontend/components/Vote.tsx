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
  const [voteChoice, setVoteChoice] = useState<string>("");

  const [proposal, setProposal] = useState<string>("1");
  const [amount, setAmount] = useState<string>("1");

  const { config } = usePrepareContractWrite({
    address: TOKENIZED_BALLOT_ADDRESS,
    abi: TokenizedBallotAbi,
    functionName: "vote",
    args: ["1", "1"],
    onError(error) {
      console.log(error);
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
            name="voteChoice"
            onChange={(e) => setVoteChoice(e.target.value)}
          >
            <option value="0">Football</option>
            <option value="1">Basketball</option>
            <option value="2">Tennis</option>
          </select>
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
      {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>}
    </div>
  );
}
