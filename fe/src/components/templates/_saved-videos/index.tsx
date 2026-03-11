"use client";
import { useState } from "react";
import Button from "../../atoms/button";
import { CirclePlay, Eye, Funnel, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../../atoms/card";

const SavedVideoPage = () => {
  const [activeLevel, setActiveLevel] = useState("Tất cả");
  const router = useRouter();

  const levels = [
    "Tất cả",
    "HSK 1",
    "HSK 2",
    "HSK 3",
    "HSK 4",
    "HSK 5",
    "HSK 6",
    "Mọi cấp độ",
  ];

  const videos = [
    {
      id: 1,
      title: "100 câu giao tiếp tiếng Trung cơ bản nhất định phải biết",
      thumbnail:
        "https://images.unsplash.com/photo-1544257122-38d58c148da3?q=80&w=2938",
      duration: "15:20",
      views: "12.5k",
      level: "HSK 1",
      author: "Cô giáo Thảo",
      day: "2 ngày trước",
    },
    {
      id: 2,
      title: "Phân biệt cụm từ dễ nhầm lẫn trong HSK 3: 认为 vs 以为",
      thumbnail:
        "https://images.unsplash.com/photo-1546422401-68b01585a4a1?q=80&w=2940",
      duration: "08:45",
      views: "3.2k",
      level: "HSK 3",
      author: "Thầy Hùng",
      day: "1 tuần trước",
    },
    {
      id: 3,
      title: "Vlog: Một ngày dạo chơi Tử Cấm Thành ở Bắc Kinh",
      thumbnail:
        "https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?q=80&w=2940",
      duration: "24:15",
      views: "54k",
      level: "Mọi cấp độ",
      author: "Du học sinh Vlogs",
      day: "3 ngày trước",
    },
    {
      id: 4,
      title: "Học qua bài hát: Ánh trăng nói hộ lòng tôi (月亮代表我的心)",
      thumbnail:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2940",
      duration: "12:30",
      views: "8.9k",
      level: "HSK 2",
      author: "Music Chinese",
      day: "5 ngày trước",
    },
    {
      id: 5,
      title: "Luyện nghe thụ động HSK 4 - 50 đoạn hội thoại (Có Vietsub)",
      thumbnail:
        "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=2912",
      duration: "45:00",
      views: "22k",
      level: "HSK 4",
      author: "Hanyu Master",
      day: "1 ngày trước",
    },
    {
      id: 6,
      title: "Văn hóa trà đạo Trung Hoa: Từ vựng và cách giao tiếp",
      thumbnail:
        "https://images.unsplash.com/photo-1576092762791-dd9e2220c951?q=80&w=2940",
      duration: "18:10",
      views: "4.5k",
      level: "HSK 3",
      author: "Văn Hóa TQ",
      day: "2 tuần trước",
    },
  ];
  return (
    <div className="p-10 space-y-6">
      <div className="space-y-2 ">
        <h1 className="text-3xl font-black ">Video đã lưu</h1>
        <p className="text-slate-500">5 video • 5 tổng cộng</p>
      </div>

      <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
        <span className="flex justify-center items-center gap-2 text-slate-500 text-lg">
          <Funnel size={20} /> Lọc:
        </span>
        {levels.map((item, index) => (
          <Button
            key={index}
            className={`rounded-full! whitespace-nowrap shrink-0 px-4 py-2 text-sm ${activeLevel === item ? "bg-red-500 text-white shadow-md shadow-red-200 " : "bg-white text-gray-700! hover:bg-primary/70! border border-slate-200 shadow-none! hover:text-white!"}`}
            onClick={() => setActiveLevel(item)}
          >
            {item}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {videos.map((item, index) => (
          <Card
            key={index}
            className="group overflow-hidden hover:shadow-lg transition"
          >
            <CardContent className="p-0!">
              <div className="relative aspect-video rounded-t-xl overflow-hidden">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  fill
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-2 right-2 bg-slate-900 text-white text-xs font-semibold px-2 py-1 rounded-xl">
                  {item.duration}
                </div>
                <div className="absolute w-full h-full text-white bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                  <CirclePlay size={48} />
                </div>
                <div className="h-1 w-full bg-slate-200 absolute bottom-0">
                  <div className="h-full bg-red-500 w-[65%]"></div>
                </div>
              </div>

              <div className="space-y-2 px-3 py-3">
                <h4 className="text-slate-900 font-bold ">{item.title} </h4>
                <p className="text-sm text-slate-500">{item.author}</p>
                <p className="bg-blue-100 hover:bg-blue-200 text-blue-600 py-0.5 px-4 rounded-full text-xs font-semibold w-fit">
                  {item.level}
                </p>
                <p className="text-slate-400 text-xs flex items-center gap-1">
                  <Eye size={16} />
                  {item.views} lượt xem • {item.day}
                </p>
                <div className="flex gap-2 pt-2">
                  <Button
                    className="flex-1 rounded-full! p-0! text-sm!"
                    onClick={() => router.push(`/video/${item.id}`)}
                  >
                    Xem tiếp
                  </Button>
                  <button className="w-12 h-8 border border-red-400 text-red-500 rounded-full flex items-center justify-center hover:bg-red-50">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default SavedVideoPage;
