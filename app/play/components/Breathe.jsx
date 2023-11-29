import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { BsWind } from "react-icons/bs";
import Image from "next/image";
import { IoCloseSharp } from "react-icons/io5";

export default function Breathe() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="flex flex-col justify-center items-center w-[45px] cursor-pointer duration-500 h-[45px] p-2 hover:bg-slate-200 rounded-sm">
          <BsWind className="w-4 h-4" />
          <span className="text-[9px] font-semibold">Breathe</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className="w-screen h-screen flex justify-center items-center">
          <Image
            src="/breathe.gif"
            width={500}
            height={500}
            alt="Breathe"
          />
        </div>
        <AlertDialogCancel className="absolute text-lg right-6 top-6">
          <IoCloseSharp />
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}
