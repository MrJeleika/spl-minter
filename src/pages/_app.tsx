"use client";
import { Layout } from "@/components/Layout";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Suspense } from "react";
import { WalletProvider } from "@/Provider/WalletProvider";
import StyledComponentsRegistry from "@/Provider/StyledComponents";
import "./globals.css";
import { ThemeProvider } from "styled-components";
import { dark, light } from "@/theme/theme";
import { wrapper } from "@/redux/app/store";
import { Provider } from "react-redux";
import { useThemeDetector } from "@/hooks/useThemeDetector";

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { emotionCache, pageProps } = props;

  const theme = useThemeDetector();
  const router = useRouter();

  if (router.pathname === "/_error") return <Component {...pageProps} />;

  return (
    <Provider store={store}>
      <Suspense fallback="loading...">
        <WalletProvider>
          <StyledComponentsRegistry>
            <ThemeProvider theme={theme ? dark : light}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </StyledComponentsRegistry>
        </WalletProvider>
      </Suspense>
    </Provider>
  );
}

export default wrapper.withRedux(App);
