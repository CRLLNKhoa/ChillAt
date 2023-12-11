"use client";
import { getUpdated } from "@/actions/account";
import { useUser } from "@/lib/store/user";
import { createBrowserClient } from "@supabase/ssr";
import React, { useEffect } from "react";

export default function SessionProvider() {

    const setUser = useUser((state) => state.setUser)
    const setUpdated = useUser((state) => state.setUpdated)
    const setTasks = useUser((state) => state.setTasks)
    const setFavorite = useUser((state) => state.setFavorite)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const readUserSession = async () => {
    const { data } = await supabase.auth.getSession();
    const check = await getUpdated(data?.session?.user?.id)
    setUser(data?.session?.user)
    setFavorite(check[0]?.favorites)
    setTasks(check[0]?.tasks)
    if(check.length === 0){
      setUpdated(false)
    }
  };

  useEffect(() => {
    readUserSession();
    // eslint-disabled-next-line
  }, []);

  return <></>;
}
