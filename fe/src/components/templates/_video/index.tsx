"use client";
import {
  Bookmark,
  CirclePlay,
  Clock,
  Eye,
  Inbox,
  TrendingUp,
} from "lucide-react";
import Button from "../../atoms/button";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/src/hooks/useHookReducers";
import useNotification from "@/src/hooks/useNotification";
import { getAllVideo } from "@/src/services/video/inedx";
import { IVideoItem } from "@/src/types/interface";
import { Pagination } from "antd";
import VideoItem from "./components/_video_item";

const VideoPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { notify } = useNotification();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState("");
  const [activeLevel, setActiveLevel] = useState("");
  const [videos, setVideos] = useState<IVideoItem[]>([]);
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const result = await dispatch(
          getAllVideo({
            page,
            pageSize,
            search,
            level: activeLevel,
          }),
        ).unwrap();
        if (isMounted && result) {
          setVideos(result.videos);
          setTotal(result.totalResults);
          notify("success", "Lấy dữ liệu thành công");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [page, pageSize, search, activeLevel]);

  const handleChangePage = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const handleChangePageSize = (current: number, size: number) => {
    setPage(1);
    setPageSize(size);
  };

  const levels = [
    "Tất cả",
    "HSK 1",
    "HSK 2",
    "HSK 3",
    "HSK 4",
    "HSK 5",
    "HSK 6",
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
          <button
            className="flex whitespace-nowrap items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-sm font-medium transition cursor-pointer"
            onClick={() => router.push("/saved-videos")}
          >
            <Bookmark size={16} />
            Video đã lưu
          </button>
        </div>
      </div>

      <div className="flex flex-nowrap gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {levels.map((item, index) => (
          <Button
            key={index}
            className={`rounded-full! whitespace-nowrap shrink-0 px-4 py-2 text-sm ${
              activeLevel === (index === 0 ? "" : String(index))
                ? "bg-red-500 text-white shadow-md shadow-red-200 "
                : "bg-white text-gray-700! hover:bg-primary/70! border border-slate-200 shadow-none! hover:text-white!"
            }`}
            onClick={() => setActiveLevel(index === 0 ? "" : String(index))}
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
        {videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <Inbox size={48} className="mb-4 opacity-50" />
            <p className="text-lg font-semibold">Không có video nào</p>
            <p className="text-sm">Thử chọn HSK khác hoặc tìm kiếm nhé</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
            {videos.map((item) => (
              <VideoItem key={item._id} video={item} />
            ))}
          </div>
        )}
      </div>
      <Pagination
        className="mt-4 flex justify-end"
        current={page}
        pageSize={pageSize}
        total={total}
        showSizeChanger
        onChange={handleChangePage}
        onShowSizeChange={handleChangePageSize}
      />
    </div>
  );
};
export default VideoPage;
