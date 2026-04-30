"use client";
import Button from "@/src/components/atoms/button";
import CookieStorage from "@/src/helpers/cookies";
import LocalStorage from "@/src/helpers/local-storage";
import { useAppDispatch } from "@/src/hooks/useHookReducers";
import useNotification from "@/src/hooks/useNotification";
import { postLogin, updateUserInfor } from "@/src/services/auth";
import { loginValidate } from "@/src/types/validates";
import { Field, Form, Formik } from "formik";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LoginValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { notify } = useNotification();

  const handleSubmit = async (values: LoginValues) => {
    try {
      setLoading(true);

      const result = await dispatch(
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
              <p className="text-red-500 text-sm mt-1">
                {errors.email && touched.email && <>{errors.email}</>}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm cursor-pointer">
                  Mật khẩu
                </label>
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
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              <p className="text-red-500 text-sm mt-1">
                {errors.password && touched.password && <>{errors.password}</>}
              </p>
            </div>
            <Button
              type="submit"
              className="w-full text-base font-black shadow-xl shadow-primary/25 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl! mt-2"
              icon={<ArrowRight size={16} />}
            >
              Đăng nhập
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default LoginPage;
