import "../styles/globals.css";
import { RobinhoodProvider } from "../context/RobinhoodContext";

function MyApp({ Component, pageProps }) {
  return (
    <RobinhoodProvider>
      <Component {...pageProps} />
    </RobinhoodProvider>
  );
}

export default MyApp;
