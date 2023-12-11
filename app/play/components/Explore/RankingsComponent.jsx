import { getUsers } from "@/actions/account";
import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";
import { FaRegQuestionCircle } from "react-icons/fa";

export default function RankingsComponent() {
  const [data, setData] = useState();

  const readUsers = async () => {
    const res = await getUsers();
    console.log(res);
    setData(res.slice(0, 9));
  };

  useEffect(() => {
    readUsers();
  }, []);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-full flex-col gap-4">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-8 w-2/3" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center flex-col gap-8">
      <div className="flex w-2/3 flex-col">
        <div className="flex justify-between items-center">
          <h1 className="font-bold">Time Onlines</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <FaRegQuestionCircle />
              </TooltipTrigger>
              <TooltipContent>
                <p>Music listening time</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex flex-col mt-4 gap-2">
          <div className="flex gap-2 items-center border text-white bg-sky-500 p-2 px-4 rounded-md">
            <span>1</span>
            <img
              src={"https://luongkhoa.io.vn/aaa.jpg"}
              alt="img"
              className="w-8 h-8 mx-4 rounded-full"
            />
            <h1>Lương Khoa</h1>
            <h1 className="ml-auto">12,050 minutes</h1>
            <img
              src="/cup.svg"
              alt="cup"
              className="w-8 h-8 ml-auto"
            />
          </div>
          {data
            ?.sort((a, b) => b.time_online - a.time_online)
            ?.slice(0, 2)
            .map((item, index) => (
              <div
                key={item.id}
                className="flex gap-2 items-center border text-sky-500  p-2 px-4 rounded-md"
              >
                <span>{index + 2}</span>
                <img
                  src={item.avatar || "/user.svg"}
                  alt="img"
                  className="w-8 h-8 mx-4 rounded-full"
                />
                <h1>{item.full_name}</h1>
                <h1 className="ml-auto">{item.time_online} minutes</h1>
                <img
                  src="/star.svg"
                  alt="cup"
                  className="w-8 h-8 ml-auto"
                />
              </div>
            ))}
          {data
            ?.sort((a, b) => b.time_online - a.time_online)
            ?.slice(2, 9)
            .map((item, index) => (
              <div
                key={item.id}
                className="flex gap-2 items-center border text-sky-500  p-2 px-4 rounded-md"
              >
                <span>{index + 4}</span>
                <img
                  src={item.avatar || "/user.svg"}
                  alt="img"
                  className="w-8 h-8 mx-4 rounded-full"
                />
                <h1>{item.full_name}</h1>
                <h1 className="ml-auto">{item.time_online} minutes</h1>
                <img
                  src="/star1.svg"
                  alt="cup"
                  className="w-8 h-8 ml-auto"
                />
              </div>
            ))}
        </div>
      </div>
      <div className="flex w-2/3 flex-col">
        <div className="flex justify-between items-center">
          <h1 className="font-bold">Coins</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <FaRegQuestionCircle />
              </TooltipTrigger>
              <TooltipContent>
                <p>Use the timer feature to receive coins</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex flex-col mt-4 gap-2">
          <div className="flex gap-2 items-center border text-white bg-sky-500 p-2 px-4 rounded-md">
            <span>1</span>
            <img
              src={"https://luongkhoa.io.vn/aaa.jpg"}
              alt="img"
              className="w-8 h-8 mx-4 rounded-full"
            />
            <h1>Lương Khoa</h1>
            <h1 className="ml-auto">12,050 Coins</h1>
            <img
              src="/cup.svg"
              alt="cup"
              className="w-8 h-8 ml-auto"
            />
          </div>
          {data
            ?.sort((a, b) => b.coin - a.coin)
            ?.slice(0, 2)
            ?.map((item, index) => (
              <div
                key={item.id}
                className="flex gap-2 items-center border text-sky-500  p-2 px-4 rounded-md"
              >
                <span>{index + 2}</span>
                <img
                  src={item.avatar || "/user.svg"}
                  alt="img"
                  className="w-8 h-8 mx-4 rounded-full"
                />
                <h1>{item.full_name}</h1>
                <h1 className="ml-auto">{item.coin} Coins</h1>
                <img
                  src="/star.svg"
                  alt="cup"
                  className="w-8 h-8 ml-auto"
                />
              </div>
            ))}
          {data
            ?.sort((a, b) => b.coin - a.coin)
            ?.slice(2, 9)
            ?.map((item, index) => (
              <div
                key={item.id}
                className="flex gap-2 items-center border text-sky-500  p-2 px-4 rounded-md"
              >
                <span>{index + 2}</span>
                <img
                  src={item.avatar || "/user.svg"}
                  alt="img"
                  className="w-8 h-8 mx-4 rounded-full"
                />
                <h1>{item.full_name}</h1>
                <h1 className="ml-auto">{item.coin} Coins</h1>
                <img
                  src="/star1.svg"
                  alt="cup"
                  className="w-8 h-8 ml-auto"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
