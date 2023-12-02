"use server";
import createSupabaseServerClient from "@/lib/supabase/server";

export async function updatedUser(uuid) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from("users").insert([{"id": uuid}])
    if (error) {
      return {status: false};
    } else return {status: true};
  }
  
  export async function getUpdated(uuid) {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from("users").select("id").eq("id", uuid)
    if (error) {
      return { status: "Error!", data: error };
    } else return data ;
  }