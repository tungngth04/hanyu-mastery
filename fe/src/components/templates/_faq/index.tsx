"use client";
import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqs = [
    {
      q: "Học tiếng Trung tại Hanyu Mastery có mất phí không?",
      a: "Chúng tôi cung cấp các bài học cơ bản miễn phí. Để truy cập kho đề thi HSK nâng cao và tính năng chấm điểm AI không giới hạn, bạn có thể đăng ký gói Premium.",
    },
    {
      q: "Ứng dụng có hỗ trợ luyện thi HSK theo chuẩn mới không?",
      a: "Có, hệ thống đề thi của chúng tôi luôn được cập nhật theo cấu trúc mới nhất của Hanban, bao gồm đầy đủ các cấp độ từ HSK 1 đến HSK 6.",
    },
    {
      q: "Làm thế nào để sử dụng tính năng luyện phát âm AI?",
      a: "Bạn chỉ cần cho phép ứng dụng truy cập micro, nhấn vào biểu tượng thu âm và đọc theo từ vựng mẫu. Hệ thống sẽ phân tích thanh điệu và đưa ra điểm số ngay lập tức.",
    },
    {
      q: "Tôi có thể học trên điện thoại không?",
      a: "Hanyu Mastery là nền tảng web tối ưu hóa hoàn hảo cho cả máy tính và thiết bị di động (Responsive Design), bạn có thể học mọi lúc mọi nơi.",
    },
    {
      q: "Nếu tôi quên mật khẩu thì phải làm sao?",
      a: "Bạn có thể vào trang Đăng nhập và nhấn vào link 'Quên mật khẩu' để nhận hướng dẫn khôi phục qua email.",
    },
  ];

  const handleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className="text-center space-y-8 py-10 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-40 max-w-7xl mx-auto">
      <h1 className="font-black text-4xl">Câu hỏi thường gặp</h1>
      <p className="text-xl text-slate-500">
        Tìm kiếm câu trả lời nhanh cho các thắc mắc phổ biến nhất.
      </p>
      <div className="relative w-full">
        <Search
          className="absolute  left-3 top-1/2 -translate-y-1/2 text-slate-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Tìm kiếm câu hỏi..."
          className="w-full h-14 pl-11 pr-4 rounded-2xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="space-y-4">
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 shadow-sm text-left"
            >
              <button
                onClick={() => handleFAQ(index)}
                className="w-full flex items-center justify-between p-5 text-left font-semibold cursor-pointer "
              >
                {item.q}

                <ChevronDown
                  className={`transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-slate-600 leading-relaxed">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default FAQPage;
