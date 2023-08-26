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
    <div>
      Address:{" "}
      <input type="text" onChange={(e) => setAddress(e.target.value)}></input>
      <button disabled={isLoading} onClick={() => write?.()}>
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