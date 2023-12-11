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
import { useUser } from "@/lib/store/user";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { updateTasks } from "@/actions/account";
import { useToast } from "@/components/ui/use-toast";

export default function TaskComponent() {
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const tasks = useUser((state) => state.tasks);
  const setTasks = useUser((state) => state.setTasks);
  const user = useUser((state) => state.user);
  const { toast } = useToast();
  const [task, setTask] = useState({
    title: "",
    tag: "",
    colorTag: "#f01414",
    complete: false,
    id: new Date().getTime(),
  });

  async function handleCreateTask() {
    if (task.title === "" && task.tag === "") {
      toast({
        title: "Thiếu thông tin!",
        description: "Bạn chưa nhập đủ thông tin!",
      });
    } else {
      setIsLoading(true);
      await setTasks(tasks?.concat(task));
      await updateTasks(tasks?.concat(task), user?.id);
      setTask({
        title: "",
        tag: "",
        colorTag: "#f01414",
        complete: false,
        id: new Date().getTime(),
      });
      setIsLoading(false);
    }
  }

  return (
    <Draggable>
      <div className="flex flex-col shadow-lg z-10 fixed top-[60px] left-[80px] bg-white w-[300px] bottom-[40px] rounded-sm">
        <div className="px-2 py-2">
          <span
            onClick={() => {
              if(user){
                setIsShow(!isShow)
              }
              else toast({
                title: "Bạn chưa đăng nhập!",
                description: "Vui lòng đăng nhập để lưu lại công việc!"
              })
            }}
            className="flex font-bold items-center gap-1 text-sm px-2 py-2 cursor-pointer rounded-sm hover:bg-sky-100 duration-500"
          >
            <IoMdAdd /> Thêm công việc
          </span>
        </div>
        <div className="px-2 flex-1 pb-2 overflow-y-auto">
          <div className="w-full pt-2 flex flex-col gap-4">
            {tasks?.map((item) => (
              <CardTask
                key={item}
                data={item}
              />
            ))}
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
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="title">Tên tag</Label>
              <Input
                type="text"
                id="title"
                placeholder="Ex: 🧠 life..."
                value={task.tag}
                onChange={(e) => setTask({ ...task, tag: e.target.value })}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="color">Màu tag</Label>
              <Input
                type="color"
                id="color"
                className="w-[200px]"
                placeholder="Tên công việc..."
                value={task.colorTag}
                onChange={(e) => setTask({ ...task, colorTag: e.target.value })}
              />
            </div>
            <div className="flex gap-2">
              <Button
                disabled={isLoading}
                onClick={handleCreateTask}
                className="mt-auto flex-1"
              >
                {isLoading ? (
                  <AiOutlineLoading3Quarters className="animate-spin" />
                ) : (
                  <p>Save</p>
                )}
              </Button>
              <Button
                onClick={() => setIsShow(false)}
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

const CardTask = ({ data }) => {
  const [complete, setComplete] = useState(data?.complete);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDel, setIsLoadingDel] = useState(false);
  const tasks = useUser((state) => state.tasks);
  const user = useUser((state) => state.user);
  const setTasks = useUser((state) => state.setTasks);

  async function handleUpdateTask() {
    const newArray = tasks.filter((item) => item.id !== data?.id);
    setIsLoading(true);
    setTasks(newArray?.concat({ ...data, complete: !complete }));
    await updateTasks(
      newArray?.concat({ ...data, complete: !complete }),
      user?.id
    );
    setIsLoading(false);
  }

  async function handleRemoveTask() {
    const newArray = tasks.filter((item) => item.id !== data?.id);
    setIsLoadingDel(true);
    setTasks(newArray);
    await updateTasks(newArray, user?.id);
    setIsLoadingDel(false);
  }

  return (
    <div className="border p-3 rounded-sm relative hover:bg-slate-100 duration-500">
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={complete}
            onCheckedChange={() => {
              setComplete(!complete);
              handleUpdateTask();
            }}
            disabled={isLoading}
          />
          <label
            htmlFor="terms"
            className={cn(
              "text-[12px] w-full leading-3 font-bold truncate peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
              complete && "line-through"
            )}
          >
            {data?.title}
          </label>
        </div>
        <div className="flex pl-6">
          <div
            style={{ backgroundColor: data?.colorTag }}
            className={`text-white px-2 mt-1 text-[12px] flex items-center justify-center`}
          >
            {data?.tag}
          </div>
        </div>

        {complete && (
          <div
            onClick={handleRemoveTask}
            className="absolute right-0 bottom-0 p-1 text-white bg-red-500 rounded-ss-sm rounded-ee-sm cursor-pointer hover:bg-red-800"
          >
            <IoMdClose />
          </div>
        )}
      </div>
     {isLoadingDel &&  <div className="absolute w-full h-full top-0 gap-4 text-white left-0 flex justify-center items-center bg-red-500/80">
        <AiOutlineLoading3Quarters className="animate-spin" />
        <p>Đang xóa...</p>
      </div>}
      {isLoading &&  <div className="absolute w-full h-full top-0 gap-4 text-white left-0 flex justify-center items-center bg-orange-500/80">
        <AiOutlineLoading3Quarters className="animate-spin" />
        <p>Đang cập nhật...</p>
      </div>}
    </div>
  );
};
