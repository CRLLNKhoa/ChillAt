"use client";
import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { FiSidebar } from "react-icons/fi";
import {
  MdVolumeUp,
  MdVolumeOff,
  MdOutlineFullscreen,
  MdOutlineFullscreenExit,
} from "react-icons/md";
import { RiShareForward2Fill } from "react-icons/ri";
import { PiUserGearFill } from "react-icons/pi";
import { PlayContext } from "@/app/play/providers/PlayProvider";
import screenfull from "screenfull";
import { cn } from "@/lib/utils";
import { FacebookShareButton, FacebookIcon } from "next-share";

export default function TopNav() {
  const { muted, setMuted, setVolume, afk } = useContext(PlayContext);
  const [isFull, setIsFull] = useState(false);

  const handleClickFullscreen = () => {
    screenfull.request();
    setIsFull(true);
  };
  const handleClickExitFullscreen = () => {
    screenfull.exit();
    setIsFull(false);
  };

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
        <Button
          className="h-6 rounded-[2px] text-[12px]"
          variant="secondary"
        >
          🚀 Sign Up
        </Button>
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
          url={"https://lofi-with-carol.vercel.app"}
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
        <div className="border-l-2 pl-2">
          <Button
            className="w-8 h-8"
            variant="ghost"
            size="icon"
          >
            <PiUserGearFill className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
}
