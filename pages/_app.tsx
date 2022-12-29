import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UiContextProvider } from "../Store/UI-context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UiContextProvider>
      <Component {...pageProps} />;
    </UiContextProvider>
  );
}
