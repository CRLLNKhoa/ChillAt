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
import { useToast } from "@/components/ui/use-toast";
import FavoriteComponent from "@/app/play/components/FavoriteComponent";

export default function TopNav() {
  const { muted, setMuted, setVolume, afk, showMyFavorite, setShowMyFavorite } =
    useContext(PlayContext);
  const [isFull, setIsFull] = useState(false);
  const user = useUser((state) => state.user);
  const updated = useUser((state) => state.updated);
  const setUser = useUser((state) => state.setUser);
  const setTasks = useUser((state) => state.setTasks);
  const setFavorite = useUser((state) => state.setFavorite);
  const setUpdated = useUser((state) => state.setUpdated);
  const { toast } = useToast();

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
    await supabase.auth.signOut();
    setUser(undefined);
    setFavorite([]);
    setTasks([])
  };

  const handleConfirm = async () => {
    const result = await updatedUser(user?.id);
    if (result?.status) {
      setUpdated(true);
      toast({
        title: "Xác nhận thành công!",
        description: "Tài khoản của bạn đã được kích hoạt!",
      });
      location.reload()
    } else
      toast({
        title: "Lỗi!",
        description: "Tài khoản của bạn chưa được kích hoạt!",
      });
  };

  return (
    <nav
      className={cn(
        "w-full h-[40px] fixed z-[1000] transition-all border-b bg-white flex items-center py-1 justify-between",
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
        {user && (
          <p className="text-sm font-mono select-none">
            🌟 Chào mừng bạn! {user?.user_metadata?.full_name} 🎉
          </p>
        )}
        {updated === false && (
            <div className="fixed top-0 bottom-0 left-0 right-0 z-[9999]">
            <div className="absolute w-full h-full bg-black opacity-20 blur-lg"></div>
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px]
             h-[300px] flex justify-center items-center flex-col bg-white rounded-sm p-4 gap-2 z-10"
            >
              <img
                src="/gift.png"
                alt="logo"
                className="w-[200px]"
              />
              <h1 className="font-bold">Lần đầu tiên bạn đăng nhập!</h1>
              <p className="text-center text-sm">
                Nhấn vào đây để kích hoạt tài khoản!
              </p>
              <span onClick={handleConfirm}
                className="bg-gradient-to-r from-red-500 to-rose-400 py-2 px-4 rounded-full cursor-pointer 
              text-sm font-bold text-white"
              >
                Nhận Ngay
              </span>
            </div>
          </div>
        )}
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
              <DropdownMenuItem
                onClick={() => setShowMyFavorite(true)}
                className="cursor-pointer flex justify-center items-center gap-2"
              >
                <MdFavoriteBorder />
                My Favorite
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="cursor-pointer flex justify-center items-center gap-2"
              >
                <BiLogOutCircle />
                <p className="text-end">Log out</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      {showMyFavorite && <FavoriteComponent />}
    </nav>
  );
}
