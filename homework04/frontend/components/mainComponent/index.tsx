import styles from "./mainComponent.module.css";
import PageBody from "../PageBody";
import { useAccount, useNetwork, useSignMessage, useBalance, useContractRead } from "wagmi";
// import { tokenBalanceAbi, tokenNameAbi } from "../../abis/tokenAbi";

export default function MainComponent() {
  const { address, isConnecting, isDisconnected } = useAccount();
  if (address) 
    return (
      <div className={styles.container}>
        <header className={styles.header_container}>
          <div className={styles.header}>
            <h1>
              Group <span>1 Tokenized dApp</span>
            </h1>
          </div>
        </header>
        <div className={styles.get_started}>
          <PageBody address={address}></PageBody>
        </div>
      </div>
    );
}

