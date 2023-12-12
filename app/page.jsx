"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  const handleTry = () => {
    router.push("/play")
  }

  return (
    <main className="flex w-screen flex-col">
      <div className="bg-[#F9F7F6]">
        <div className="flex justify-between items-center py-4 px-4 container max-w-[1200px]">
          <div className="flex gap-1 items-center">
            <img
              src="/logo.png"
              alt=""
              className="w-8 h-8"
            />
            <h1 className="text-2xl font-bold">Chill At</h1>
          </div>
          <div className="lg:flex gap-4 hidden">
            <a className="duration-500 px-4 py-1 hover:bg-gray-200 rounded-[4px]" href="https://lofi-with-carol.vercel.app/" target="_blank">Lofiapp</a>
            <a className="duration-500 px-4 py-1 hover:bg-gray-200 rounded-[4px]"  href="https://luongkhoa.io.vn/" target="_blank">About me</a>
          </div>
          <Button onClick={handleTry} className="rounded-sm px-12">Try in browser</Button>
        </div>
      </div>
      <div className="container max-w-[1200px] flex flex-col gap-12 mt-12 mb-12">
          <div className="bg-[#F9F7F6] px-6 grid grid-cols-1 lg:grid-cols-2 gap-4 py-4 lg:py-0">
            <div className="flex flex-col justify-center gap-4">
              <p>Virtual Spaces</p>
              <h1 className="font-bold text-2xl">Create Your Ideal Work Environment.</h1>
              <p className="text-start">At ChillAt, weve crafted a unique digital workspace where the right ambiance, soothing music, and pleasing aesthetics effortlessly blend to enhance your productivity. Immerse yourself in this innovative environment designed to elevate your focus and ignite your creativity, making work a more enjoyable experience.</p>
              <Button onClick={handleTry}>Try in browser</Button>
            </div>
            <img src="/home1.png" alt="" className="h-[360px] w-full" />
          </div>
          <div className="bg-[#F9F7F6] px-6 gap-4 p-4 flex flex-col">
            <h1>How to Use?</h1>
            <ul className="list-decimal ml-6">
              <li>Navigate to the &quot;Spaces&quot; section on chill-at.vercel.app.</li>
              <li>Choose a dynamic space that resonates with your current mood – be it nature, cafe, city, or beach.</li>
              <li>Play the default music or dive into customization, picking from our sound library or plugging in a Youtube playlist link to our Media widget.</li>
              <li>Adjust volume levels, mix multiple soundscapes if desired, and immerse yourself in a work environment crafted just for you.</li>
            </ul>
          </div>
      </div>
    </main>
  );
}
