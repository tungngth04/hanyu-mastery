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
function Home() {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Tổng quan hệ thống
          </h2>
          <p className="text-slate-500 mt-1">
            Xin chào, đây là tình hình hoạt động hôm nay.
          </p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="bg-white flex-1 sm:flex-none border-2 p-2 px-4 rounded-2xl cursor-pointer">
            Xuất báo cáo
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Tổng học viên"
          value="12,450"
          icon={Users}
          color="text-blue-600"
          bg="bg-blue-50"
          trend="+12%"
        />
        <StatCard
          title="Bài học Từ vựng"
          value="450"
          icon={BookOpen}
          color="text-emerald-600"
          bg="bg-emerald-50"
          trend="+5"
        />
        <StatCard
          title="Video bài giảng"
          value="128"
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
          <CardContent className="p-6 h-75 flex items-end justify-between gap-2 pb-0">
            {[40, 70, 45, 90, 65, 85, 120].map((height, i) => (
              <div
                key={i}
                className="w-full flex flex-col items-center gap-2 group"
              >
                <div className="w-full bg-slate-100 rounded-t-lg relative h-62.5 flex items-end">
                  <div
                    className="w-full bg-primary/80 group-hover:bg-primary transition-colors rounded-t-lg"
                    style={{ height: `${height}%` }}
                  ></div>
                </div>
                <span className="text-xs text-slate-400 font-medium mb-2">
                  T{i + 2}
                </span>
              </div>
            ))}
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
