"use client";
import { createBrowserClient } from "@supabase/ssr";
import React from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/loginForm";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

export default function Loginform() {
  const pathname = usePathname();

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
      },
    });
  };
  // NOTE
  const handleLoginGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: location.origin + "/auth/callback?next=" + pathname,
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="h-6 rounded-[2px] text-[12px]"
          variant="secondary"
          id="loginbtn"
        >
          🚪 Đăng nhập
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Đăng nhập</DialogTitle>
          <DialogDescription>
            Đăng nhập để lưu lại không gian yêu thích.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 items-center">
          <Button onClick={handleLoginGithub} className="flex gap-2 rounded-sm bg-black hover:bg-slate-900">
            <FaGithub className="w-6 h-6" />
            <p>Đăng nhập bằng Github</p>
          </Button>

          <Button onClick={handleLoginGoogle} className="flex gap-2 rounded-sm bg-white text-black hover:bg-slate-100">
            <FcGoogle className="w-6 h-6" />
            <p>Đăng nhập bằng Google</p>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
