import {
  Award,
  CheckCircle2,
  Globe,
  MessageCircle,
  PlayCircle,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "../../card";
import Image from "next/image";

const Evaluate = () => {
  const data = [
    {
      name: "Nguyễn Thu Thủy",
      role: "Sinh viên Ngoại Thương",
      content:
        "Nhờ lộ trình luyện thi HSK rõ ràng và bộ Flashcards thông minh, mình đã đạt HSK 4 chỉ sau 4 tháng học từ con số 0.",
      avatar: "https://i.pravatar.cc/150?u=thuy",
      rating: 5,
    },
    {
      name: "Trần Minh Hoàng",
      role: "Nhân viên Xuất nhập khẩu",
      content:
        "Tính năng luyện phát âm AI cực kỳ hữu ích. Nó giúp mình sửa những lỗi thanh điệu mà trước đây mình không hề nhận ra.",
      avatar: "https://i.pravatar.cc/150?u=hoang",
      rating: 5,
    },
    {
      name: "Lê Mỹ Linh",
      role: "Người đi làm",
      content:
        "Giao diện đẹp, dễ dùng và nội dung video rất thực tế. Đây là nền tảng học tiếng Trung tốt nhất mà mình từng sử dụng.",
      avatar: "https://i.pravatar.cc/150?u=linh",
      rating: 5,
    },
  ];
  return (
    <section id="evaluate" className="py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
            Học viên nói gì về{" "}
            <span className="text-primary italic">Hanyu Mastery</span>?
          </h2>
          <p className="text-xl text-slate-500">
            Hơn 10,000 học viên đã thay đổi lộ trình học tiếng Trung nhờ chúng
            tôi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((item, index) => (
            <Card
              key={index}
              className="border-0 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden"
            >
              <CardContent className="p-8 flex flex-col h-full">
                <div>
                  {[...Array(item.rating)].map((_, i) => (
                    <span key={i} className="text-lg text-yellow-500">
                      ★
                    </span>
                  ))}
                </div>

                <p className="text-slate-600 mb-8 italic leading-relaxed text-lg">
                  &quot;{item.content}&quot;
                </p>

                <div className="flex gap-4 items-center mt-auto">
                  <Image
                    src={item.avatar}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-black text-base">{item.name}</p>
                    <p className="text-slate-500 text-sm">{item.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Evaluate;
