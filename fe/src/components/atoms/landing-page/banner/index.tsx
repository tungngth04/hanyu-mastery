import { ArrowRight, Zap } from "lucide-react";
import Button from "../../button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "./style.scss";

const Banner = () => {
  const router = useRouter();

  return (
    <section className="relative pt-20 pb-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold slide-left">
            <Zap size={14} /> Nền tảng học tiếng Trung số 1 Việt Nam
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-[1.1] slide-up delay-100">
            Chinh phục <span className="text-primary italic">Tiếng Trung</span>{" "}
            <br />
            Theo cách thông minh nhất.
          </h1>
          <p className="text-xl text-slate-500 max-w-lg zoom-in delay-200">
            Từ vựng chủ đề, flashcard AI, luyện phát âm chuẩn và lộ trình HSK cá
            nhân hóa. Tất cả trong một ứng dụng duy nhất.
          </p>
          <div className="flex flex-wrap gap-4 slide-up delay-300">
            <Button
              size="lg"
              className="h-14 px-8 text-lg font-bold shadow-xl shadow-primary/25 group  inline-flex items-center justify-center gap-2 whitespace-nowrap"
              onClick={() => router.push("/home")}
              icon={<ArrowRight size={18} />}
            >
              Bắt đầu học ngay
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-lg font-bold border-2 bg-white shadow-none text-black!"
            >
              Xem video giới thiệu
            </Button>
          </div>
          <div className="flex items-center gap-6 pt-4 fade-in delay-500">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <Image
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                  src={`https://i.pravatar.cc/100?u=${i}`}
                  alt="user"
                  width={40}
                  height={40}
                />
              ))}
            </div>
            <p className="text-sm font-medium text-slate-500">
              <span className="text-slate-900 font-bold">10,000+</span> học viên
              đang theo học
            </p>
          </div>
        </div>

        <div className="relativezoom-in delay-200">
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
            <Image
              src="/Images/banner.jpg"
              alt="banner img"
              className="w-full aspect-4/3 object-cover"
              width={800}
              height={600}
            />
          </div>
        </div>
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
        <span className="font-chinese text-[400px] leading-none font-black">
          汉语
        </span>
      </div>
    </section>
  );
};
export default Banner;
