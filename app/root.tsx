import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  LiveReload,
} from "@remix-run/react";

import "./tailwind.css";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { getSupabaseEnv, getSupabaseWithSessionAndHeaders } from "./components/utils/supabase.server";
import { useSupabase } from "./components/utils/supabaseClient";
import Layout from "./components/layout";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

type LoaderData = 
  | { serverSession: any; env: { SUPABASE_URL: string; SUPABASE_ANON_KEY: string }; domainUrl: string | undefined }
  | { error: string };

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const { serverSession, headers, supabase } = await getSupabaseWithSessionAndHeaders({ request });
    const domainUrl = process.env.DOMAIN_URL;
    const env = getSupabaseEnv();

    const url = new URL(request.url);
    if (!serverSession && url.pathname !== "/login" && url.pathname !== "/signUp") {
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
  const data = useLoaderData<LoaderData>();

  if ('error' in data) {
    return <div>Error: {data.error}</div>;
  }

  const { env, serverSession, domainUrl } = data;
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
      <Outlet context={{ supabase, domainUrl }} />
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  </html>
  );
}