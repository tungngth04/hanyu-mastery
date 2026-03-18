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

type LoginValues = {
  email: string;
  password: string;
};

type RegisterValues = {
  name: string;
  email: string;
  password: string;
};
const LoginPage = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { notify } = useNotification();

  const handleSubmit = async (values: LoginValues | RegisterValues) => {
    try {
      setLoading(true);
      let result;

      if (isLogin) {
        result = await dispatch(
          postLogin({
            email: values.email,
            password: values.password,
          }),
        ).unwrap();

        LocalStorage.setLocalStorage("access-token", result.accessToken);
        CookieStorage.setCookie("refresh-token", result.refreshToken);
        if (result) {
          notify("success", "Đăng nhập thành công");
        }

        router.push("/app");
      } else {
        return;
      }

      if (result?.user) {
        await dispatch(updateUserInfor(result.user));
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      notify(
        "error",
        error?.message || "Không thể đăng nhập, vui lòng thử lại sau!",
      );
    } finally {
      setLoading(false);
    }
  };

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
          <div className="mt-6">
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
              }}
              validationSchema={loginValidate()}
              onSubmit={(values) => handleSubmit(values)}
            >
              {({ errors, touched }) => (
                <Form>
                  {!isLogin && (
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm cursor-pointer">
                        Họ và tên
                      </label>
                      <div className="relative mt-2">
                        <User
                          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
                          size={16}
                        />
                        <Field
                          id="name"
                          type="text"
                          name="name"
                          placeholder="Nguyễn Văn A"
                          className="pl-10 h-12 rounded-3xl shadow-md placeholder:text-sm text-slate-800 focus:outline-none focus:border-primary focus:ring-primary/90 transition w-full border border-slate-400"
                        />
                      </div>
                      <p>{errors.name && touched.name && <>{errors.name}</>}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm cursor-pointer">
                      Email
                    </label>
                    <div className="relative mt-2">
                      <Mail
                        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
                        size={16}
                      />
                      <Field
                        id="email"
                        type="text"
                        name="email"
                        placeholder="email@example.com"
                        className="pl-10 h-12 rounded-3xl shadow-md placeholder:text-sm text-slate-800 focus:outline-none focus:border-primary focus:ring-primary/90 transition w-full border border-slate-400"
                      />
                    </div>
                    <p>
                      {errors.email && touched.email && <>{errors.email}</>}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label
                        htmlFor="password"
                        className="text-sm cursor-pointer"
                      >
                        Mật khẩu
                      </label>
                      {isLogin && (
                        <button className="text-primary text-xs font-bold hover:underline cursor-pointer">
                          Quên mật khẩu?
                        </button>
                      )}
                    </div>
                    <div className="relative mt-2">
                      <Lock
                        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 "
                        size={16}
                      />
                      <Field
                        id="password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="pl-10 pr-10 h-12 rounded-3xl shadow-md placeholder:text-sm text-slate-800 focus:outline-none focus:border-primary focus:ring-primary/90 transition w-full border border-slate-400 "
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
                      >
                        {showPassword ? (
                          <Eye size={18} />
                        ) : (
                          <EyeOff size={18} />
                        )}
                      </button>
                    </div>
                    <p>
                      {errors.password && touched.password && (
                        <>{errors.password}</>
                      )}
                    </p>
                  </div>
                  <Button
                    type="submit"
                    className="w-full text-base font-black shadow-xl shadow-primary/25 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl! mt-2"
                    icon={<ArrowRight size={16} />}
                  >
                    {isLogin ? "Đăng nhập" : " Đăng ký tài khoản"}
                  </Button>
                </Form>
              )}
            </Formik>
          </div>

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
export default LoginPage;
