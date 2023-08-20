import styles from "./mainComponent.module.css";
import RequestVotingTokens from "../RequestVotingTokens";
import CastVotes from "../CastVotes";
import DelegateVotes from "../DelegateVote";
import QueryResults from "../QueryResults";

export default function MainComponent() {
  return (
    <div className={styles.container}>
      <header className={styles.header_container}>
        <div className={styles.header}>
          <h1>
            Group <span>1 Tokenized dApp</span>
          </h1>
        </div>
      </header>
    </div>
  );
}

