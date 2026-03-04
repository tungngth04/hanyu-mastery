import { BookA, CirclePlay, Clock, Flame, Trophy } from "lucide-react";
import Button from "../../atoms/button";
import "./style.scss";
import { Card, CardContent } from "../../atoms/card";
function Home() {
  const statis = [
    {
      label: "Chuỗi học tập",
      value: "5 ngày",
      icon: Flame,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      label: "Từ vựng đã học",
      value: "342 từ",
      icon: BookA,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: "Thời gian học",
      value: "12h 30m",
      icon: Clock,
      color: "text-green-500",
      bg: "bg-green-50",
    },
    {
      label: "Cấp độ hiện tại",
      value: "HSK 3",
      icon: Trophy,
      color: "text-yellow-500",
      bg: "bg-yellow-50",
    },
  ];

  const route = [
    {
      label: "Từ vựng theo chủ đề",
      value: "15 chủ đề giao tiếp cơ bản",
      percent: "65",
      bg: "bg-blue-500",
    },
    {
      label: "Luyện phát âm chuẩn",
      value: "Thanh điệu và ngữ điệu",
      percent: "40",
      bg: "bg-green-500",
    },
    {
      label: "Ngữ pháp HSK 3",
      value: "Các điểm ngữ pháp quan trọng",
      percent: "15",
      bg: "bg-purple-500",
    },
    {
      label: "Flashcards ôn tập",
      value: "Ôn tập 50 từ vựng cũ",
      percent: "80",
      bg: "bg-orange-500",
    },
  ];

  const video = [
    { label: "Giao tiếp trong nhà hàng", value: "10:25 • 1.2k lượt xem" },
    { label: "Phân biệt 的 得 地", value: "15:40• 3.4k lượt xem" },
    { label: "Từ vựng về Công nghệ", value: "08:15• 856 lượt xem" },
  ];
  return (
    <div className="space-y-8">
      <div className="relative bg-linear-to-r from-primary to-rose-600 p-10 rounded-3xl text-white shadow-xl shadow-primary/20 overflow-hidden space-y-2">
        <h1 className="text-4xl font-black mb-4">
          Chào mừng trở lại, Học viên! 👋
        </h1>
        <p className="text-white/80 text-lg mb-8 max-w-lg">
          Bạn đã duy trì chuỗi học tập 5 ngày liên tiếp. Hôm nay hãy tiếp tục ôn
          tập từ vựng HSK 3 nhé!
        </p>
        <Button className="bg-white text-primary! hover:bg-slate-200 font-bold px-8 h-12 rounded-2xl!">
          Tiếp tục học
        </Button>
        <Button className="bg-rose-600 ml-2 hover:bg-primary-500 hover:text-gray-900 font-bold px-8 h-12 rounded-2xl! border-slate-50 border whitespace-nowrap">
          Làm bài test năng lực
        </Button>
        <span className="absolute right-0 top-0 opacity-10 pointer-events-none font-chinese text-[200px] leading-none font-black whitespace-nowrap">
          学习
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:grid-cols-4">
        {statis.map((item, index) => (
          <Card key={index} className="border shadow-sm">
            <CardContent className="flex items-center gap-4">
              <div className={`${item.bg} ${item.color} p-3 rounded-2xl`}>
                <item.icon />
              </div>
              <div>
                <p className="text-xs text-slate-500 ">{item.label}</p>
                <p className="text-xl font-black">{item.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black">Lộ trình của bạn</h2>
            <p className="text-sm text-primary cursor-pointer hover:underline">
              Xem tất cả
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {route.map((item, index) => (
              <Card
                key={index}
                className="border shadow-sm cursor-pointer hover:shadow-md transition-shadow k hover:text-primary"
              >
                <CardContent className="flex items-center gap-4 w-full!">
                  <div className="w-full space-y-2">
                    <div className="flex justify-between gap-4">
                      <div className={`${item.bg} text-white p-3 rounded-2xl`}>
                        <CirclePlay />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">
                          {item.percent}%
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-black">{item.label}</p>
                      <p className="text-xs text-slate-500 ">{item.value}</p>
                    </div>
                    <div className="h-2 w-full bg-rose-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-500 rounded-full transition-all"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-black space-y-4">Video gợi ý</h2>

          <div className="grid grid-cols-1 gap-4">
            {video.map((item, index) => (
              <Card
                key={index}
                className="group border shadow-sm cursor-pointer hover:shadow-md transition-shadow k hover:text-primary"
              >
                <CardContent className="flex items-center gap-4 w-full! hover:">
                  <div className="bg-gray-400 text-white py-4 px-8 rounded-2xl group-hover:bg-gray-300">
                    <CirclePlay />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-black">{item.label}</p>
                    <p className="text-xs text-slate-500 ">{item.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button className="w-full bg-white text-slate-600! shadow-none border hover:bg-slate-200">
            Xem tất cả video
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
