// import { useState } from "react";

// export default function RequestVotingTokens(params: {
//   address: `0x${string}` | undefined;
// }) {
//   const [data, setData] = useState<any>(null);
//   const [isLoading, setLoading] = useState(false);
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ address: params.address }),
//   };

//   const handleRequestVotingTokens = () => {
//     setLoading(true);
//     fetch(`http://localhost:3001/mint-tokens`, options)
//       .then((res) => res.json())
//       .then((data) => {
//         setData(data);
//         setLoading(false);
//       });
//   };

//   if (isLoading) return <div>Requesting tokens from API...</div>;

//   if (!data)
//     return (
//       <button
//         className="rounded-full bg-indigo-600 px-2.5 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//         onClick={handleRequestVotingTokens}
//       >
//         Mint Tokens
//       </button>
//     );

//   return (
//     <div>
//       <p>Mint success: {data.result ? "worked" : "failed"}</p>
//       <p>Transaction hash: {data.txHash}</p>
//     </div>
//   );
// }


import { useState } from "react";

export default function RequestVotingTokens(params: {address: `0x${string}` | undefined}) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);
  const [voteAmount, setVoteAmount] = useState("");
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      address: params.address,
      amount: voteAmount,
    }),
  }
  
  const handleRequestVotingTokens = () => {
    fetch(`http://localhost:3001/request-voting-tokens`, options)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
  }

  if (isLoading) return <div>Requesting tokens from API...</div>;
  if (!data) {
    return (
      <div className="flex flex-col justify-center">
        <form className="flex flex-col justify-center mt-3">
          <label>
            Enter amount of voting token you want to request:
          </label>
          <input
            className="mt-2"
            type="number"
            min={0.1}
            max={1.0}
            step={0.1}
            placeholder="1"
            value={voteAmount}
            onChange={(e) => setVoteAmount(e.target.value)}
          />
        </form>
        <button
          className="mt-2 rounded-full bg-indigo-600 px-4 py-2 text-sm font-normal text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleRequestVotingTokens}>
            Request Voting Tokens
        </button>
      </div>
    );
  }
  
  return (
    <div>
      <h3>{data.success ? `You successfully requested ${voteAmount} voting tokens!` : "Something went wrong..."}</h3>
      <p><b>Transaction hash:</b> <a className="underline" href={`https://sepolia.etherscan.io/tx/${data.txHash}`}>{data.txHash}</a></p>
    </div>
  );
}
