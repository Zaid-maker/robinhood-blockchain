import "../styles/globals.css";
import { RobinhoodProvider } from "../context/RobinhoodContext";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      appId="1gC7R9hXyKV3aaP8Vs1qxrDN1qXbgsh4568q9gSM"
      serverUrl="https://c4lbhpfs7ydm.usemoralis.com:2053/server"
    >
      <RobinhoodProvider>
        <Component {...pageProps} />
      </RobinhoodProvider>
    </MoralisProvider>
  );
}

export default MyApp;
