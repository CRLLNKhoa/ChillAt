"use client";
import LeftNav from "@/components/layouts/LeftNav";
import TopNav from "@/components/layouts/TopNav";
import React from "react";
import PlayProvider from "./providers/PlayProvider";
import { useState, useEffect } from 'react'
import LoadingComponent from "./components/LoadingComponent";

export default function Layout({ children }) {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  if(!isClient){
    return <LoadingComponent />
  }

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
