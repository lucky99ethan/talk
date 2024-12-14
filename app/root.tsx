import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

import "./tailwind.css";
import { getSupabaseEnv, getSupabaseWithSessionAndHeaders } from "./components/utils/supabase.server";
import { SupabaseProvider, useSupabase } from "./components/utils/supabaseClient";

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

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { supabase, headers, serverSession } = await getSupabaseWithSessionAndHeaders({ request });
  const env = getSupabaseEnv();

  if (!serverSession) {
    console.error("Error fetching session");
    return json({ error: "Failed to fetch session" }, { headers });
  }

  return json({ serverSession, env }, { headers });
};

type LoaderData = {
  serverSession: any;
  env: {
    SUPABASE_URL: string | undefined;
    SUPABASE_ANON_KEY: string | undefined;
  };
} | {
  error: string;
};

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<LoaderData>();

  if ('error' in data) {
    return <div>Error: {data.error}</div>;
  }

  const { env, serverSession } = data;
  const supabase = useSupabase(env, serverSession);

  return (
    <SupabaseProvider value={supabase}>
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    </SupabaseProvider>
  );
}

export default function App() {
  return <Layout><Outlet /></Layout>;
}