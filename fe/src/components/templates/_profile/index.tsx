"use client";
import {
  Award,
  Bell,
  BookOpen,
  Camera,
  Mail,
  Shield,
  TrendingUp,
  User,
} from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "../../atoms/card";
import Image from "next/image";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const stats = [
    { label: "Trình độ", value: "HSK 3", icon: Award, color: "text-amber-500" },
    {
      label: "Từ vựng",
      value: "1,240",
      icon: BookOpen,
      color: "text-blue-500",
    },
    {
      label: "Ngày học",
      value: "45",
      icon: TrendingUp,
      color: "text-emerald-500",
    },
  ];

  const security = [
    {
      label: "Đổi mật khẩu",
      value: "Cập nhật mật khẩu định kỳ để bảo mật",
      icon: Shield,
    },
    {
      label: "Thông báo học tập",
      value: "Nhắc nhở học tập hàng ngày qua email",
      icon: Bell,
    },
  ];
  return (
    <div className="py-4 px-15">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="space-y-6 w-full lg:w-1/3 ">
          <Card className="border-0 shadow-lg!">
            <CardContent className="p-6 text-center space-y-4">
              <div className="relative inline-block">
                <Image
                  src="https://i.pravatar.cc/100?u=1"
                  alt="avatar"
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer h-32 w-32 border-4 border-white shadow-lg mx-auto"
                />
                <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full cursor-pointer">
                  <Camera size={16} />
                </button>
              </div>
              <h2 className="text-xl font-bold">Học viên Hanyu</h2>
              <p className="text-sm text-slate-600">Thành viên từ 01/2026</p>
            </CardContent>
          </Card>

          {stats.map((item, index) => (
            <Card key={index} className="border shadow-lg!">
              <CardContent className="flex items-center gap-4">
                <div className={` ${item.color} p-3 rounded-3xl bg-gray-100`}>
                  <item.icon size={20} />
                </div>
                <div className="text-left">
                  <p className="text-base text-slate-600 font-blod">
                    {item.label}
                  </p>
                  <p className="text-base font-black">{item.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex-1 space-y-6 w-full">
          <Card className="border-0 shadow-lg!">
            <CardContent className="p-6 text-center space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Thông tin cá nhân</h2>

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="border px-4 py-2 rounded-full text-sm cursor-pointer"
                >
                  Chỉnh sửa
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="text-left">
                  <label className="text-sm">Họ và tên</label>
                  <div className="flex bg-gray-100 px-3 py-3 rounded-2xl items-center gap-2 shadow-lg">
                    <User size={18} className="text-slate-400" />
                    <input
                      className="text-slate-500 text-sm"
                      defaultValue="Học viên Hanyu"
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                <div className="text-left">
                  <label className="text-sm">Email</label>
                  <div className="flex bg-gray-100 px-3 py-3 rounded-2xl items-center gap-2 shadow-lg">
                    <Mail size={18} className="text-slate-400" />
                    <input
                      className="text-slate-500 text-sm"
                      defaultValue="hocvien@hanyu.vn"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <div className="text-left">
                <label className="text-sm">Mục tiêu học tập</label>
                <div className=" bg-gray-100 px-3 py-3 rounded-2xl items-center gap-2 shadow-lg">
                  <input
                    className="text-slate-500 text-sm"
                    defaultValue="Chinh phục HSK 4 trong 6 tháng tới"
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg!">
            <CardContent className="p-6 space-y-4 text-left">
              <h2 className="text-xl font-bold">Bảo mật & Thông báo</h2>

              {security.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-100 p-4 rounded-2xl shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white rounded-full text-red-500">
                      <item.icon size={18} />
                    </div>

                    <div>
                      <p className="font-semibold">{item.label}</p>
                      <p className="text-sm text-slate-500">{item.value}</p>
                    </div>
                  </div>

                  {index === 0 && (
                    <button className="border px-4 py-2 rounded-full text-sm cursor-pointer">
                      Cập nhật
                    </button>
                  )}

                  {index === 1 && (
                    <div className="w-12 h-6 bg-red-500 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
