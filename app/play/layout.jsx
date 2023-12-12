"use client";
import LeftNav from "@/components/layouts/LeftNav";
import TopNav from "@/components/layouts/TopNav";
import React from "react";
import PlayProvider from "./providers/PlayProvider";
import { useState, useEffect } from "react";
import LoadingComponent from "./components/LoadingComponent";
import ExploreComponent from "./components/Explore/ExploreComponent";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export default function Layout({ children }) {
  const [isClient, setIsClient] = useState(false);
  const [guide, setGuide] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const items = JSON.parse(localStorage.getItem("guide"));
    if (items) {
      setGuide(items);
    }
  }, []);

  useEffect(() => {
    if (isClient && !guide) {
      driverObj.drive();
    }
  }, [isClient]);

  const driverObj = driver({
    allowClose: false,
    steps: [
      {
        element: "#loginbtn",
        popover: {
          title: "Đăng nhập!",
          description: "Đăng nhập để lưu dữ liệu.",
          side: "left",
          align: "start",
        },
      },
      {
        element: "#mute",
        popover: {
          title: "Bật/Tắt",
          description: "Bật tắt âm thanh  tại đây!",
          side: "left",
          align: "start",
        },
      },
      {
        element: "#share",
        popover: {
          title: "Chia sẻ",
          description: "Chia sẻ website với bạn bè trên facebook!",
          side: "left",
          align: "start",
        },
      },
      {
        element: "#full",
        popover: {
          title: "Bật/Tắt",
          description:
            "Bật tắt toàn màn hình, toàn màn hình để có trải nghiệm tốt!",
          side: "left",
          align: "start",
        },
      },
      {
        element: "#space",
        popover: {
          title: "Không gian",
          description:
            "Lựa chọn không gian và điều chỉnh âm lượng lưu không gian!",
          side: "left",
          align: "start",
        },
      },
      {
        element: "#timer",
        popover: {
          title: "Timer Pomodoro",
          description: "Tùy chỉnh thời gian vào việc!",
          side: "left",
          align: "start",
        },
      },
      {
        element: "#task",
        popover: {
          title: "Danh sách việc",
          description: "Thêm công việc bạn cần làm!",
          side: "left",
          align: "start",
        },
      },
      {
        element: "#calendar",
        popover: {
          title: "Lịch",
          description: "Xem lịch!",
          side: "left",
          align: "start",
        },
      },
      {
        element: "#tho",
        popover: {
          title: "Thư giản",
          description: "Nghe nhạc và điều chỉnh hơi thở!",
          side: "left",
          align: "start",
        },
      },
      {
        element: "#explore",
        popover: {
          title: "Khám phá",
          description: "Khám phá và xem tin tức của website!",
          side: "left",
          align: "start",
        },
        onDeselected: () => {
          localStorage.setItem('guide', true);
        },
      },
    ],
  });

  if (!isClient) {
    return <LoadingComponent />;
  }

  return (
    <div className="">
      <PlayProvider>
        <ExploreComponent />
        <TopNav />
        <span id="spacePlayerMain">{children}</span>
        <LeftNav />
      </PlayProvider>
    </div>
  );
}
