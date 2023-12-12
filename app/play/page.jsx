"use client";
import { useContext, useEffect, useState } from "react";
import LoadingComponent from "./components/LoadingComponent";
import { PlayContext } from "./providers/PlayProvider";
import ReactPlayer from "react-player/lazy";
import { useUser } from "@/lib/store/user";
import { updateTime } from "@/actions/account";

export default function Page() {
  const { muted, volume, url, playing, setPlaying } = useContext(PlayContext);
  const [isClient, setIsClient] = useState(false);
  const user = useUser((state) => state.user);

  useEffect(() => {
    setIsClient(true);
    setPlaying(false);
  }, []);

  const addTime = async (id) => {
    const res = await updateTime(id)
  };

  useEffect(() => {
    if (user?.id) {
      const intervalId = setInterval(() => {
        addTime(user?.id)
      }, 300000);
      return () => clearInterval(intervalId);
    }
  }, [user]);

  return (
    <div className="video-player">
      <LoadingComponent />
      {!playing && isClient && (
        <span
          onClick={() => setPlaying(true)}
          className="fixed w-32 h-32 top-1/2 left-1/2 
          -translate-x-1/2 -translate-y-1/2 bg-white z-10
          rounded-lg flex flex-col justify-center items-center select-none cursor-pointer"
        >
          <img
            src="/start.svg"
            alt="srta"
          />
          <p className="font-mono">Phát nhạc</p>
        </span>
      )}
      <div className="space-view select-none">
        <div className="w-screen h-screen relative">
          <div className="w-full h-full">
            {isClient && (
              <ReactPlayer
                width={"100%"}
                height={"100%"}
                loop
                muted={muted}
                volume={volume}
                playing={playing}
                url={url}
                config={{
                  youtube: {
                    playerVars: {
                      showinfo: 0,
                      autoplay: 0,
                      origin:
                        process.env.NEXT_PUBLIC_PROXY ||
                        "http://localhost:3000",
                    },
                  },
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
