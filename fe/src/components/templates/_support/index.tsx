"use client";
import { Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import { Card, CardContent } from "../../atoms/card";
import Button from "../../atoms/button";
import { Field, Form, Formik } from "formik";
import { supportValidate } from "@/src/types/validates";
import { useAppDispatch } from "@/src/hooks/useHookReducers";
import useNotification from "@/src/hooks/useNotification";
import { useState } from "react";
import { createSupport } from "@/src/services/support";

type SupportValues = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
};

const SupportPage = () => {
  const dispatch = useAppDispatch();
  const { notify } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);

  const connect = [
    {
      label: "EMAIL",
      info: "support@hanyumastery.vn",
      icon: Mail,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: "LIVE CHAT",
      info: "Hỗ trợ 24/7",
      icon: MessageSquare,
      color: "text-green-500",
      bg: "bg-green-50",
    },
    {
      label: "HOTLINE",
      info: "1900 1234",
      icon: Phone,
      color: "text-yellow-500",
      bg: "bg-yellow-50",
    },
    {
      label: "VĂN PHÒNG",
      info: "Cầu Giấy, Hà Nội",
      icon: MapPin,
      bg: "bg-rose-50",
      color: "text-rose-500",
    },
  ];

  const handleSubmit = async (values: SupportValues, resetForm: () => void) => {
    try {
      setLoading(true);

      const result = await dispatch(createSupport(values)).unwrap();

      if (result) {
        notify("success", "Gửi yêu cầu hỗ trợ thành công");
        resetForm();
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      notify(
        "error",
        error?.message || "Gửi yêu cầu hỗ trợ thất bại, vui lòng thử lại!",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="text-center space-y-8 p-10 max-w-7xl mx-auto">
      <h1 className="font-black text-4xl">Trung tâm Hỗ trợ</h1>
      <p className="text-xl text-slate-500">
        Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi vấn đề của bạn.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6 lg:col-span-1">
          {connect.map((item, index) => (
            <Card key={index} className="border shadow-sm">
              <CardContent className="flex items-center gap-4">
                <div className={`${item.bg} ${item.color} p-3 rounded-3xl`}>
                  <item.icon size={16} />
                </div>
                <div className="text-left">
                  <p className="text-sm text-slate-600 font-bold">
                    {item.label}
                  </p>
                  <p className="text-sm font-black break-all">{item.info}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="space-y-6 lg:col-span-2">
          <Card className="border shadow-sm">
            <CardContent className="flex gap-4 text-left flex-col">
              <h2 className="font-black text-xl">Gửi yêu cầu hỗ trợ</h2>

              <div className="mt-6">
                <Formik
                  initialValues={{
                    fullName: "",
                    email: "",
                    subject: "",
                    message: "",
                  }}
                  validationSchema={supportValidate}
                  onSubmit={(values, { resetForm }) =>
                    handleSubmit(values, resetForm)
                  }
                >
                  {({ errors, touched }) => (
                    <Form className="space-y-5">
                      <div className="flex gap-6">
                        <div className="space-y-2 flex-1">
                          <label
                            htmlFor="fullName"
                            className="text-sm cursor-pointer"
                          >
                            Họ và tên
                          </label>
                          <div>
                            <Field
                              id="fullName"
                              type="text"
                              name="fullName"
                              placeholder="Nguyễn Văn A"
                              className="pl-2 h-12 rounded-2xl placeholder:text-sm text-slate-800 focus:outline-none focus:border-primary focus:ring-primary/90 transition w-full border border-slate-200 shadow-md"
                            />
                          </div>
                          <p>
                            {errors.fullName && touched.fullName && (
                              <>{errors.fullName}</>
                            )}
                          </p>
                        </div>

                        <div className="space-y-2 flex-1">
                          <label
                            htmlFor="email"
                            className="text-sm cursor-pointer"
                          >
                            Email
                          </label>
                          <div>
                            <Field
                              id="email"
                              type="text"
                              name="email"
                              placeholder="email@example.com"
                              className="pl-2 h-12 rounded-2xl placeholder:text-sm text-slate-800 focus:outline-none focus:border-primary focus:ring-primary/90 transition w-full border border-slate-200 shadow-md"
                            />
                          </div>
                          <p>
                            {errors.email && touched.email && (
                              <>{errors.email}</>
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label
                            htmlFor="subject"
                            className="text-sm cursor-pointer"
                          >
                            Vấn đề cần hỗ trợ
                          </label>
                        </div>
                        <div>
                          <Field
                            id="subject"
                            type="text"
                            name="subject"
                            placeholder="Ví dụ: Lỗi thanh toán gói Premium"
                            className="pl-2 pr-10 h-12 rounded-2xl placeholder:text-sm text-slate-800 focus:outline-none focus:border-primary focus:ring-primary/90 transition w-full border border-slate-200 shadow-md"
                          />
                        </div>
                        <p>
                          {errors.subject && touched.subject && (
                            <>{errors.subject}</>
                          )}
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label
                            htmlFor="message"
                            className="text-sm cursor-pointer"
                          >
                            Nội dung chi tiết
                          </label>
                        </div>
                        <div>
                          <Field
                            id="message"
                            as="textarea"
                            name="message"
                            placeholder="Mô tả kỹ vấn đề bạn gặp phải..."
                            className="p-3 h-32 rounded-2xl placeholder:text-sm text-slate-800 focus:outline-none focus:border-primary focus:ring-primary/90 transition w-full border border-slate-200 shadow-md"
                          />
                        </div>
                        <p>
                          {errors.message && touched.message && (
                            <>{errors.message}</>
                          )}
                        </p>
                      </div>
                      <Button
                        type="submit"
                        icon={<Send size={20} />}
                        className="inline-flex items-center justify-center gap-2 rounded-3xl! py-3!"
                      >
                        Gửi tin nhắn{" "}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default SupportPage;
