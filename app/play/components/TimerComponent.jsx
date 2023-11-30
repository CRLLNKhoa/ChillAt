"use client";
import React, { useContext, useState } from "react";
import Draggable from "react-draggable";
import Countdown from "react-countdown";
import { GrPowerReset } from "react-icons/gr";
import { padNumberWithZero } from "@/lib/padNumber";
import { cn } from "@/lib/utils";
import { PlayContext } from "../providers/PlayProvider";
const soundFile = "@/public/ting.mp3";

export default function TimerComponent() {
  const { setShowTimer } = useContext(PlayContext);
  const [isStart, setIsStart] = useState(false);
  const [type, setType] = useState(0);
  const time = [1500000, 900000, 300000];

  // Random component
  const Completionist = () => (
    <span className="text-[54px] leading-[50px] font-semibold text-slate-600">
      00:00
    </span>
  );

  // Renderer callback with condition
  const renderer = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span className="text-[54px] leading-[50px] font-semibold text-slate-600">
          {padNumberWithZero(minutes)}:{padNumberWithZero(seconds)}
        </span>
      );
    }
  };
  return (
    <Draggable>
      <div className="bg-white fixed top-1/2 left-1/2 w-[360px] flex flex-col rounded-md shadow-xl">
        <div className="flex justify-between items-center border-b px-2">
          <div className="flex gap-1">
            <span className="bg-gray-600 rounded-full p-1"></span>
            <span className="bg-gray-600 rounded-full p-1"></span>
            <span className="bg-gray-600 rounded-full p-1"></span>
            <span className="bg-gray-600 rounded-full p-1"></span>
          </div>
          <span
            onClick={() => setShowTimer(false)}
            className="hover:bg-slate-100 duration-500 cursor-pointer"
          >
            <img
              className="h-8"
              src="/small.svg"
            />
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex p-4 justify-between items-center">
            {isStart && (
              <Countdown
                date={Date.now() + time[type]}
                renderer={renderer}
              />
            )}
            {!isStart && type === 0 && (
              <span className="text-[54px] leading-[50px] font-semibold text-slate-600">
                25:00
              </span>
            )}
            {!isStart && type === 1 && (
              <span className="text-[54px] leading-[50px] font-semibold text-slate-600">
                15:00
              </span>
            )}
            {!isStart && type === 2 && (
              <span className="text-[54px] leading-[50px] font-semibold text-slate-600">
                05:00
              </span>
            )}
            <div className="flex gap-2 items-center">
              {!isStart && (
                <span
                  onClick={() => setIsStart(true)}
                  className={cn(
                    "px-4 py-2 rounded-sm border select-none cursor-pointer hover:border-sky-400 duration-500",
                    isStart && "border-green-500"
                  )}
                >
                  Start
                </span>
              )}
              {isStart && (
                <span
                  onClick={() => setIsStart(false)}
                  className={cn(
                    "px-4 py-2 rounded-sm border select-none cursor-pointer hover:border-sky-400 duration-500",
                    isStart && "border-green-500"
                  )}
                >
                  Pause
                </span>
              )}
              <span
                onClick={() => setIsStart(false)}
                className="cursor-pointer p-2 rounded-sm duration-1000 hover:bg-slate-100"
              >
                <GrPowerReset className="w-5 h-5 font-bold text-slate-600" />
              </span>
            </div>
          </div>
          {!isStart && (
            <div className="flex justify-between px-4 pb-2">
              <span
                onClick={() => {
                  setType(0);
                  setIsStart(false);
                }}
                className={cn(
                  "pb-1 cursor-pointer border-b-2 border-transparent",
                  type === 0 && "border-orange-500"
                )}
              >
                Pomodoro
              </span>
              <span
                onClick={() => {
                  setType(1);
                  setIsStart(false);
                }}
                className={cn(
                  "pb-1 cursor-pointer border-b-2 border-transparent",
                  type === 1 && "border-orange-500"
                )}
              >
                Short Break
              </span>
              <span
                onClick={() => {
                  setType(2);
                  setIsStart(false);
                }}
                className={cn(
                  "pb-1 cursor-pointer border-b-2 border-transparent",
                  type === 2 && "border-orange-500"
                )}
              >
                Long Break
              </span>
            </div>
          )}
        </div>
      </div>
    </Draggable>
  );
}
