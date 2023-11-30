"use client";
import { Suspense, useContext, useEffect, useState } from "react";
import LoadingComponent from "./components/LoadingComponent";
import { PlayContext } from "./providers/PlayProvider";
import ReactPlayer from "react-player/lazy";

export default function Page() {
  const { muted, volume, url, playing, setPlaying } = useContext(PlayContext);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setPlaying(false);
  }, []);

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
          <p className="font-mono">Nhấn để phát</p>
        </span>
      )}
      <div className="space-view">
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
                      autoplay: 1,
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
