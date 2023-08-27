import { useState } from "react";

export default function RequestVotingTokens(params: {
  address: `0x${string}` | undefined;
}) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setLoading] = useState(false);
  const [voteAmount, setVoteAmount] = useState("");
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: params.address,
      amount: voteAmount,
    }),
  };

  const handleRequestVotingTokens = () => {
    setLoading(true);
    fetch(`http://localhost:3001/request-voting-tokens`, options)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  };

  if (isLoading) return <div>Requesting tokens from API...</div>;
  if (!data) {
    return (
      <div className="flex flex-col justify-center m-10">
        <h3 className="text-xl font-semibold text-center">Request Voting Tokens</h3>
        <form className="flex flex-col justify-center mt-3">
          <label>Enter amount of voting token you want to request:</label>
          <input
            className="mt-2 border-gray-400 border p-2 rounded-md"
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
          onClick={handleRequestVotingTokens}
        >
          Request Voting Tokens
        </button>
      </div>
    );
  }

  return (
    <div>
      <h3>
        {data.success
          ? `You successfully requested ${voteAmount} voting tokens!`
          : "Something went wrong..."}
      </h3>
      <p>
        <b>Transaction hash:</b>{" "}
        <a
          className="underline flex flex-wrap"
          href={`https://sepolia.etherscan.io/tx/${data.txHash}`}
        >{data.txHash}</a>
      </p>
    </div>
  );
}
