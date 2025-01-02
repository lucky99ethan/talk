import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import styles from "./tailwind.css";
import { getSupabaseEnv, getSupabaseWithSessionAndHeaders } from "./components/utils/supabase.server";
import { useSupabase } from "./components/utils/supabaseClient";
import Layout from "./components/layout";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles }
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const { serverSession, headers, supabase } = await getSupabaseWithSessionAndHeaders({ request });
    const domainUrl = process.env.DOMAIN_URL;
    const env = getSupabaseEnv();

    if (!serverSession) {
      console.error("Error fetching session");
      return redirect("/login");
    }

    return json({ serverSession, env, domainUrl }, { headers });
  } catch (error) {
    console.error("Loader error:", error);
    return json({ error: "Failed to load data" }, { status: 500 });
  }
};

export default function App() {
  const { env, serverSession, domainUrl } = useLoaderData<typeof loader>();
  const { supabase } = useSupabase({ env, serverSession });

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <Outlet context={{ supabase, domainUrl }} />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </Layout>
      </body>
    </html>
  );
}