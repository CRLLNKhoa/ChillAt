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
    const { data, error } = await supabase.from("users").select("*").eq("id", uuid)
    if (error) {
      return { status: "Error!", data: error };
    } else return data ;
  }

  export async function updateFavorite(list,user) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from("users").update([{"favorites": list}]).eq("id",user)
    if (error) {
      return {status: false};
    } else return {status: true};
  }

  export async function updateTasks(list,user) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from("users").update([{"tasks": list}]).eq("id",user)
    if (error) {
      return {status: false};
    } else return {status: true};
  }
  