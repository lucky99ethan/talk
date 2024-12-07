import Navbar from "~/components/Navbar";
import Browse from "~/components/Browse";
import ContinueWatching from "~/components/ContinueWatching";
import Popular from "~/components/Popular";



export default function Index() {
  return (
    <div className="bg-black text-white min-h-screen ">
      <Navbar />
      <Browse />
      <ContinueWatching />
      <Popular />
    </div>
  );
}