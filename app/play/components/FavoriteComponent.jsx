"use client";
import { updateFavorite } from "@/actions/account";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/lib/store/user";
import React, { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { PlayContext } from "../providers/PlayProvider";

export default function FavoriteComponent() {
    const {showMyFavorite, setShowMyFavorite} = useContext(PlayContext)
  const favorite = useUser((state) => state.favorite);
  return (
    <div
      className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[512px]
     max-w-lg h-96 bg-white shadow-lg rounded-md p-4 flex flex-col"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-md font-bold">My Favorite</h1>
        <span onClick={()=> setShowMyFavorite(!showMyFavorite)} className="p-2 hover:bg-slate-100 cursor-pointer duration-500 rounded-sm">
          <IoClose />
        </span>
      </div>
      <Separator className="mt-2 mb-4" />
      <div className="flex-1 overflow-y-auto grid grid-cols-3 gap-2">
        {favorite?.map((item) => (
          <CardFavorite
            key={item}
            link={item}
          />
        ))}
      </div>
    </div>
  );
}

const CardFavorite = ({ link = "DASFS" }) => {
  const favorite = useUser((state) => state.favorite);
  const user = useUser((state) => state.user);
  const setFavorite = useUser((state) => state.setFavorite);
  const [isLoading, setIsLoading] = useState(false);
  const {setUrl} = useContext(PlayContext)

  async function handleUnFavorite() {
    const unFavorite = favorite.filter((item) => item !== link);
    setIsLoading(true)
    await updateFavorite(unFavorite,user.id);
    setIsLoading(false)
    setFavorite(unFavorite);
  }

  return (
    <div onClick={()=>setUrl(link)} className="h-[120px] rounded-md relative overflow-hidden cursor-pointer">
      <div className="absolute w-full h-full bg-transparent">
        <span
          className="absolute bottom-0 left-0 bg-stone-950 px-4 py-1 text-white
         rounded-sm text-sm font-mono capitalize"
        >{`#${link?.slice(-4)}`}</span>
        {isLoading ? (
          <span
            className="absolute bottom-0 right-0 bg-stone-950 px-1 py-1 text-red-500 hover:text-white duration-500
         rounded-sm text-md font-mono capitalize"
          >
            <AiOutlineLoading3Quarters className="animate-spin" />
          </span>
        ) : (
          <span
            onClick={handleUnFavorite}
            className="absolute bottom-0 right-0 bg-stone-950 px-1 py-1 text-red-500 hover:text-white duration-500
         rounded-sm text-md font-mono capitalize"
          >
            <RiDeleteBack2Fill />
          </span>
        )}
      </div>
      <iframe
        width="100%"
        height="100%"
        src={link}
        title="Embedded youtube"
      />
    </div>
  );
};
