import styles from "./mainComponent.module.css";
import PageBody from "../PageBody";
import { useAccount, useNetwork, useBalance, useContractRead } from "wagmi";
// import { tokenBalanceAbi, tokenNameAbi } from "../../abis/tokenAbi";

export default function MainComponent() {
  const { address, isConnecting, isDisconnected } = useAccount();
  return (
    <div className={styles.container}>
      <header className={styles.header_container}>
        <div className={styles.header}>
          <h1>
            Group <span>1 Tokenized Ballot</span> dApp
          </h1>
        </div>
      </header>
      {
        address 
          ?
            <div className={styles.get_started}>
              <PageBody address={address}></PageBody>
            </div>
          :
          <div className={styles.container}>
            <h2>
              Please connect your wallet
            </h2>
          </div>
      }
    </div>
  );
}

