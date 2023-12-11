import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex justify-center items-center w-screen h-screen flex-col">
        <h1 className="text-3xl">Chill At</h1>
        <Button className="bg-black hover:bg-slate-900">
          Xem Ngay
        </Button>
    </main>
  )
}
