"use client";
import Button from "@/src/components/atoms/button";
import CookieStorage from "@/src/helpers/cookies";
import LocalStorage from "@/src/helpers/local-storage";
import { useAppDispatch } from "@/src/hooks/useHookReducers";
import useNotification from "@/src/hooks/useNotification";
import { postLogin, updateUserInfor } from "@/src/services/auth";
import { loginValidate } from "@/src/types/validates";
import { Field, Form, Formik } from "formik";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoginPage from "./login";
import RegisterPage from "./register";

type LoginValues = {
  email: string;
  password: string;
};

type RegisterValues = {
  name: string;
  email: string;
  password: string;
};
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const router = useRouter();

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-2 animate-in fade-in slide-in-from-left-4 duration-700">
          <div
            className="flex items-center gap-2 font-bold text-xl text-primary cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image
              src={"/images/logo.png"}
              alt="logo.png"
              width={200}
              height={200}
            />
          </div>
          <h1 className="text-2xl font-black text-slate-950 ">
            {isLogin ? "Chào mừng trở lại!" : "Tạo tài khoản mới!"}
          </h1>
          <p className="text-sm text-slate-600">
            {isLogin
              ? "Nhập thông tin của bạn để tiếp tục hành trình chinh phục tiếng Trung."
              : "Bắt đầu hành trình học tập thông minh ngay hôm nay."}
          </p>
          {isLogin ? (
            <LoginPage />
          ) : (
            <RegisterPage onChange={() => setIsLogin(true)} />
          )}

          <div className="w-full flex justify-center mt-6">
            <p className="text-xs text-slate-500 font-black">
              HOẶC TIẾP TỤC VỚI
            </p>
          </div>

          <div className="text-center text-xs text-slate-500 font-medium mt-8">
            {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-primary hover:underline text-xs cursor-pointer"
            >
              {isLogin ? "Đăng ký ngay" : "Đăng nhập ngay"}
            </button>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-col items-center justify-center p-12 text-white relative overflow-hidden bg-linear-to-br from-purple-900 via-slate-900 to-blue-950">
        <div className="relative z-10 max-w-md text-center space-y-8">
          <h2 className="text-4xl font-black leading-tight">
            Học Tiếng Trung <br />
            <span className="text-primary italic">Thật Đơn Giản</span>
          </h2>
          <p className="text-slate-300 text-xl">
            Tham gia cùng cộng đồng 10.000+ học viên đang chinh phục HSK mỗi
            ngày.
          </p>
          <div className="grid grid-cols-2 gap-4 text-left pt-4">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <p className="text-primary font-black text-2xl mb-1">95%</p>
              <p className="text-xs font-bold text-slate-400 uppercase">
                Tỉ lệ đỗ HSK
              </p>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <p className="text-primary font-black text-2xl mb-1">1k+</p>
              <p className="text-xs font-bold text-slate-400 uppercase">
                Video bài giảng
              </p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-20 opacity-10 font-chinese text-[300px] leading-none font-black pointer-events-none">
          爱
        </div>
        <div className="absolute bottom-0 left-0 p-20 opacity-10 font-chinese text-[300px] leading-none font-black pointer-events-none">
          学
        </div>
      </div>
    </div>
  );
};
export default AuthPage;
