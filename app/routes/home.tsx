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
  const { serverSession } = await getSupabaseWithSessionAndHeaders({ request });
  
  // Protect this route - redirect to login if not authenticated
  if (!serverSession) {
    return redirect("/login");
  }
  
  return json({});
};

export default function Home() {
  return (
    <div className="text-white min-h-screen bg-black" >
      <Navbar />
      <Browse />
      <Upcomming/>
      <Release />
      <Series />
      <Footer/>
    </div>
  );
}