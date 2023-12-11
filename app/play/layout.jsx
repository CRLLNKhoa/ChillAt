"use client";
import LeftNav from "@/components/layouts/LeftNav";
import TopNav from "@/components/layouts/TopNav";
import React from "react";
import PlayProvider from "./providers/PlayProvider";
import { useState, useEffect } from 'react'
import LoadingComponent from "./components/LoadingComponent";
import ExploreComponent from "./components/Explore/ExploreComponent";

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
      <ExploreComponent/>
        <TopNav />
        <span id="spacePlayerMain">{children}</span>
        <LeftNav />
      </PlayProvider>
    </div>
  );
}
