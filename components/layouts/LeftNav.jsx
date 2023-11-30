import React, { useContext } from "react";
import { GrPlan } from "react-icons/gr";
import { TfiWorld } from "react-icons/tfi";
import { TbSpeakerphone } from "react-icons/tb";
import { IoImageOutline, IoSettingsOutline } from "react-icons/io5";
import { IoMdHeadset } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { RiTimerLine } from "react-icons/ri";
import { BiTask } from "react-icons/bi";
import { IoCalendarOutline } from "react-icons/io5";
import { FaRegStickyNote } from "react-icons/fa";
import { FaRegCirclePlay } from "react-icons/fa6";
import Breathe from "@/app/play/components/Breathe";
import Spaces from "@/app/play/components/Spaces";
import { PlayContext } from "@/app/play/providers/PlayProvider";
import { cn } from "@/lib/utils";
import TimerComponent from "@/app/play/components/TimerComponent";
import TaskComponent from "@/app/play/components/StaskComponent";

function LeftNav() {
  const {
    space,
    setSpace,
    afk,
    showTimer,
    setShowTimer,
    showTask,
    setShowTask,
  } = useContext(PlayContext);
  return (
    <div
      className={cn(
        "z-50 fixed top-[40px] transition-all left-0 bottom-0 w-[70px] gap-2 bg-white flex flex-col justify-between items-center py-2 px-1",
        afk && "-left-[100px]"
      )}
    >
      {/* NOTE PLAN BUTTON */}
      <div
        className=" flex flex-col items-center justify-center gap-2 
      font-semibold text-muted-foreground cursor-pointer w-[55px] hover:bg-slate-100 rounded-xl duration-300 py-4"
      >
        <p className="text-[10px]">PLAN</p>
        <GrPlan />
      </div>
      {/* NOTE SCROLL TOOLS */}
      <div className="w-[55px] h-full px-2 bg-slate-100 flex flex-col gap-2 justify-start items-center rounded-lg overflow-hidden hover:overflow-y-auto overflow-x-hidden py-2">
        <div className="flex flex-col justify-center items-center gap-2 border-b-2 pb-2 ">
          <span className="text-[10px]">FOCUS</span>
          <IoMdHeadset />
        </div>
        {/* TODO ITEM */}
        <div
          onClick={() => setSpace(!space)}
          className={cn(
            "flex flex-col justify-center items-center w-[45px] cursor-pointer duration-500 h-[45px] p-2 hover:bg-slate-200 rounded-sm",
            space && "text-sky-500 bg-slate-200"
          )}
        >
          <IoImageOutline className="w-4 h-4" />
          <span className="text-[9px] font-semibold">Spaces</span>
        </div>
        {/* TODO ITEM */}
        <div
          onClick={() => setShowTimer(!showTimer)}
          className={cn(
            "flex flex-col justify-center items-center w-[45px] cursor-pointer duration-500 h-[45px] p-2 hover:bg-slate-200 rounded-sm",
            showTimer && "text-sky-500 bg-slate-200"
          )}
        >
          <RiTimerLine className="w-4 h-4" />
          <span className="text-[9px] font-semibold">Timer</span>
        </div>
        {/* TODO ITEM */}
        <div onClick={() => setShowTask(!showTask)} className={cn("flex flex-col justify-center items-center w-[45px] cursor-pointer duration-500 h-[45px] p-2 hover:bg-slate-200 rounded-sm", showTask && "text-sky-500 bg-slate-200")}>
          <BiTask className="w-4 h-4" />
          <span className="text-[9px] font-semibold">Tasks</span>
        </div>
        {/* TODO ITEM */}
        <div className="flex flex-col justify-center items-center w-[45px] cursor-pointer duration-500 h-[45px] p-2 hover:bg-slate-200 rounded-sm">
          <IoCalendarOutline className="w-4 h-4" />
          <span className="text-[9px] font-semibold">Calender</span>
        </div>
        {/* TODO ITEM */}
        <div className="flex flex-col justify-center items-center w-[45px] cursor-pointer duration-500 h-[45px] p-2 hover:bg-slate-200 rounded-sm">
          <FaRegStickyNote className="w-4 h-4" />
          <span className="text-[9px] font-semibold">Notes</span>
        </div>
        {/* TODO ITEM */}
        <div className="flex flex-col justify-center items-center w-[45px] cursor-pointer duration-500 h-[45px] p-2 hover:bg-slate-200 rounded-sm">
          <FaRegCirclePlay className="w-4 h-4" />
          <span className="text-[9px] font-semibold">Media</span>
        </div>
        {/* TODO ITEM */}
        <Breathe />
      </div>
      {/* NOTE EXPLORE */}
      <div className="flex flex-col items-center">
        <div
          className=" flex flex-col items-center justify-center gap-2 
      font-semibold text-muted-foreground cursor-pointer w-[55px] hover:bg-slate-100 rounded-xl duration-300 py-4"
        >
          <p className="text-[10px]">EXPLORE</p>
          <TfiWorld />
        </div>
        <Button
          className="hover:bg-slate-100"
          size="icon"
          variant="ghost"
        >
          <TbSpeakerphone className="h-5 w-5 text-muted-foreground" />
        </Button>
        <Button
          className="hover:bg-slate-100"
          size="icon"
          variant="ghost"
        >
          <IoSettingsOutline className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>
      <Spaces />
      {showTimer && <TimerComponent />}
      {showTask && <TaskComponent />}
    </div>
  );
}

export default LeftNav;
