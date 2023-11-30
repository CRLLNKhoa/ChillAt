"use client";
import React, { useContext, useEffect, useState } from "react";
import { MdInfoOutline } from "react-icons/md";
import { FaCaretLeft, FaVolumeHigh } from "react-icons/fa6";
import { listSpace } from "@/lib/listSpaces";
import {
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaListUl,
  FaRegHeart,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { PlayContext } from "../providers/PlayProvider";
import { cn } from "@/lib/utils";

export default function Spaces() {
  const {setSpace,space,afk} = useContext(PlayContext)
  return (
    <div className={cn("flex flex-col bg-white w-[300px] fixed top-[50px] -left-[400px] transition-all shadow-lg bottom-[10px] px-2 py-4 rounded-sm", space && !afk && "left-[80px]")}>
      <span onClick={()=>setSpace(false)} className="flex cursor-pointer items-center justify-center w-[30px] h-[40px] absolute top-8 -right-[30px] bg-slate-200 rounded-se-sm rounded-ee-sm">
        <FaCaretLeft className="w-6 h-6 text-black" />
      </span>
    <div className="flex justify-between">
      <h1 className="bg-slate-100 text-sm py-1 px-2 font-bold rounded-[4px]">
        Music 🎵
      </h1>
    </div>
    <div className="flex flex-col mt-2 gap-1">
      <h1 className="text-sm font-semibold flex gap-1">
        Lựa chọn không gian <MdInfoOutline className="text-slate-500" />
      </h1>
      <p className="text-[10px]">
        Nhấp vào biểu tượng cảm xúc nhiều lần để biết thêm nội dung
      </p>
    </div>
    <div className="overflow-y-auto">
     <div className="flex flex-wrap gap-2 justify-around py-4 items-start">
        {listSpace?.map((item) => (
          <ItemSpace
            key={item.name}
            dataItem={item}
          />
        ))}
     </div>
    </div>
    <InfoSpace />
  </div>
  );
}

const ItemSpace = ({ dataItem }) => {
  const [selecting, setSelecting] = useState(true);
  const [urlSelecting, setUrlSeleting] = useState(0);
  const { setUrl, setPlaying, url } = useContext(PlayContext);
  const endList = dataItem?.data?.length - 1;

  useEffect(() => {
    if (!dataItem.data.includes(url)) {
      setSelecting(false);
    } else setSelecting(true);
  }, [url]);

  useEffect(() => {
    setUrl(dataItem?.data[urlSelecting]);
    setPlaying(true);
  }, [urlSelecting]);

  function handleNext() {
    if (urlSelecting >= endList) {
      setUrlSeleting(0);
    } else setUrlSeleting(urlSelecting + 1);
  }

  function handlePrev() {
    if (urlSelecting <= 0) {
      setUrlSeleting(endList);
    }
    if (urlSelecting > 0) setUrlSeleting(urlSelecting - 1);
  }

  return (
    <div className="border-2 select-none cursor-pointer relative group w-[55px] h-[55px] rounded-md flex justify-center items-center">
      <img
        width={30}
        height={30}
        alt={dataItem.name}
        src={dataItem.img}
      />
      {!selecting ? (
        <div
          onClick={() => {
            setSelecting(true);
            setUrl(dataItem.data[urlSelecting]);
            setPlaying(true);
          }}
          className="absolute top-0 left-0 right-0 bottom-0 opacity-50 flex rounded-sm"
        ></div>
      ) : (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-white opacity-50 flex rounded-sm">
          <div
            onClick={handlePrev}
            className="w-1/2 h-full flex items-center  bg-slate-200 justify-center hover:bg-slate-500 rounded-es-sm rounded-ss-sm duration-500"
          >
            <FaChevronLeft />
          </div>
          <div
            onClick={handleNext}
            className="w-1/2 h-full flex items-center bg-slate-200  justify-center hover:bg-slate-500 rounded-se-sm rounded-ee-sm duration-500"
          >
            <FaChevronRight />
          </div>
        </div>
      )}
    </div>
  );
};

const InfoSpace = ({ favorited }) => {
  const { volume, setVolume } = useContext(PlayContext);
  return (
    <div className="flex flex-col w-full bg-slate-100 scale-[1.05] p-2 mt-2 gap-4">
      <div className="flex justify-between items-center">
        <div className="flex flex-col truncate w-[160px]">
          <h3 className="text-[12px] font-semibold truncate">
            Cái này tôi lười code...
          </h3>
          <span className="text-[10px] cursor-pointer">Share Space</span>
        </div>
        <div className="flex gap-2">
          {favorited ? (
            <Button
              variant="ghost"
              className="bg-white w-8 h-8 text-red-500 hover:text-red-500 duration-500 hover:bg-red-200"
              size="icon"
            >
              <FaHeart />
            </Button>
          ) : (
            <Button
              variant="ghost"
              className="bg-white w-8 h-8 text-red-500 hover:text-red-500 duration-500 hover:bg-red-200"
              size="icon"
            >
              <FaRegHeart />
            </Button>
          )}
          <Button
            variant="ghost"
            className="bg-white w-8 h-8 hover:bg-white"
            size="icon"
          >
            <FaListUl />
          </Button>
        </div>
      </div>
      <div className="flex gap-4">
        <FaVolumeHigh />
        <Slider
          defaultValue={[volume]}
          max={1}
          min={0}
          step={0.1}
          onValueChange={(e) => setVolume(e)}
        />
      </div>
    </div>
  );
};
