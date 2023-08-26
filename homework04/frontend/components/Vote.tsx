import { useState } from "react";
import { Narrow, Abi } from "viem";
import {
  useContractWrite,
  useWaitForTransaction,
  usePrepareContractWrite,
} from "wagmi";

interface VoteProps {
  tokenizedBallotAddress: `0x${string}` | undefined;
  abi: Narrow<readonly unknown[] | Abi> | undefined;
}

export default function Vote({ tokenizedBallotAddress, abi }: VoteProps) {
  const [responseData, setResponseData] = useState<any>(null);
  const [voteChoice, setVoteChoice] = useState("");

  const { config } = usePrepareContractWrite({
    address: tokenizedBallotAddress,
    abi: abi,
    functionName: "vote",
    args: [voteChoice],
    onError(error) {
      console.log(error);
    },
  });

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div className="mt-10">
      <p className="font-semibold text-xl">Proposals:</p>
      <form>
        <label className="mb-4">Choose the number of the proposal you want to vote for:</label>
        <div className="flex flex-col">
          <select className="mb-4 border-gray-500 border-2 bg-gray-200" name="voteChoice" onChange={(e) => setVoteChoice(e.target.value)}>
            <option value="0">Burgers</option>
            <option value="1">Pizza</option>
            <option value="2">Pasta</option>
          </select>
        </div>
      </form>
      <button
        className="mt-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-normal text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => write?.()}
      >
        Request Voting Tokens
      </button>
    </div>
  );
}
//     <div>
//     <p>Proposal Number: </p>
//       < p > Amount: </>
//         < button disabled = { isLoading } onClick = {() => write?.()
// }>
//   Vote
//   < /button>
// {
//   isLoading && <p>Voting...</p>}
//   {
//     isSuccess && (
//       <div>
//       <p>Successfully voted < /p>
//         < p > {`Transaction Hash: ${data?.hash}`
//   } </p>
//     < /div>
//       )
// }
// </div>
//   );
// }