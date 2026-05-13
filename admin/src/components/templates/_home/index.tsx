/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { BookOpen, FileText, Users, Video } from "lucide-react";
import Button from "../../atoms/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../atoms/card";
import { StatCard } from "../../atoms/statCard";
import { useAppDispatch } from "@/src/hooks/useHookReducers";
import useNotification from "@/src/hooks/useNotification";
import { useEffect, useState } from "react";
import { getDashboardOverview, getUserGrowth } from "@/src/services/user";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

function Home() {
  const dispatch = useAppDispatch();
  const { notify } = useNotification();

  const [overview, setOverview] = useState<any>({});
  const [growth, setGrowth] = useState<any[]>([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res1 = await dispatch(getDashboardOverview()).unwrap();
        setOverview(res1);

        const res2 = await dispatch(getUserGrowth()).unwrap();
        setGrowth(res2);
      } catch {
        notify("error", "Không tải được dashboard");
      }
    };

    fetchDashboard();
  }, []);
  const chartData = growth.map((item) => ({
    date: item._id.slice(5), // lấy MM-DD cho gọn
    users: item.count,
  }));
  console.log("first", overview);
  console.log("2", growth);

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Tổng quan hệ thống
          </h2>
        </div>
        {/* <div className="flex gap-2 w-full sm:w-auto">
          <button className="bg-white flex-1 sm:flex-none border-2 p-2 px-4 rounded-2xl cursor-pointer">
            Xuất báo cáo
          </button>
        </div> */}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-4">
        <StatCard
          title="Tổng học viên"
          value={overview.totalUsers || 0}
          icon={Users}
          color="text-blue-600"
          bg="bg-blue-50"
          trend="+12%"
        />
        <StatCard
          title="Bài học Từ vựng"
          value={overview.totalVocabulary || 0}
          icon={BookOpen}
          color="text-emerald-600"
          bg="bg-emerald-50"
          trend="+5"
        />
        <StatCard
          title="Video bài giảng"
          value={overview.totalVideos || 0}
          icon={Video}
          color="text-violet-600"
          bg="bg-violet-50"
          trend="+2"
        />
        <StatCard
          title="Đề thi HSK"
          value="45"
          icon={FileText}
          color="text-amber-600"
          bg="bg-amber-50"
          trend="0"
        />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8 mt-8">
        <Card className="xl:col-span-2 border-0 shadow-sm rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-slate-50 bg-white">
            <CardTitle>Biểu đồ tăng trưởng học viên</CardTitle>
            <CardDescription>
              Số lượng học viên đăng ký mới trong 7 ngày qua
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 h-75">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="date" />
                <Tooltip />
                <Bar dataKey="users" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm rounded-2xl">
          <CardHeader className="border-b border-slate-50 bg-white">
            <CardTitle>Khóa học phổ biến</CardTitle>
            <CardDescription>Được quan tâm nhất tháng này</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-50">
              {[
                {
                  id: 1,
                  title: "HSK 1 - Tiếng Trung cơ bản",
                  students: 1240,
                  rating: 4.8,
                },
                {
                  id: 2,
                  title: "Giao tiếp văn phòng",
                  students: 850,
                  rating: 4.9,
                },
                {
                  id: 3,
                  title: "HSK 3 - Luyện thi cấp tốc",
                  students: 620,
                  rating: 4.7,
                },
              ].map((course, i) => (
                <div
                  key={course.id}
                  className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm text-slate-900 truncate">
                      {course.title}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {course.students} học viên
                    </p>
                  </div>
                  <div className="text-sm font-bold text-amber-500 flex items-center gap-1">
                    ★ {course.rating}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-slate-50">
              <Button
                variant="ghost"
                className="w-full text-primary text-sm h-8"
              >
                Xem tất cả
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default Home;
