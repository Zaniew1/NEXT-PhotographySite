import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UiContextProvider } from "../Store/UI-context";
import { AuthContextProvider} from "../Store/Auth-context";
import { DataContextProvider } from "../Store/Data-context";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <DataContextProvider>
      <UiContextProvider>
        <Component {...pageProps} />
      </UiContextProvider>
      </DataContextProvider>
    </AuthContextProvider>

  );
}
