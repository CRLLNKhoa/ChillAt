"use client";
import { createContext, useEffect, useState } from "react";
import React from "react";
import { useSearchParams } from "next/navigation";
import { listShare } from "@/lib/listSpaces";

export const PlayContext = createContext();

export default function PlayProvider({ children }) {
  const searchParams = useSearchParams();
  const spaces = searchParams.get("space");
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [playing, setPlaying] = useState(false);
  const [space, setSpace] = useState(false);
  const [url, setUrl] = useState(listShare[spaces]);
  const [afk, setAfk] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);
  const [showMyFavorite, setShowMyFavorite] = useState(false);
  const [showEx, setShowEx] = useState(false);
  let mouseIdleTimer;
  const idleTimeThreshold = 30000;

  useEffect(() => {
    setUrl(
      listShare[spaces] ||
        listShare[Math.floor(Math.random() * (172 - 100 + 1)) + 100]
    );
    setPlaying(false)
    window.addEventListener("mousemove", handleMouseMove);
  }, []);

  function handleMouseMove() {
    setAfk(false);
    // Đặt lại bộ đếm thời gian khi trỏ chuột di chuyển
    clearTimeout(mouseIdleTimer);

    // Tạo một bộ đếm mới
    mouseIdleTimer = setTimeout(function () {
      // Xử lý sự kiện khi trỏ chuột không di chuyển
      console.log("Trỏ chuột không di chuyển");

      // Thêm code xử lý sự kiện của bạn ở đây
      setAfk(true);
    }, idleTimeThreshold);
  }
  return (
    <PlayContext.Provider
      suppressHydrationWarning
      value={{
        showTimer,
        setShowTimer,
        muted,
        setMuted,
        volume,
        setVolume,
        url,
        setUrl,
        playing,
        setPlaying,
        space,
        setSpace,
        afk,
        showTask,
        setShowTask,
        showCalendar,
        setShowCalendar,
        showChatBot,
        setShowChatBot,
        showMyFavorite,
        setShowMyFavorite,
        showEx,
        setShowEx,
      }}
    >
      {children}
    </PlayContext.Provider>
  );
}
