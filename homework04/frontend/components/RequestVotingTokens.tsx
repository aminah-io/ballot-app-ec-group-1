import { useState } from "react";

export default function RequestVotingTokens(params: {address: `0x${string}` | undefined}) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({address: params.address}),
  }
  
  const handleRequestVotingTokens = () => {
    fetch(`http://localhost:3001/mint-tokens`, options)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
  }

  if (isLoading) return <div>Requesting tokens from API...</div>;
  if (!data) return (
    <button
      className="rounded-full bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={handleRequestVotingTokens}>
        Mint Tokens
    </button>
  );
  
  return (
    <div>
      <p>Mint success: {data.success ? "worked" : "failed"}</p>
      <p>Transaction hash: {data.transactionHash}</p>
    </div>
  );
}
