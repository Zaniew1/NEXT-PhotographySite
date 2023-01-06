import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UiContextProvider } from "../Store/UI-context";
import { AuthContext, AuthContextProvider } from "../Store/Auth-context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <UiContextProvider>
        <Component {...pageProps} />
      </UiContextProvider>
    </AuthContextProvider>

  );
}
