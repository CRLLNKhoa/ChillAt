import { PlayContext } from '@/app/play/providers/PlayProvider';
import React, { useContext } from 'react'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

export default function Carouselcomponent({title="", sub="Try out some of the new spaces we just added", data=[]}) {
    const {setUrl} = useContext(PlayContext)
    return (
    <div className='flex flex-col select-none'>
        <div className='flex justify-between items-center'>
            <div className='flex flex-col'>
                <h1 className='text-xl font-bold'>{title}</h1>
                <p className='text-sm font-semibold text-gray-500'>{sub}</p>
            </div>
            <div className='flex gap-4'>
                <span className='border rounded-full flex items-center justify-center w-12 h-12 cursor-pointer hover:bg-sky-400 hover:border-sky-400 hover:text-white duration-500'>
                <FaArrowLeft />
                </span>
                <span className='border rounded-full flex items-center justify-center w-12 h-12 cursor-pointer hover:bg-sky-400 hover:border-sky-400 hover:text-white duration-500'>
                <FaArrowRight />
                </span>
            </div>
        </div>
        <div className='grid sm:grid-cols-1 lg:grid-cols-4 gap-4 mt-4'>
            {data.map(item => (
                <div onClick={() => setUrl(item.link)} key={item?.link} className='flex flex-col cursor-pointer'>
                <img className='rounded-sm h-[160px]' src={item.img} alt="" />
                <div className='flex flex-col mt-2'>
                    <h1 className='text-sm font-bold truncate'>{item.name}</h1>
                    <p className='text-[10px] font-semibold leading-none text-gray-500'>{item.src}</p>
                </div>
            </div>
            ))}
        </div>
    </div>
  )
}
