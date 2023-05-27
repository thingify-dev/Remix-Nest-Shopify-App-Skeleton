import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Provider, Loading } from "@shopify/app-bridge-react";
import { useSearchParams, useLoaderData } from "@remix-run/react";
import { AppProvider } from "@shopify/polaris";
import type { LinksFunction } from "@remix-run/node"; // or cloudflare/deno
import shopifyStyles from "@shopify/polaris/build/esm/styles.css";
import enTranslations from "@shopify/polaris/locales/en.json";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: shopifyStyles,
    },
  ];
};

export async function loader() {
  return {
    apiKey: process.env.SHOPIFY_API_KEY,
  };
}

export default function App() {
  const [searchParams] = useSearchParams();
  const envVars = useLoaderData<typeof loader>();

  const config = {
    apiKey: envVars.apiKey,
    host: searchParams.get("host"),
    forceRedirect: true,
  };

  const cspHeader = `frame-ancestors https://${searchParams.get("host")} https://admin.shopify.com`;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
        />
        <meta
          httpEquiv="Content-Security-Policy"
          content={cspHeader}
        />
        <Meta />
        <Links />
      </head>
      <body>
        <AppProvider i18n={enTranslations}>
          <Provider config={config}>
            <Loading />
            <Outlet />
          </Provider>
        </AppProvider>
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
