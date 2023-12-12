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
          <Button onClick={handleTry} className="rounded-sm px-12">Thử ngay</Button>
        </div>
      </div>
      <div className="container max-w-[1200px] flex flex-col gap-12 mt-12 mb-12">
          <div className="bg-[#F9F7F6] px-6 grid grid-cols-1 lg:grid-cols-2 gap-4 py-4 lg:py-0">
            <div className="flex flex-col justify-center gap-4">
              <p>Không gian ảo</p>
              <h1 className="font-bold text-2xl">Tạo môi trường làm việc lý tưởng của bạn.</h1>
              <p className="text-start">Tại ChillAt, chúng tôi đã tạo ra một không gian làm việc kỹ thuật số độc đáo, nơi có bầu không khí phù hợp, âm nhạc êm dịu và tính thẩm mỹ hài lòng dễ dàng hòa quyện để nâng cao năng suất của bạn. Đắm mình trong môi trường đổi mới này được thiết kế để nâng cao sự tập trung và khơi dậy khả năng sáng tạo của bạn, khiến công việc trở thành một trải nghiệm thú vị hơn.</p>
              <Button onClick={handleTry}>Thử ngay</Button>
            </div>
            <img src="/home1.png" alt="" className="h-[360px] w-full" />
          </div>
          <div className="bg-[#F9F7F6] px-6 gap-4 p-4 flex flex-col">
            <h1>Làm thế nào để sử dụng?</h1>
            <ul className="list-decimal ml-6">
              <li>Điều hướng đến phần &quot;Không gian&quot; phần trên chill-at.vercel.app.</li>
              <li>Chọn một không gian năng động phù hợp với tâm trạng hiện tại của bạn – có thể là thiên nhiên, quán cà phê, thành phố hoặc bãi biển.</li>
              <li>Phát nhạc mặc định hoặc đi sâu vào tùy chỉnh, chọn từ thư viện âm thanh của chúng tôi hoặc cắm liên kết danh sách phát Youtube vào tiện ích Phương tiện của chúng tôi.</li>
              <li>Điều chỉnh mức âm lượng, trộn nhiều cảnh âm thanh nếu muốn và đắm mình trong môi trường làm việc được tạo riêng cho bạn.</li>
            </ul>
          </div>
      </div>
    </main>
  );
}
