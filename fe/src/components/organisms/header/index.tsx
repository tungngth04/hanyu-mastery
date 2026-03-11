"use client";
import { Divider } from "antd";
import { BellDot, LogOut, Search, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <header className="flex items-center px-6 h-16 bg-white/80 shadow-md sticky top-0 z-50 border-b border-slate-200 backdrop-blur-md">
      <div className="relative flex-1 min-w-0 mr-2 ">
        <Search className="text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
        <input
          className="w-full bg-transparent rounded-full text-sm outline-none focus:ring-2 ring-slate-400/20 pl-10 pr-4 py-2"
          placeholder="Tìm kiếm khóa học, từ vựng, ngữ pháp..."
        />
      </div>
      <div className="flex items-center gap-4 ml-auto shrink-0">
        <BellDot className="h-6 w-6 text-slate-400 cursor-pointer" />
        <div className="bg-slate-200 h-6 w-px " />
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold ">Học viên</p>
          <p className="text-slate-500 text-xs">HSK 3</p>
        </div>
        <div className="relative">
          <Image
            src="https://i.pravatar.cc/100?u=1"
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
              Loan Vu
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

            <button className="flex items-center gap-3 px-6 py-3 w-full hover:bg-purple-400 transition rounded-b-2xl cursor-pointer">
              <LogOut size={18} />
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
