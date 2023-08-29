import { useContractRead } from "wagmi";

import { Narrow, Abi } from "viem";

import { MyTokenAbi } from "../assets/MyTokenAbi";
const TOKEN_CONTRACT_ADDRESS = "0x83555B198FB77d64B296d5963203B4a160C241bc";

interface TokenNameProps {
  tokenizedBallotAddress: `0x${string}` | undefined;
  abi: Narrow<readonly unknown[] | Abi> | undefined;
}

export default function TokenName({
  tokenizedBallotAddress,
  abi,
}: TokenNameProps) {
  const { data, isError, isLoading } = useContractRead({
    address: TOKEN_CONTRACT_ADDRESS,
    abi: MyTokenAbi,
    functionName: "name",
  });

  const name = typeof data === "string" ? data : 0;

  if (isLoading) return <div className="text-center m-10">Fetching name…</div>;
  if (isError)
    return (
      <div className="text-center m-10">
        <h3 className="text-center font-semibold mb-2">Token Name:</h3>
        <p className="text-red-700">Error fetching name</p>
      </div>
    );
  return (
    <div>
      <p className="text-center mt-10">Token name: {name}</p>
    </div>
  );
}
