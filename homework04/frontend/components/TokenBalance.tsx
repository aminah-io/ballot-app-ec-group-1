import { useContractRead } from "wagmi";
import { Narrow, Abi } from "viem";
import * as dotenv from 'dotenv';
import { MyTokenAbi } from "../assets/MyTokenAbi";

dotenv.config( { path: '../../.env'} )
const TOKEN_CONTRACT_ADDRESS = process.env.TOKEN_CONTRACT_ADDRESS as `0x${string}`?? "";

interface TokenBalanceProps {
  address: `0x${string}` | undefined;
  tokenizedBallotAddress: `0x${string}` | undefined;
  abi: Narrow<readonly unknown[] | Abi> | undefined;
}

export default function TokenBalance({
  address,
  tokenizedBallotAddress,
  abi,
}: TokenBalanceProps) {
  const { data, isError, isLoading } = useContractRead({
    address: TOKEN_CONTRACT_ADDRESS,
    abi: MyTokenAbi,
    functionName: "balanceOf",
    args: [address],
  });

  if (isLoading) return <div className="m-10">Fetching balance…</div>;
  if (!data)
    return (
      <div className="text-center m-10">
        <h3 className="text-center font-semibold mb-2">Check Token Balance</h3>
        <p className="text-slate-700">No balance profile data</p>
      </div>
    );

  const balance = (data as BigInt).toString();

  if (isError) return <div>Error fetching balance</div>;
  return (
    <div className="text-center">
      <h3 className="text-center font-semibold mb-2">
        Enter the address you want to delegate your votes to:
      </h3>
      <div>Balance: {balance}</div>;
    </div>
  );
}
