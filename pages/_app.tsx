import "../styles/globals.css";
import type { AppProps } from "next/app";
import AlgoContext from "../components/utils/AlgoContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AlgoContext>
      <Component {...pageProps} />
    </AlgoContext>
  );
}

export default MyApp;
