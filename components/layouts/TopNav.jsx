"use client";
import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { FiSidebar } from "react-icons/fi";
import {
  MdVolumeUp,
  MdVolumeOff,
  MdOutlineFullscreen,
  MdOutlineFullscreenExit,
  MdFavoriteBorder,
} from "react-icons/md";
import { RiShareForward2Fill } from "react-icons/ri";
import { PiUserGearFill } from "react-icons/pi";
import { PlayContext } from "@/app/play/providers/PlayProvider";
import screenfull from "screenfull";
import { cn } from "@/lib/utils";
import { FacebookShareButton, FacebookIcon } from "next-share";
import Loginform from "./Loginform";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/lib/store/user";
import { BiLogOutCircle } from "react-icons/bi";
import { createBrowserClient } from "@supabase/ssr";
import { updatedUser } from "@/actions/account";
import { useToast } from "@/components/ui/use-toast"

export default function TopNav() {
  const { muted, setMuted, setVolume, afk } = useContext(PlayContext);
  const [isFull, setIsFull] = useState(false);
  const user = useUser((state) => state.user);
  const updated = useUser((state) => state.updated);
  const setUser = useUser((state) => state.setUser);
  const setUpdated = useUser((state) => state.setUpdated)
  const { toast } = useToast()

  const handleClickFullscreen = () => {
    screenfull.request();
    setIsFull(true);
  };
  const handleClickExitFullscreen = () => {
    screenfull.exit();
    setIsFull(false);
  };

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(undefined)
  };

  const handleConfirm = async () => {
     const result =  await updatedUser(user?.id)
     if(result?.status){
      setUpdated(true)
      toast({
        title: "Xác nhận thành công!",
        description: "Tài khoản của bạn đã được kích hoạt!",
      })
     }else  toast({
      title: "Lỗi!",
      description: "Tài khoản của bạn chưa được kích hoạt!",
    })
  }

  return (
    <nav
      className={cn(
        "w-full h-[40px] fixed z-50 transition-all bg-white flex items-center py-1 justify-between",
        afk && "-top-[60px]"
      )}
    >
      <div className="flex items-center gap-2">
        <div className="w-[70px] flex items-center justify-center">
          <Button
            className="w-8 h-8"
            variant="ghost"
            size="icon"
          >
            <FiSidebar className="w-5 h-5 text-muted-foreground" />
          </Button>
        </div>
        {!user && <Loginform />}
        {user && <p className="text-sm font-mono select-none">🌟 Chào mừng bạn! {user?.user_metadata?.full_name} 🎉</p>}
        {updated === false && <span onClick={handleConfirm} className="text-sm text-red-500 cursor-pointer font-mono select-none">Xác nhận tài khoản tại đây!</span>}
      </div>
      <div className="flex gap-2">
        {!muted ? (
          <Button
            className="w-8 h-8"
            variant="ghost"
            size="icon"
            onClick={() => setMuted(true)}
          >
            <MdVolumeOff className="w-5 h-5" />
          </Button>
        ) : (
          <Button
            className="w-8 h-8"
            variant="ghost"
            size="icon"
            onClick={() => {
              setMuted(false);
              setVolume([0.5]);
            }}
          >
            <MdVolumeUp className="w-5 h-5" />
          </Button>
        )}

        <FacebookShareButton
          url={"https://chill-at.vercel.app"}
          quote={
            "Website nghe nhạc lofi hình nền động và 1 số các công cụ hỗ trợ."
          }
          hashtag={"#luongkhoa"}
        >
          <Button
            className="w-8 h-8"
            variant="ghost"
            size="icon"
          >
            <RiShareForward2Fill className="w-5 h-5" />
          </Button>
        </FacebookShareButton>

        {isFull ? (
          <Button
            className="w-8 h-8"
            variant="ghost"
            size="icon"
            onClick={handleClickExitFullscreen}
          >
            <MdOutlineFullscreenExit className="w-5 h-5" />
          </Button>
        ) : (
          <Button
            className="w-8 h-8"
            variant="ghost"
            size="icon"
            onClick={handleClickFullscreen}
          >
            <MdOutlineFullscreen className="w-5 h-5" />
          </Button>
        )}

        {!user?.id && (
          <div className="border-l-2 pl-2">
            <Button
              className="w-8 h-8"
              variant="ghost"
              size="icon"
            >
              <PiUserGearFill className="w-5 h-5" />
            </Button>
          </div>
        )}
        {user?.id && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="border-l-2 pl-2">
                <Button
                  className="w-8 h-8"
                  variant="ghost"
                  size="icon"
                >
                  {/* <PiUserGearFill className="w-5 h-5" /> */}
                  <img
                    className="w-5 h-5 rounded-full"
                    src={user.user_metadata.avatar_url}
                    alt="logo"
                  />
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem className="cursor-pointer flex justify-center items-center gap-2">
              <MdFavoriteBorder />
                My Favorite
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} className="cursor-pointer flex justify-center items-center gap-2">
                <BiLogOutCircle />
                <p className="text-end">Log out</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
}
