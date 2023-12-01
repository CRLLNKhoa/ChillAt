"use client";

import React, { useState } from "react";
import Draggable from "react-draggable";
import { Calendar } from "@/components/ui/calendar";

export function CalendarDemo() {
  const [date, setDate] = useState(new Date());

  return (
    <Draggable>
      <div className="flex flex-col justify-center items-center p-2 shadow-lg z-10 fixed top-[60px] 
      right-[10px] bg-white rounded-sm">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md w-full"
        />
      </div>
    </Draggable>
  );
}
