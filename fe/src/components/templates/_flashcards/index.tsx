"use client";
import { useState } from "react";
import { Card, CardContent } from "../../atoms/card";
import Button from "../../atoms/button";
import {
  BookOpen,
  CircleCheck,
  Clock,
  Play,
  Search,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";

function FlashcardsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLevel, setActiveLevel] = useState("Tất cả");
  const router = useRouter();

  const decks = [
    {
      id: 1,
      title: "Ôn tập HSK 4 - Cấp tốc",
      topic: "Công việc & Xã hội",
      level: "HSK 4",
      cards: 25,
      completed: 18,
      lastStudied: "Hôm nay",
      color: "from-blue-500 to-cyan-500",
      icon: "💼",
    },
    {
      id: 2,
      title: "Từ vựng Du lịch - Tây Tạng",
      topic: "Du lịch & Văn hóa",
      level: "HSK 3",
      cards: 30,
      completed: 12,
      lastStudied: "2 ngày trước",
      color: "from-orange-500 to-red-500",
      icon: "✈️",
    },
    {
      id: 3,
      title: "Giao tiếp Nhà hàng",
      topic: "Ăn uống & Giao tiếp",
      level: "HSK 2",
      cards: 20,
      completed: 20,
      lastStudied: "1 tuần trước",
      color: "from-emerald-500 to-green-500",
      icon: "🍜",
    },
    {
      id: 4,
      title: "Từ vựng Học tập",
      topic: "Giáo dục",
      level: "HSK 3",
      cards: 28,
      completed: 5,
      lastStudied: "Chưa học",
      color: "from-purple-500 to-pink-500",
      icon: "📚",
    },
    {
      id: 5,
      title: "Cụm từ Thương mại",
      topic: "Kinh tế & Thương mại",
      level: "HSK 5",
      cards: 35,
      completed: 8,
      lastStudied: "3 ngày trước",
      color: "from-indigo-500 to-blue-500",
      icon: "💰",
    },
    {
      id: 6,
      title: "Thành ngữ Cổ điển",
      topic: "Văn hóa & Thành ngữ",
      level: "HSK 6",
      cards: 40,
      completed: 0,
      lastStudied: "Chưa học",
      color: "from-amber-500 to-orange-500",
      icon: "🎋",
    },
  ];

  const levels = [
    "Tất cả",
    "HSK 1",
    "HSK 2",
    "HSK 3",
    "HSK 4",
    "HSK 5",
    "HSK 6",
  ];

  const statis = [
    {
      label: "Tổng thẻ",
      value: "178",
      icon: BookOpen,
      color: "text-blue-500",
      bg: "bg-blue-50!",
      bgicon: "bg-blue-100",
    },
    {
      label: "Đã thuộc",
      value: "63",
      icon: CircleCheck,
      color: "text-green-500",
      bg: "bg-green-50!",
      bgicon: "bg-green-100",
    },
    {
      label: "Tiến độ",
      value: "35%",
      icon: TrendingUp,
      color: "text-purple-500",
      bg: "bg-purple-50!",
      bgicon: "bg-purple-100",
    },
    {
      label: "Chuỗi học",
      value: "5 ngày liên tục",
      icon: Zap,
      color: "text-yellow-500",
      bg: "bg-yellow-50!",
      bgicon: "bg-yellow-100",
    },
  ];

  const filteredDecks = decks.filter((deck) => {
    const matchesSearch =
      deck.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deck.topic.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = activeLevel === "Tất cả" || deck.level === activeLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <>
      <div className="space-y-8 py-10 px-20">
        <div>
          <h1 className="font-black text-2xl">Flashcards</h1>
          <p className="text-slate-500 ">
            Luyện tập từ vựng với thẻ ghi nhớ thông minh. Chọn bộ để bắt đầu ôn
            tập.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-4">
          {statis.map((item, index) => (
            <Card key={index} className={`border shadow-sm ${item.bg}`}>
              <CardContent className="igap-4 text-center flex justify-between items-start">
                <div className="text-left">
                  <p className="text-base text-slate-500 ">{item.label}</p>
                  <p className="text-xl font-black ">{item.value}</p>
                </div>
                <div
                  className={`${item.bgicon} ${item.color} p-3 rounded-full w-10 h-10 shrink-0 flex items-center justify-center`}
                >
                  <item.icon />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm bộ flashcard..."
            className="pl-9 w-full pr-4 py-3 bg-white rounded-2xl! border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDecks.map((item, index) => (
            <Card
              key={index}
              className="group overflow-hidden border border-slate-200 rounded-2xl! hover:shadow-xl! shadow-lg! transition-all cursor-pointer  slide-left delay-100"
            >
              <CardContent className="p-0 relative">
                <div
                  className={`absolute top-0 left-0 w-full px-4 py-6 h-32 bg-linear-to-br ${item.color} border-b border-slate-200 text-white flex flex-col gap-4`}
                >
                  <div className="text-4xl">{item.icon}</div>
                  <h3 className="font-bold text-lg group-hover:translate-x-1 transition-transform">
                    {item.title}
                  </h3>
                </div>
                <div className="pt-30 space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm border border-black px-2 py-0.5 rounded-full font-medium">
                      {item.level}
                    </span>
                    <span className="text-sm text-slate-500 font-medium">
                      {item.topic}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 justify-between">
                    <p className="text-sm text-slate-700 font-medium">
                      Tiến độ
                    </p>
                    <p className="text-sm text-primary font-bold">
                      {item.completed}/{item.cards}
                    </p>
                  </div>

                  <div className="bg-rose-200 h-3 w-full rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500 rounded-l-2xl transition-all"
                      style={{
                        width: `${(item.completed / item.cards) * 100}%`,
                      }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between border-t pt-2 border-slate-100">
                    <p className="text-xs text-slate-500">
                      <Clock size={12} className="inline mr-1" />
                      Học lần cuối: {item.lastStudied}
                    </p>
                    <Button
                      size="sm"
                      className="gap-1 rounded-lg bg-primary hover:bg-primary/90 whitespace-nowrap inline-flex items-center"
                      onClick={() => router.push(`/flashcards/${item.id}`)}
                    >
                      <Play size={14} /> Học
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
export default FlashcardsPage;
