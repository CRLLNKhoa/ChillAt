"use client"
import React, { useContext, useState } from "react";
import { GrPlan } from "react-icons/gr";
import { PlayContext } from "../../providers/PlayProvider";
import { IoMdHeadset } from "react-icons/io";
import { TfiWorld } from "react-icons/tfi";
import { Button } from "@/components/ui/button";
import { FiSidebar } from "react-icons/fi";
import SpaceExlore from "./SpaceExlore";
import RankingsComponent from "./RankingsComponent";
import { cn } from "@/lib/utils";

export default function ExploreComponent() {
  const { showEx, setShowEx } = useContext(PlayContext);
  const [tab, setTab] = useState(1);

  if (!showEx) {
    return null;
  }

  if (showEx) {
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 z-[9999] bg-white">
        <div
          className={
            "w-full h-[40px] z-[100] fixed transition-all border-b bg-white flex items-center py-1 justify-between"
          }
        >
          <div className="w-[70px] flex items-center justify-center">
            <Button
              className="w-8 h-8"
              variant="ghost"
              size="icon"
            >
              <FiSidebar className="w-5 h-5 text-muted-foreground" />
            </Button>
          </div>
        </div>
        <div className="absolute top-[40px] left-0 bg-white w-[70px] bottom-0 border-r flex flex-col items-center justify-start py-4">
          {/* NOTE PLAN BUTTON */}
          <div
            className=" flex flex-col items-center justify-center gap-2 
              font-semibold text-muted-foreground cursor-pointer w-[55px] hover:bg-slate-100 rounded-xl duration-300 py-4"
          >
            <p className="text-[10px]">PLAN</p>
            <GrPlan />
          </div>
          {/* NOTE PLAN BUTTON */}
          <div onClick={()=> setShowEx(false)} 
            className=" flex flex-col items-center justify-center gap-2 
              font-semibold text-muted-foreground cursor-pointer w-[55px] hover:bg-slate-100 rounded-xl duration-300 py-4"
          >
            <span className="text-[10px]">FOCUS</span>
            <IoMdHeadset />
          </div>
          {/* NOTE PLAN BUTTON */}
          <div onClick={()=> setShowEx(false)}
            className=" flex flex-col items-center justify-center gap-2 
              font-semibold text-muted-foreground cursor-pointer w-[55px] bg-slate-100 rounded-xl duration-300 py-4"
          >
            <span className="text-[10px]">EXPLORE</span>
            <TfiWorld />
          </div>
        </div>
        <div className="absolute top-[40px] left-[70px] right-0
         bottom-0 border-r grid grid-cols-8 py-4">
            <div className="border-r p-4 pt-12 hidden lg:flex flex-col gap-2 text-[14px] justify-start items-start">
              <h1 onClick={() => setTab(1)} className={cn("hover:text-sky-500 cursor-pointer duration-500",tab === 1 && "text-sky-500 font-semibold")}>🏞️ Không gian</h1>
              <h1 onClick={() => setTab(2)} className={cn("hover:text-sky-500 cursor-pointer duration-500",tab === 2 && "text-sky-500 font-semibold")}>📑 Bảng xếp hạng</h1>
            </div>
            <div className="col-span-8 lg:col-span-7 p-4 overflow-y-auto">
              {tab === 1 && <SpaceExlore />}
              {tab === 2 && <RankingsComponent />}
            </div>
        </div>
      </div>
    );
  }
}
