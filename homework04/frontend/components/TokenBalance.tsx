import { useContractRead } from "wagmi";

import { Narrow, Abi } from "viem";

import { MyTokenAbi } from "../assets/MyTokenAbi";
const TOKEN_CONTRACT_ADDRESS = "0xeC6f798a7Ad0D224b12C3c3Ef8876842580322C5";

interface TokenBalanceProps {
  address: `0x${string}` | undefined;
  tokenizedBallotAddress: `0x${string}` | undefined;
  myToken: `0x${string}` | undefined;
  abi: Narrow<readonly unknown[] | Abi> | undefined;
}

export default function TokenBalance({
  address,
  tokenizedBallotAddress,
  abi,
  myToken,
}: TokenBalanceProps) {
  const { data, isError, isLoading } = useContractRead({
    address: TOKEN_CONTRACT_ADDRESS,
    abi: MyTokenAbi,
    functionName: "balanceOf",
    args: [address],
  });

  if (isLoading) return <div className="m-2">Fetching balance…</div>;
  if (!data)
    return (
      <div className="text-center m-2">
        <h3 className="text-center font-semibold mb-2">Check Token Balance</h3>
        <p className="text-slate-700">No balance profile data</p>
      </div>
    );

  const balance = (data as BigInt).toString();

  if (isError) return <div>Error fetching balance</div>;
  return (
    <div className="text-center m-2">
      <h3 className="text-center font-semibold mb-2">
        Your token balance is:
      </h3>
      <div>Balance: {balance}</div>
    </div>
  );
}
