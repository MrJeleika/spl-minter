import { Layout } from "@/components/Layout";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Suspense } from "react";
import { WalletProvider } from "@/Provider/WalletProvider";
import StyledComponentsRegistry from "@/Provider/StyledComponents";
import "./globals.css";
import { wrapper } from "@/redux/app/store";
import { Provider } from "react-redux";
import { Loading } from "@/components/Loading";
import { ThemeChangeProvider } from "@/Provider/ThemeProvider/ThemeProvider";

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { emotionCache, pageProps } = props;

  const router = useRouter();

  if (router.pathname === "/_error") return <Component {...pageProps} />;

  return (
    <Provider store={store}>
      <StyledComponentsRegistry>
        <Suspense fallback={<Loading />}>
          <WalletProvider>
            <ThemeChangeProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ThemeChangeProvider>
          </WalletProvider>
        </Suspense>
      </StyledComponentsRegistry>
    </Provider>
  );
}

export default wrapper.withRedux(App);
