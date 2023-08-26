import { useState } from "react";
import { useContractWrite, useWaitForTransaction, usePrepareContractWrite } from "wagmi";
import { Narrow, Abi } from "viem";

interface DelegateVoteProps {
  tokenizedBallotAddress: `0x${string}` | undefined;
  abi: Narrow<readonly unknown[] | Abi> | undefined;
}

export default function DelegateVote({ tokenizedBallotAddress, abi }: DelegateVoteProps) {
  const [address, setAddress] = useState<string>("");

  const { config } = usePrepareContractWrite({
    address: tokenizedBallotAddress,
    abi: abi,
    functionName: "delegate",
    args: [address],
  });

  const { data, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div className="m-6 flex flex-col">
      <form>
        <h3 className="text-center font-semibold mb-2">Enter the address you want to delegate your votes to:</h3>
        <input
          className="border-gray-400 p-2 border w-full rounded-md"
          value={address}
          placeholder="Enter address here"
          type="text"
          onChange={(e) => setAddress(e.target.value)}
        />
      </form>
      <button
        className="mt-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-normal text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        disabled={isLoading ?? address.length < 7}
        onClick={() => write?.()}>
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