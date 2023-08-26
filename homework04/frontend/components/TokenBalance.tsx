import { useContractRead } from "wagmi";

import { Narrow, Abi } from "viem";

interface TokenBalanceProps {
  address: `0x${string}` | undefined;
  tokenizedBallotAddress: `0x${string}` | undefined;
  abi: Narrow<readonly unknown[] | Abi> | undefined;
}

export default function TokenBalance({ address, tokenizedBallotAddress, abi }: TokenBalanceProps) {
  const { data, isError, isLoading } = useContractRead({
    address: tokenizedBallotAddress,
    abi: abi,
    functionName: "balanceOf",
    args: [address],
  });

  if (isLoading) return <div className="m-10">Fetching balance…</div>;
  if (!data) return <p className="m-10">No balance profile data</p>;

  const balance = (data as BigInt).toString();

  if (isError) return <div>Error fetching balance</div>;
  return <div className="m-10">Balance: {balance}</div>;
}