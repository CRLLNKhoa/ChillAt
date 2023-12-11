"use server";
import createSupabaseServerClient from "@/lib/supabase/server";

export async function updatedUser(uuid,full_name,avatar) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.from("users").insert([{"id": uuid,"full_name": full_name,"avatar": avatar}])
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
  

  export async function getUsers() {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from("users").select("*")
    if (error) {
      return { status: "Error!", data: error };
    } else return data ;
  }

  export async function updateTime(uuid) {
    const supabase = await createSupabaseServerClient();
    const {data} = await supabase.from("users").select("time_online").eq("id",uuid)
    const { error } = await supabase.from("users").update({"time_online": data[0].time_online + 5}).eq("id",uuid)
    if (error) {
      return {status: false};
    } else return {status: true};
  }

  export async function updateCoins(uuid,num) {
    const supabase = await createSupabaseServerClient();
    const {data} = await supabase.from("users").select("coin").eq("id",uuid)
    const { error } = await supabase.from("users").update({"coin": data[0].coin + num}).eq("id",uuid)
    if (error) {
      return {status: false};
    } else return {status: true};
  }