"use client";
import { useEffect, useState } from "react";
import Button from "../../atoms/button";
import { CirclePlay, Eye, Funnel, Inbox, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "../../atoms/card";
import { useAppDispatch } from "@/src/hooks/useHookReducers";
import useNotification from "@/src/hooks/useNotification";
import { getAllVideoSave } from "@/src/services/video/video_save";
import { IVideoItem } from "@/src/types/interface";
import VideoItem from "../_video/components/_video_item";
import { Pagination } from "antd";

const SavedVideoPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { notify } = useNotification();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [activeLevel, setActiveLevel] = useState("");
  const [videos, setVideos] = useState<IVideoItem[]>([]);

  const levels = [
    "Tất cả",
    "HSK 1",
    "HSK 2",
    "HSK 3",
    "HSK 4",
    "HSK 5",
    "HSK 6",
  ];

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const result = await dispatch(
          getAllVideoSave({
            page,
            pageSize,
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
  }, [page, pageSize, activeLevel]);

  const handleChangePage = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const handleChangePageSize = (current: number, size: number) => {
    setPage(1);
    setPageSize(size);
  };

  return (
    <div className="p-10 space-y-6">
      <div className="space-y-2 ">
        <div className="flex justify-between">
          <h1 className="text-3xl font-black ">Video đã lưu</h1>

          <Button
            size="sm"
            className="gap-1 rounded-lg bg-primary hover:bg-primary/90 whitespace-nowrap inline-flex items-center"
            onClick={() => router.back()}
          >
            Quay lại
          </Button>
        </div>
        <p className="text-slate-500">
          Tổng cộng: {videos.length} video đã lưu
        </p>
      </div>

      <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
        <span className="flex justify-center items-center gap-2 text-slate-500 text-lg">
          <Funnel size={20} /> Lọc:
        </span>
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

      <div className="space-y-8">
        {videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <Inbox size={48} className="mb-4 opacity-50" />
            <p className="text-lg font-semibold">Không có video nào</p>
            <p className="text-sm">Thử chọn HSK khác hoặc tìm kiếm nhé</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {videos.map((item) => (
              <VideoItem key={item._id} video={item} footer={true} />
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
export default SavedVideoPage;
