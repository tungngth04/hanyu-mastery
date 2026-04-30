"use client";
import { useAppDispatch, useAppSelector } from "@/src/hooks/useHookReducers";
import useNotification from "@/src/hooks/useNotification";
import { clearAuth } from "@/src/services/auth";
import { Divider } from "antd";
import {
  Bell,
  BellDot,
  Bookmark,
  LogOut,
  Menu,
  Search,
  User,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../../atoms/button";

type HeaderProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
};

const Header = ({ sidebarOpen, setSidebarOpen }: HeaderProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { notify } = useNotification();

  const { userInfor } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(clearAuth());
    router.push("/");
    notify("success", "Đăng xuất thành công");
  };
  const avatar =
    userInfor?.avatar && userInfor.avatar !== "null"
      ? userInfor.avatar
      : "https://i.pravatar.cc/100";
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 z-10 shrink-0">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-slate-500 hover:bg-slate-100 hidden md:flex p-2 rounded-xl transition cursor-pointer"
        >
          <Menu size={20} />
        </button>

        <div className="relative hidden sm:block w-64">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={16}
          />
          <input
            placeholder="Tìm kiếm..."
            className="pl-9 bg-slate-50 border-transparent rounded-full h-9 focus-visible:ring-primary/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <button className="text-slate-500 relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>
        </button>
        <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-bold text-slate-900 leading-none">
              Admin User
            </p>
            <p className="text-xs text-slate-500">Quản trị viên</p>
          </div>
          <div className="relative">
            <Image
              src={avatar}
              alt="avatar"
              width={40}
              height={40}
              onClick={() => setOpen(!open)}
              className="rounded-full cursor-pointer"
            />

            <div
              className={`absolute -right-3 mt-5 w-56 bg-purple-300 text-white rounded-2xl shadow-lg transition-all duration-800 ${
                open
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3 pointer-events-none"
              }`}
            >
              <div className="absolute -top-2 right-6 w-4 h-4 bg-purple-300 rotate-45"></div>
              <div className="pt-4 pb-2 font-semibold text-center text-lg">
                {userInfor?.fullName}
              </div>

              <div className="px-6">
                <Divider style={{ margin: 0, borderColor: "white" }} />
              </div>

              <button
                className="flex items-center gap-3 px-6 py-3 w-full hover:bg-purple-400 transition cursor-pointer"
                onClick={() => router.push("/profile")}
              >
                <User size={18} />
                Hồ sơ cá nhân
              </button>

              <div className="px-6">
                <Divider style={{ margin: 0, borderColor: "white" }} />
              </div>

              <div className="px-6">
                <Divider style={{ margin: 0, borderColor: "white" }} />
              </div>

              <button
                className="flex items-center gap-3 px-6 py-3 w-full hover:bg-purple-400 transition rounded-b-2xl cursor-pointer"
                onClick={() => handleLogout()}
              >
                <LogOut size={18} />
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
