/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Award,
  ChartNoAxesColumnIncreasing,
  CircleCheck,
  Clock,
  FileText,
} from "lucide-react";
import Button from "../../atoms/button";
import { Card, CardContent } from "../../atoms/card";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/src/hooks/useHookReducers";
import { getAllHSKExam } from "@/src/services/hsk";
import { useQueryParams } from "@/src/hooks/useQueryParams";
import useNotification from "@/src/hooks/useNotification";
import { useRouter } from "next/navigation";
import { Pagination } from "antd";

const HSKPage = () => {
  const dispatch = useAppDispatch();
  const { searchParams, setQuery } = useQueryParams();
  const { notify } = useNotification();
  const router = useRouter();

  const [level, setLevel] = useState<string>("Tất cả");
  const [exams, setExams] = useState<any[]>([]);

  const page = Number(searchParams.get("page") || 1);
  const pageSize = Number(searchParams.get("pageSize") || 12);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await dispatch(
          getAllHSKExam({
            page,
            pageSize,
            level: levelNumber,
          }),
        ).unwrap();
        setExams(res.exams);
        setTotal(res.totalResults);
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  }, [dispatch, page, pageSize, level]);

  const levels = [
    "Tất cả",
    "HSK 1",
    "HSK 2",
    "HSK 3",
    "HSK 4",
    "HSK 5",
    "HSK 6",
  ];

  const levelNumber =
    level === "Tất cả" ? undefined : Number(level.replace("HSK ", ""));
  const statis = [
    {
      label: "15+ Đề thi mỗi cấp",
      value: "Đầy đủ các phần Nghe, Đọc, Viết",
      icon: FileText,
      color: "text-blue-500",
      bg: "bg-blue-50!",
      bgicon: "bg-blue-100",
    },
    {
      label: "Chấm điểm tự động",
      value: "Biết kết quả ngay sau khi nộp bài",
      icon: CircleCheck,
      color: "text-green-500",
      bg: "bg-green-50!",
      bgicon: "bg-green-100",
    },
    {
      label: "Phân tích chi tiết",
      value: "Chỉ ra điểm yếu cần khắc phục",
      icon: ChartNoAxesColumnIncreasing,
      color: "text-purple-500",
      bg: "bg-purple-50!",
      bgicon: "bg-purple-100",
    },
  ];

  const handleChangePage = (page: number, pageSize: number) => {
    setQuery({
      page,
      pageSize,
    });
  };

  const handleChangePageSize = (_: number, pageSize: number) => {
    setQuery({
      page: 1,
      pageSize,
    });
  };

  return (
    <div className="py-10 px-10 space-y-8">
      <div className="relative bg-linear-to-r from-slate-900 to-rose-950 p-10 rounded-3xl text-white shadow-xl shadow-slate-900/20 overflow-hidden space-y-2">
        <span className="bg-amber-500 hover:bg-amber-600 text-white py-0.5 px-4 rounded-full">
          Luyện thi chứng chỉ
        </span>
        <h1 className="text-4xl font-black mb-4 mt-4">Luyện thi HSK</h1>
        <p className="text-white/80 text-lg mb-8 max-w-3xl">
          Đánh giá năng lực chuẩn xác với các đề thi mô phỏng thực tế. Cấu trúc
          bài thi cập nhật mới nhất theo chuẩn Hanban.
        </p>
        <a href="#level">
          <Button className="bg-white text-gray-800! hover:bg-slate-200 font-bold! px-8 h-12 rounded-2xl! text-lg">
            Làm bài test năng lực
          </Button>
        </a>
        <span className="absolute right-20 top-1/2 -translate-y-1/2  opacity-10 pointer-events-none hidden md:block">
          <Award size={250} />
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3">
        {statis.map((item, index) => (
          <Card key={index} className={`border shadow-sm ${item.bg}`}>
            <CardContent className="items-center gap-4 text-center flex flex-col">
              <div
                className={`${item.bgicon} ${item.color} p-3 rounded-full w-16 h-16 shrink-0 flex items-center justify-center`}
              >
                <item.icon />
              </div>
              <p className="text-xl font-black">{item.label}</p>
              <p className="text-lg text-slate-500 ">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div id="level" className="flex justify-between">
        <h1 className="text-2xl font-bold">Chọn cấp độ</h1>
        <div className="border border-slate-200 rounded-full py-1 px-2">
          {levels.map((item, index) => (
            <button
              key={index}
              onClick={() => setLevel(item)}
              className={`px-4 py-1.5 text-sm rounded-full cursor-pointer ${
                level === item
                  ? "bg-red-500 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div>
        <Card>
          <CardContent className="flex justify-between">
            <div className="space-y-2">
              <h3 className="font-bold text-xl">Mục tiêu HSK 3 của bạn</h3>
              <p className="text-slate-500 text-base">Cần 180/300 điểm để đỗ</p>
            </div>
            <div className="w-1/3 space-y-2">
              <div className="flex justify-between">
                <p className="text-lg font-bold text-slate-600">
                  Tiến độ luyện đề
                </p>
                <p className="text-primary text-lg font-bold">0/{total} đề</p>
              </div>
              <div className="bg-rose-200 h-3 w-full rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-l-2xl transition-all"
                  style={{ width: "20%" }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {exams.map((num, index) => (
          <Card key={index}>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">{num.title}</h3>
                <span
                  className={`py-0.5 px-4 rounded-full text-sm ${num <= 2 ? "bg-green-100 text-green-800" : num === 3 ? "text-orange-600" : "bg-slate-200 text-slate-700"}`}
                >
                  {num <= 2 ? "Đã làm" : num === 3 ? "Đang làm" : "Chưa làm"}
                </span>
              </div>

              <div className="flex items-center gap-4 text-sm text-slate-600">
                <span className="flex items-center gap-1">
                  <Clock size={14} /> 90 phút
                </span>
                <span className="flex items-center gap-1">
                  <FileText size={14} /> 80 câu
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-base">
                {num.sections.map((section: any, idx: number) => (
                  <div key={idx} className="p-2 bg-slate-50 rounded-xl">
                    <p className="text-slate-400">{section.name}</p>
                    <p className="font-bold">0/{section.totalQuestions}</p>
                  </div>
                ))}
              </div>

              {num <= 2 ? (
                <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-semibold">
                      Điểm số
                    </p>
                    <p className="font-bold text-slate-900 text-lg">
                      245
                      <span className="text-slate-400 text-sm font-normal">
                        /300
                      </span>
                    </p>
                  </div>
                  <button className="border rounded-full py-2 px-4 text-slate-700">
                    Xem chi tiết
                  </button>
                </div>
              ) : (
                <Button
                  className="w-full rounded-xl!"
                  onClick={() => router.push(`/hsk/${num._id}`)}
                >
                  {num === 3 ? "Tiếp tục làm bài" : "Bắt đầu làm bài"}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <Pagination
        align="end"
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
export default HSKPage;
