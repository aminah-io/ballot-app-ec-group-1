import { useContractRead } from "wagmi";

import { Narrow, Abi } from "viem";

interface TokenNameProps {
  tokenizedBallotAddress: `0x${string}` | undefined;
  abi: Narrow<readonly unknown[] | Abi> | undefined;
}

export default function TokenName({ tokenizedBallotAddress, abi }: TokenNameProps) {
  const { data, isError, isLoading } = useContractRead({
    address: tokenizedBallotAddress,
    abi: abi,
    functionName: "name",
  });

  const name = typeof data === "string" ? data : 0;

  if (isLoading) return <div className="text-center m-10">Fetching name…</div>;
  if (isError) return (
    <div className="text-center m-10">
      <h3 className="text-center font-semibold mb-2">Token Name:</h3>
      <div>Error fetching name</div>
    </div>
  );
  return (
    <div>
      <p className="text-center mt-10">Token name: {name}</p>
    </div>
  );
}