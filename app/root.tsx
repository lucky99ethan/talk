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
  | { user: any; serverSession: any; env: { SUPABASE_URL: string; SUPABASE_ANON_KEY: string }; domainUrl: string | undefined }
  | { error: string };

export const loader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const { serverSession, headers, supabase } = await getSupabaseWithSessionAndHeaders({ request });
    const domainUrl = process.env.DOMAIN_URL;
    const env = getSupabaseEnv();

    const url = new URL(request.url);
    const isAuthRoute = url.pathname === "/login" || url.pathname === "/signUp";

    // Only redirect if not on auth routes and no valid session exists
    if (!isAuthRoute && !serverSession) {
      return redirect("/login");
    }

    // Redirect to the desired page after successful login
    if (isAuthRoute && serverSession) {
      return redirect("/home");
    }

    const { data: user } =await supabase.auth.getUser();

    // Log the user data to check if it is fetched
    console.log("User data:", user);

    if (!user) {
      return json({ error: "User not authenticated" }, { status: 401 });
    }

    // Fetch additional user profile information
    const { data: profile } = await supabase
      .from('profile')
      .select('name')
      .eq('id', user.id)
      .single();

    // Log the profile data to check if the name is fetched
    console.log("Profile data:", profile);

    return json({ 
      user: { ...user, name: profile?.name }, 
      serverSession, 
      env, 
      domainUrl 
    }, { 
      headers
    });
  } catch (error) {
    console.error("Loader error:", error);
    return json({ error: "Failed to load data" }, { status: 500 });
  }
};

export default function App() {
  const { env, serverSession, domainUrl, user } = useLoaderData<typeof loader>();
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
          <Outlet context={{ supabase, domainUrl, user }} />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </Layout>
      </body>
    </html>
  );
}