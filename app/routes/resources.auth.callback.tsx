import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { getSupabaseWithHeaders } from "~/components/utils/supabase.server";

export async function loader({ request}: LoaderFunctionArgs){
    const requestURl = new URL(request.url);
    const code = requestURl.searchParams.get('code');
    const next = requestURl.searchParams.get('next') || "/";
    if(code){
        const { headers, supabase } = getSupabaseWithHeaders({ request });
        const {error} = await supabase.auth.exchangeCodeForSession(code);
        if(!error){
            return redirect(next, { headers })
        }

    }
    return redirect("/login");
}