import { useRouter } from "next/navigation";
import Button from "../../button";
import { ArrowRight } from "lucide-react";

const Section = () => {
  const route = useRouter();
  return (
    <section className="py-32 px-6">
      <div className="max-w-5xl mx-auto rounded-3xl bg-slate-900 p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-8">
          <h2 className="text-4xl lg:text-6xl font-black text-white">
            Sẵn sàng để bắt đầu hành trình?
          </h2>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            Đăng nhập ngay để trải nghiệm phương pháp học tiếng Trung hoàn toàn
            mới, hiệu quả và thú vị.
          </p>
          <Button
            size="lg"
            className="h-16 px-12 text-xl font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/40 group inline-flex items-center justify-center gap-2 whitespace-nowrap"
            icon={<ArrowRight size={20} />}
            onClick={() => route.push("/app")}
          >
            Bắt đầu học ngay
          </Button>
        </div>
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none">
          <span className="font-chinese text-[300px] leading-none font-black text-white">
            好
          </span>
        </div>
      </div>
    </section>
  );
};

export default Section;
