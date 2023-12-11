import React, { useContext } from "react";
import { GrPlan } from "react-icons/gr";
import { PlayContext } from "../../providers/PlayProvider";
import { IoMdHeadset } from "react-icons/io";
import { TfiWorld } from "react-icons/tfi";
import { Button } from "@/components/ui/button";
import { FiSidebar } from "react-icons/fi";

export default function ExploreComponent() {
  const { showEx, setShowEx } = useContext(PlayContext);

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
        <div className="absolute top-[40px] left-[70px] w-full right-0 bg-red-500 bottom-0 border-r flex flex-col items-center justify-start py-4">
        </div>
      </div>
    );
  }
}
