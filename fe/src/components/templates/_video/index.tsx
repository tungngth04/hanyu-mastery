"use client";
import { Bookmark, CirclePlay, Clock, Eye, TrendingUp } from "lucide-react";
import Button from "../../atoms/button";
import { useState } from "react";
import Image from "next/image";

const VideoPage = () => {
  const [activeCategory, setActiveCategory] = useState("Mới nhất");

  const categories = [
    "Mới nhất",
    "Giao tiếp cơ bản",
    "Văn hóa Trung Quốc",
    "Luyện nghe HSK",
    "Phim ảnh",
    "Bài hát",
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
    },
  ];
  return (
    <div className="space-y-8 py-10 px-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4">
        <div className="space-y-2 ">
          <h1 className="text-3xl font-black ">Học qua video</h1>
          <p className="text-slate-500">
            Học tiếng Trung sinh động qua các video tình huống, bài giảng và văn
            hóa.
          </p>
        </div>
        <div className="lg:justify-self-end">
          <button className="flex whitespace-nowrap items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-medium transition">
            <Bookmark size={16} />
            Video đã lưu
          </button>
        </div>
      </div>

      <div className="flex flex-nowrap gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((item, index) => (
          <Button
            key={index}
            className={`rounded-full! whitespace-nowrap shrink-0 px-4 py-2 text-sm ${activeCategory === item ? "bg-red-500 text-white shadow-md shadow-red-200 " : "bg-white text-gray-700! hover:bg-primary/70! border border-slate-200 shadow-none! hover:text-white!"}`}
            onClick={() => setActiveCategory(item)}
          >
            {item}
          </Button>
        ))}
      </div>

      <div className="group cursor-pointer">
        <div className="relative h-75 sm:h-100 w-full rounded-2xl overflow-hidden">
          <Image
            src={"/images/banner.jpg"}
            alt="banner"
            fill
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-6 sm:p-10 space-y-2">
            <p className="bg-primary text-white w-fit border-0 rounded-full px-4 text-sm">
              Nổi bật hôm nay
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold text-white max-w-3xl">
              Bí quyết luyện nghe tiếng Trung cho người mới bắt đầu (Từ con số
              0)
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm font-medium">
              <span className="flex items-center gap-1">
                <Clock size={16} /> 28:45
              </span>
              <span className="flex items-center gap-1">
                <Eye size={16} /> 125k lượt xem
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp size={16} /> Xu hướng
              </span>
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/80 group-hover:text-white group-hover:scale-110 transition-all">
            <CirclePlay size={80} strokeWidth={1} />
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <h3 className="text-xl font-bold">Đề xuất cho bạn</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {videos.map((item, index) => (
            <div key={index} className="w-full cursor-pointer group">
              <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
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
              </div>
              <div className="flex gap-3">
                <div className="bg-slate-200 rounded-full flex items-center justify-center text-slate-500 text-sm w-9 h-9 shrink-0">
                  {item.author.charAt(0)}
                </div>
                <div className="space-y-1">
                  <h4 className="text-slate-900 font-bold ">{item.title} </h4>
                  <p className="text-sm text-slate-500">{item.author}</p>
                  <p className="text-slate-400 text-xs">
                    {item.views} lượt xem • {item.level}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default VideoPage;
