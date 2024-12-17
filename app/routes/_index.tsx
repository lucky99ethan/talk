import Navbar from "~/components/Navbar";
import Browse from "~/components/Browse";
import Upcomming from "~/components/Upcomming";
import Release from "~/components/Release";
import Series from "~/components/Series"
import Footer from "~/components/Footer";
import { getSupabaseWithSessionAndHeaders } from "~/components/utils/supabase.server";
import { json, redirect } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";


export default function Index() {

  return (
    <div className="text-white min-h-screen">
      <Navbar />
      <Browse />
      <Upcomming/>
      <Release />
      <Series />
      <Footer/>
    </div>
  );
}