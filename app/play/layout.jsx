"use client";
import LeftNav from "@/components/layouts/LeftNav";
import TopNav from "@/components/layouts/TopNav";
import React from "react";
import PlayProvider from "./providers/PlayProvider";

export default function Layout({ children }) {
  
  return (
    <div className="">
      <PlayProvider>
        <TopNav />
        <LeftNav />
        <span id="spacePlayerMain">{children}</span>
      </PlayProvider>
    </div>
  );
}
