/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { BookA, CirclePlay, Clock, Flame, Trophy } from "lucide-react";
import Button from "../../atoms/button";
import { Card, CardContent } from "../../atoms/card";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/src/hooks/useHookReducers";
import useNotification from "@/src/hooks/useNotification";
import { useEffect, useState } from "react";
import { getLearningStats } from "@/src/services/users";
import { getGrammarSidebar } from "@/src/services/grammar";
import { getFlashcardStats } from "@/src/services/flashCardDeck";
import { getAllVideo } from "@/src/services/video";
import { IVideoItem } from "@/src/types/interface";
function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { notify } = useNotification();

  const [stats, setStats] = useState({
    totalCards: 0,
    totalCompleted: 0,
    progress: "0%",
    streak: "0 ngày",
  });

  const [stats1, setStats1] = useState({
    totalLessons: 0,
    completedLessons: 0,
    percent: 0,
  });

  const [stats2, setStats2] = useState({
    studyTime: "0 phút",
  });

  const [videos, setVideos] = useState<IVideoItem[]>([]);

  const fetchData = async () => {
    try {
      const res = await dispatch(getFlashcardStats()).unwrap();
      const res1 = await dispatch(getGrammarSidebar()).unwrap();
      const res2 = await dispatch(getLearningStats()).unwrap();
      const res3 = await dispatch(
        getAllVideo({
          page: 1,
          pageSize: 3,
        }),
      ).unwrap();

      setStats(res);
      setStats1(res1.stats);
      setStats2(res2);
      setVideos(res3.videos);
      notify("success", "Lấy dữ liệu thành công");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const statis = [
    {
      label: "Chuỗi học tập",
      value: stats.streak,
      icon: Flame,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      label: "Từ vựng đã học",
      value: `${stats.totalCompleted} từ`,
      icon: BookA,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: "Thời gian học",
      value: stats2.studyTime,
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
      link: "/vocabulary",
    },
    {
      label: "Luyện phát âm chuẩn",
      value: "Thanh điệu và ngữ điệu",
      percent: "40",
      bg: "bg-green-500",
      link: "/pronunciation",
    },
    {
      label: "Ngữ pháp HSK 3",
      value: "Các điểm ngữ pháp quan trọng",
      percent: stats1?.percent,
      bg: "bg-purple-500",
      link: "/grammar",
    },
    {
      label: "Flashcards ôn tập",
      value: "Ôn tập 50 từ vựng cũ",
      percent: Math.round((stats.totalCompleted / stats.totalCards) * 100),
      bg: "bg-orange-500",
      link: "/flashcards",
    },
  ];

  const video = [
    { label: "Giao tiếp trong nhà hàng", value: "10:25 • 1.2k lượt xem" },
    { label: "Phân biệt 的 得 地", value: "15:40• 3.4k lượt xem" },
    { label: "Từ vựng về Công nghệ", value: "08:15• 856 lượt xem" },
  ];

  const formatViews = (views: number) => {
    if (views >= 1_000_000) return (views / 1_000_000).toFixed(1) + "M";
    if (views >= 1_000) return (views / 1_000).toFixed(1) + "K";
    return views.toString();
  };

  return (
    <div className="space-y-8">
      <div className="relative bg-linear-to-r from-primary to-rose-600 p-10 rounded-3xl text-white shadow-xl shadow-primary/20 overflow-hidden space-y-2">
        <h1 className="text-4xl font-black mb-4">Chào mừng bạn trở lại! 👋</h1>
        <p className="text-white/80 text-lg mb-8 max-w-lg">
          Bạn đã duy trì chuỗi học tập {stats.streak}. Hôm nay hãy tiếp tục ôn
          tập từ vựng HSK 3 nhé!
        </p>
        <Button
          className="bg-white text-primary! hover:bg-slate-200 font-bold px-8 h-12 rounded-2xl!"
          onClick={() => router.push("/vocabulary")}
        >
          Tiếp tục học
        </Button>
        <Button
          className="bg-rose-600 ml-2 hover:bg-primary-500 font-bold px-8 h-12 rounded-2xl! border-slate-50 border whitespace-nowrap"
          onClick={() => router.push("/hsk")}
        >
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
                <CardContent
                  className="flex items-center gap-4 w-full!"
                  onClick={() => router.push(item.link)}
                >
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
            {videos.map((item, index) => (
              <Card
                key={index}
                className="group border shadow-sm cursor-pointer hover:shadow-md transition-shadow k hover:text-primary"
              >
                <CardContent
                  className="flex items-center gap-4 w-full! hover:"
                  onClick={() => router.push(`/video/${item._id}`)}
                >
                  <div
                    className="text-white py-4 px-8 rounded-2xl bg-cover bg-center relative overflow-hidden"
                    style={{ backgroundImage: `url(${item.thumbnail})` }}
                  >
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="relative">
                      <CirclePlay />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-black">{item.title}</p>
                    <p className="text-xs text-slate-500 ">
                      {formatViews(item.views)} lượt xem • HSK {item.level}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button
            className="w-full bg-white text-slate-600! shadow-none border hover:bg-slate-200"
            onClick={() => router.push("/video")}
          >
            Xem tất cả video
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
