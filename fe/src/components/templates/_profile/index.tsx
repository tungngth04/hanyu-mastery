"use client";
import {
  Award,
  Bell,
  BookOpen,
  Camera,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  TrendingUp,
  User,
} from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "../../atoms/card";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/src/hooks/useHookReducers";
import DialogComponent from "../../atoms/dialog";
import useNotification from "@/src/hooks/useNotification";
import {
  changePassword,
  updateNotification,
  updateProfile,
} from "@/src/services/users";
import { Field, Form, Formik } from "formik";
import { changePasswordValidate, profileValidate } from "@/src/types/validates";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { userInfor } = useAppSelector((state) => state.auth);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useAppDispatch();
  const { notify } = useNotification();
  console.log("first", userInfor);

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

  const handleToggleNotification = async () => {
    if (!userInfor) return;

    try {
      const newValue = !userInfor.notification;

      const result = await dispatch(updateNotification(newValue)).unwrap();
      if (result) {
        notify("success", "Bật tắt thống báo học tập thành công");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="py-4 px-30">
        <div className="flex flex-col xl:flex-row gap-8 items-start">
          <div className="space-y-6 w-full xl:w-1/3 ">
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
                  <button
                    className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full cursor-pointer"
                    onClick={() => setModalOpen(true)}
                  >
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
                    onClick={() => {
                      setModalOpen(true);
                      setIsEditing(false);
                    }}
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
                        value={userInfor?.fullName || ""}
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
                        value={userInfor?.email || ""}
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
                      value={userInfor?.learningGoal || ""}
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
                      <button
                        className="border px-4 py-2 rounded-full text-sm cursor-pointer"
                        onClick={() => {
                          setModalOpen(true);
                          setIsEditing(true);
                        }}
                      >
                        Cập nhật
                      </button>
                    )}

                    {index === 1 && (
                      <div
                        onClick={handleToggleNotification}
                        className={`w-12 h-6 rounded-full relative cursor-pointer transition ${
                          userInfor?.notification
                            ? "bg-green-500"
                            : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                            userInfor?.notification ? "right-1" : "left-1"
                          }`}
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <DialogComponent
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        submitFormId="profileForm"
      >
        <Formik
          initialValues={
            isEditing
              ? {
                  oldPassword: "",
                  newPassword: "",
                  confirmPassword: "",
                }
              : {
                  fullName: userInfor?.fullName || "",
                  email: userInfor?.email || "",
                  learningGoal: userInfor?.learningGoal || "",
                }
          }
          validationSchema={
            isEditing ? changePasswordValidate() : profileValidate()
          }
          enableReinitialize
          onSubmit={async (values) => {
            try {
              if (!isEditing) {
                const result = await dispatch(updateProfile(values)).unwrap();

                notify("success", "Cập nhật hồ sơ thành công");
              } else {
                const passwordValues = values as {
                  oldPassword: string;
                  newPassword: string;
                  confirmPassword: string;
                };

                await dispatch(changePassword(passwordValues)).unwrap();
                notify("success", "Đổi mật khẩu thành công");
              }

              setModalOpen(false);
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (err: any) {
              notify("error", err?.message || "Có lỗi xảy ra");
            }
          }}
        >
          {({ errors, touched }) => (
            <Form id="profileForm">
              <div className="text-center">
                <h2 className="text-xl font-bold">
                  {isEditing ? "Đổi mật khẩu" : "Chỉnh sửa hồ sơ"}
                </h2>
                <p className="text-slate-600">
                  {isEditing
                    ? "Đổi mật khẩu tài khoản của bạn tại đây."
                    : "Cập nhật thông tin cá nhân của bạn tại đây."}
                </p>

                {!isEditing && (
                  <div className="relative inline-block mt-4">
                    <Image
                      src="https://i.pravatar.cc/100?u=1"
                      alt="avatar"
                      width={80}
                      height={80}
                      className="rounded-full h-28 w-28 mx-auto"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-4 mt-6">
                {!isEditing && (
                  <>
                    <div className="space-y-2">
                      <label
                        htmlFor="fullName"
                        className="text-sm cursor-pointer"
                      >
                        Họ và tên
                      </label>

                      <div className="relative mt-2">
                        <User
                          className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
                          size={16}
                        />

                        <Field
                          id="fullName"
                          name="fullName"
                          type="text"
                          placeholder="Nhập họ tên"
                          className="pl-10 h-12 rounded-3xl shadow-md text-sm outline-none w-full border border-slate-300"
                        />
                      </div>

                      <p className="text-red-500 text-sm mt-1">
                        {errors.fullName && touched.fullName && (
                          <>{errors.fullName}</>
                        )}
                      </p>
                    </div>

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
                          name="email"
                          type="text"
                          placeholder="email@example.com"
                          className="pl-10 h-12 rounded-3xl shadow-md text-sm text-slate-800 outline-none w-full border border-slate-300 focus:border-primary"
                        />
                      </div>

                      <p className="text-red-500 text-sm mt-1">
                        {errors.email && touched.email && <>{errors.email}</>}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="learningGoal"
                        className="text-sm cursor-pointer"
                      >
                        Mục tiêu học tập
                      </label>

                      <Field
                        id="learningGoal"
                        name="learningGoal"
                        type="text"
                        placeholder="Ví dụ: HSK4 trong 6 tháng"
                        className="h-12 px-3 rounded-3xl shadow-md text-sm outline-none w-full border border-slate-300 mt-2"
                      />

                      <p className="text-red-500 text-sm mt-1">
                        {errors.learningGoal && touched.learningGoal && (
                          <>{errors.learningGoal}</>
                        )}
                      </p>
                    </div>
                  </>
                )}

                {isEditing && (
                  <>
                    <div className="space-y-2">
                      <label
                        htmlFor="oldPassword"
                        className="text-sm cursor-pointer"
                      >
                        Mật khẩu cũ
                      </label>

                      <div className="relative mt-2">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

                        <Field
                          id="oldPassword"
                          name="oldPassword"
                          type={showOldPassword ? "text" : "password"}
                          className={`pl-10 pr-10 h-12 rounded-3xl shadow-md text-sm outline-none w-full border ${
                            errors.oldPassword && touched.oldPassword
                              ? "border-red-500"
                              : "border-slate-300"
                          }`}
                        />

                        <button
                          type="button"
                          onClick={() => setShowOldPassword(!showOldPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
                        >
                          {showOldPassword ? (
                            <Eye size={18} />
                          ) : (
                            <EyeOff size={18} />
                          )}
                        </button>
                      </div>

                      <p className="text-red-500 text-sm mt-1">
                        {errors.oldPassword &&
                          touched.oldPassword &&
                          errors.oldPassword}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="newPassword"
                        className="text-sm cursor-pointer"
                      >
                        Mật khẩu mới
                      </label>

                      <div className="relative mt-2">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

                        <Field
                          id="newPassword"
                          name="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          className={`pl-10 pr-10 h-12 rounded-3xl shadow-md text-sm outline-none w-full border ${
                            errors.newPassword && touched.newPassword
                              ? "border-red-500"
                              : "border-slate-300"
                          }`}
                        />

                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
                        >
                          {showNewPassword ? (
                            <Eye size={18} />
                          ) : (
                            <EyeOff size={18} />
                          )}
                        </button>
                      </div>

                      <p className="text-red-500 text-sm mt-1">
                        {errors.newPassword &&
                          touched.newPassword &&
                          errors.newPassword}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="confirmPassword"
                        className="text-sm cursor-pointer"
                      >
                        Nhập lại mật khẩu
                      </label>

                      <div className="relative mt-2">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

                        <Field
                          id="confirmPassword"
                          name="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          className={`pl-10 pr-10 h-12 rounded-3xl shadow-md text-sm outline-none w-full border ${
                            errors.confirmPassword && touched.confirmPassword
                              ? "border-red-500"
                              : "border-slate-300"
                          }`}
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
                        >
                          {showConfirmPassword ? (
                            <Eye size={18} />
                          ) : (
                            <EyeOff size={18} />
                          )}
                        </button>
                      </div>

                      <p className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword &&
                          touched.confirmPassword &&
                          errors.confirmPassword}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </DialogComponent>
    </>
  );
};
export default ProfilePage;
