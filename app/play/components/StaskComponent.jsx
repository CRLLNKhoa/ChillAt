"use client";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import Draggable from "react-draggable";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IoMdClose } from "react-icons/io";
import { cn } from "@/lib/utils";

export default function TaskComponent() {
  const [isShow, setIsShow] = useState(false);
  return (
    <Draggable>
      <div className="flex flex-col shadow-lg z-10 fixed top-[60px] left-[80px] bg-white w-[300px] bottom-[40px] rounded-sm">
        <div className="px-2 py-2">
          <span
            onClick={() => setIsShow(!isShow)}
            className="flex font-bold items-center gap-1 text-sm px-2 py-2 cursor-pointer rounded-sm hover:bg-sky-100 duration-500"
          >
            <IoMdAdd /> Thêm công việc
          </span>
        </div>
        <div className="px-2 flex-1 pb-2 overflow-y-auto">
          <div className="w-full pt-2 flex flex-col gap-4">
            <CardTask />
            <CardTask />
            <CardTask />
            <CardTask />
            <CardTask />
            <CardTask />
            <CardTask />
            <CardTask />
            <CardTask />
            <CardTask />
            <CardTask />
            <CardTask />
          </div>
        </div>

        {isShow && (
          <div className="absolute top-0 -right-[310px] flex flex-col gap-4 min-h-[300px] rounded-sm min-w-[300px] bg-white p-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="title">Tên công việc</Label>
              <Input
                type="text"
                id="title"
                placeholder="Ex: Công việc 1..."
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="title">Tên tag</Label>
              <Input
                type="text"
                id="title"
                placeholder="Ex: 🧠 life..."
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="color">Màu tag</Label>
              <Input
                type="color"
                id="color"
                className="w-[200px]"
                placeholder="Tên công việc..."
              />
            </div>
            <div className="flex gap-2">
              <Button className="mt-auto flex-1">Save</Button>
              <Button onClick={() => setIsShow(false)}
                variant="destructive"
                className="mt-auto"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </Draggable>
  );
}

const CardTask = () => {
    const [complete, setComplete] = useState(false);
  return (
    <div className="border p-3 rounded-sm relative">
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <Checkbox defaultValue={complete} onCheckedChange={() => setComplete(!complete)} />
          <label
            htmlFor="terms"
            className={cn("text-[12px] w-full leading-3 truncate font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70", complete && "line-through")}
          >
            Accept terms and conditions
          </label>
        </div>
        <div className="flex pl-6">
          <div className="bg-pink-100 px-2 mt-1 text-[12px] flex items-center justify-center">
            🧠 life
          </div>
        </div>

       {complete &&  <div className="absolute right-0 bottom-0 p-1 text-white bg-red-500 rounded-ss-sm rounded-ee-sm cursor-pointer hover:bg-red-800">
          <IoMdClose />
        </div>}
      </div>
    </div>
  );
};
