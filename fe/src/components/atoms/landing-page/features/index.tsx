import {
  Award,
  CheckCircle2,
  Globe,
  MessageCircle,
  PlayCircle,
  Zap,
} from "lucide-react";
import { Card, CardContent } from "../../card";

const Features = () => {
  const features = [
    {
      title: "Từ vựng theo chủ đề",
      desc: "Học qua hình ảnh và âm thanh sống động, ghi nhớ sâu hơn.",
      icon: Globe,
      color: "bg-blue-500",
    },
    {
      title: "Flashcard AI thông minh",
      desc: "Tự động sắp xếp lịch ôn tập dựa trên mức độ ghi nhớ của bạn.",
      icon: Zap,
      color: "bg-amber-500",
    },
    {
      title: "Luyện phát âm AI",
      desc: "Nhận diện lỗi sai thanh điệu và sửa lỗi ngay lập tức.",
      icon: MessageCircle,
      color: "bg-emerald-500",
    },
    {
      title: "Học qua video thực tế",
      desc: "Hàng ngàn video tình huống thực tế, phim ảnh và bài hát.",
      icon: PlayCircle,
      color: "bg-rose-500",
    },
    {
      title: "Ngữ pháp trực quan",
      desc: "Các điểm ngữ pháp khó hiểu được minh họa đơn giản, dễ nhớ.",
      icon: CheckCircle2,
      color: "bg-purple-500",
    },
    {
      title: "Luyện thi HSK chuẩn",
      desc: "Ngân hàng đề thi khổng lồ, bám sát cấu trúc thi thật.",
      icon: Award,
      color: "bg-indigo-500",
    },
  ];
  return (
    <section id="features" className="py-24 px-6 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-base font-bold text-primary uppercase tracking-widest">
            Tính năng nổi bật
          </h2>
          <h3 className="text-4xl font-black text-slate-900">
            Tất cả những gì bạn cần để giỏi tiếng Trung
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <Card
              key={i}
              className="border-0 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden"
            >
              <CardContent className="p-8">
                <div
                  className={`w-14 h-14 rounded-2xl ${f.color} text-white flex items-center justify-center mb-6 shadow-lg shadow-inherit/20 group-hover:scale-110 transition-transform`}
                >
                  <f.icon size={28} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">
                  {f.title}
                </h4>
                <p className="text-slate-500 leading-relaxed">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Features;
