import Navbar from "~/components/Navbar";
import Browse from "~/components/Browse";
import Upcomming from "~/components/Upcomming";
import Release from "~/components/Release";
import Series from "~/components/Series";
import Footer from "~/components/Footer";
import type { LoaderFunction } from "@remix-run/node";
import { getSupabaseWithSessionAndHeaders } from "~/components/utils/supabase.server";
import { json, redirect } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
    const { supabase, headers } = await getSupabaseWithSessionAndHeaders({ request });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        return redirect('/login', { headers });
    }

    return json({ 
        user: session.user 
    }, { headers });
};

export default function Home() {
  return (
    <div className="text-white min-h-screen bg-black">
      <Navbar />
      <Browse />
      <Upcomming/>
      <Release />
      <Series />
      <Footer/>
    </div>
  );
}