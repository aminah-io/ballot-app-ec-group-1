import RequestVotingTokens from "./RequestVotingTokens";

export default function PageBody(params: { address: `0x${string}` | undefined }) {
  return (
    <div>
      <RequestVotingTokens address={params.address}></RequestVotingTokens>
    </div>
  );
}