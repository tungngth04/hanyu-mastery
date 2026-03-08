import { Award, Globe, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "../../atoms/card";

const AboutPage = () => {
  const info = [
    {
      label: "Nội dung thực tế",
      description:
        "Các bài học được xây dựng dựa trên các tình huống giao tiếp thực tế hàng ngày.",
      icon: Globe,
    },
    {
      label: "Lộ trình chuẩn HSK",
      description: "Hệ thống bài giảng và đề thi bám sát cấu trúc của Hanban.",
      icon: Award,
    },
    {
      label: "Chất lượng tin cậy",
      description:
        "Được kiểm định bởi đội ngũ chuyên gia và giảng viên tiếng Trung hàng đầu.",
      icon: ShieldCheck,
    },
  ];
  return (
    <div className="space-y-12 py-10 px-2 max-w-6xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="font-black text-3xl md:text-4xl">Về Hanyu Mastery</h1>
        <p className="text-base md:text-xl text-slate-500 max-w-3xl mx-auto">
          Chúng tôi xây dựng nền tảng này với sứ mệnh giúp việc học tiếng Trung
          trở nên dễ dàng, thông minh và cá nhân hóa hơn cho mọi người.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 items-center">
        <Image
          src="/images/banner.jpg"
          alt="About Hanyu Mastery"
          width={600}
          height={200}
          className="rounded-3xl shadow-xl aspect-video object-cover w-full lg:w-1/2 hover:scale-110 transition-transform hover:shadow-2xl"
        />
        <div className="flex flex-col justify-center space-y-6 lg:w-1/2">
          <h2 className="text-2xl md:text-3xl font-black">
            Sứ mệnh của chúng tôi
          </h2>
          <p className="text-slate-500 text-base md:text-lg leading-relaxed">
            Hanyu Mastery không chỉ là một ứng dụng học tập, mà là một người
            đồng hành thông minh. Chúng tôi sử dụng công nghệ AI để tối ưu hóa
            quá trình ghi nhớ từ vựng và luyện phát âm, giúp học viên rút ngắn
            50% thời gian chinh phục chứng chỉ HSK.
          </p>
          <div className="grid grid-cols-2 lg:gap-4 gap-16 w-full">
            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 text-center ">
              <p className="text-primary font-black text-2xl">10k+</p>
              <p className="text-xs font-bold text-slate-500 uppercase">
                HỌC VIÊN
              </p>
            </div>
            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 text-center">
              <p className="text-primary font-black text-2xl">95%</p>
              <p className="text-xs font-bold text-slate-500 uppercase">
                TỈ LỆ ĐỖ HSK
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
        {info.map((item, index) => (
          <Card
            key={index}
            className="border-0 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden"
          >
            <CardContent className="p-8">
              <div
                className={`w-14 h-14 rounded-2xl bg-rose-200 text-primary flex items-center justify-center mb-6 shadow-lg shadow-inherit/20 group-hover:scale-110 transition-transform`}
              >
                <item.icon size={28} />
              </div>
              <h4 className="text-lg md:text-xl font-bold text-slate-900 mb-3">
                {item.label}
              </h4>
              <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;
