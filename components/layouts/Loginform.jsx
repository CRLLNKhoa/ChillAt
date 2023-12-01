"use client";
import { createBrowserClient } from "@supabase/ssr";
import React from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

export default function Loginform() {

    const pathname = usePathname()
    console.log(pathname)

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

    // NOTE Login github
    const handleLoginGithub = () => {
        supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: location.origin + "/auth/callback?next=" + pathname,
            }
        })
    }

  return (
    <Button
      className="h-6 rounded-[2px] text-[12px]"
      variant="secondary"
      onClick={handleLoginGithub}
    >
      🚪 Sign in
    </Button>
  );
}
