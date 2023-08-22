import styles from "./mainComponent.module.css";
import PageBody from "../PageBody";
import {
  useAccount,
  useNetwork,
  useSignMessage,
  useBalance,
  useContractRead,
} from "wagmi";
// import { tokenBalanceAbi, tokenNameAbi } from "../../abis/tokenAbi";

import * as MyToken from "../../assets/MyToken.json";
import * as TokenizedBallot from "../../assets/TokenizedBallot.json";

const MY_TOKEN_CONTRACT_ADDRESS = "0x83555B198FB77d64B296d5963203B4a160C241bc";
const TOKENIZED_BALLOT_ADDRESS = "0xC572b96f571FB5bfe6438C3981A4E4dF02c7ad43";

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
          <h2>Get Total Supply</h2>
          <GetTotalSupply></GetTotalSupply>
        </div>
      </div>
    );
}

function GetTotalSupply() {
  // const { data, isError, isLoading } = useContractRead({
  //   address: ERC20_CONTRACT_ADDRESS,
  //   abi: MyToken.abi,
  //   functionName: "totalSupply",
  // });

  // if (isLoading) return <p>Loading...</p>;
  // if (isError) return <p>Error fetching total supply</p>;

  // const totalSupply = (data as BigInt).toString();

  const totalSupply = 100000;

  return <p>Total Supply: {totalSupply}</p>;
}
