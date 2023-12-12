"use client"
import { Button } from "@/components/ui/button";
import React, { useContext } from "react";
import { RiUploadCloud2Line } from "react-icons/ri";
import { exploreData } from "@/lib/dataExlore";
import { Separator } from "@/components/ui/separator";
import { PlayContext } from "../../providers/PlayProvider";
import Carouselcomponent from "@/components/ui/carousel";

export default function SpaceExlore() {
    const {setUrl} = useContext(PlayContext)
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Không Gian</h1>
        <Button
          variant="outline"
          className="flex gap-2 text-foreground"
        >
          <RiUploadCloud2Line className="w-5 h-5" /> Gửi yêu cầu
        </Button>
      </div>
      <Separator className="mt-4 mb-4" />
      <div className="grid grid-cols-5 gap-2">
        <div className="col-span-5 lg:col-span-2">
          <h1 className="flex gap-1 items-center text-xl mb-2 font-bold">
            <img
              src="https://assets-global.website-files.com/60babc2e4a97ce747f58d8db/61fa9fd3953396948a95b0cd_diamond.gif"
              loading="lazy"
              width="25"
              alt=""
            />
            Now
          </h1>
          <div onClick={() => setUrl(exploreData.now.link)} className="h-[232px] rounded-xl overflow-hidden cursor-pointer">
            <img
              src={exploreData.now.img}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        </div>
        <div className="col-span-5 lg:col-span-3">
          <h1 className="flex gap-1 items-center text-xl font-bold mb-2">
            <img
              src="https://assets-global.website-files.com/60babc2e4a97ce747f58d8db/61fa9fc89533963f0b95b022_hot.gif"
              loading="lazy"
              width="25"
              alt=""
            />
            Treding
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {exploreData?.trending.slice(0,4).map(item => (
                <div onClick={() => setUrl(item.link)} key={item.src} className="h-[112px] rounded-xl overflow-hidden cursor-pointer">
                <img
                  src={item.img}
                  className="w-full h-full object-cover"
                  alt=""
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-6">
        <Carouselcomponent title="New Spaces" data={exploreData?.trending.slice(0,4)} />
      </div>
      <div className="my-6">
        <Carouselcomponent title="Community Favs" sub="Hand picked by the LifeAt community weekly." data={exploreData?.trending.slice(4,8)} />
      </div>
      <div className="my-6">
        <Carouselcomponent title="Trending" sub="Checkout the spaces that are 🔥" data={exploreData?.trending.slice(8,12)} />
      </div>
    </div>
  );
}
