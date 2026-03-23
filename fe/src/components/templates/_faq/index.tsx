"use client";
import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");

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
    {
      q: "Web này có hoàn toàn miễn phí không?",
      a: "Các bài học cơ bản và nhiều tính năng luyện tập đều miễn phí. Một số tính năng nâng cao như chấm điểm AI không giới hạn cần gói Premium.",
    },
    {
      q: "Có thể học HSK 1-6 trên web không?",
      a: "Có, Hanyu Mastery cung cấp đầy đủ các cấp độ HSK từ 1 đến 6 với bài tập, flashcard và đề thi thử.",
    },
    {
      q: "Tôi có thể luyện nghe và đọc tiếng Trung trên web không?",
      a: "Có, hệ thống cung cấp các bài luyện nghe với giọng chuẩn và bài đọc mẫu, giúp bạn nâng cao khả năng phản xạ ngôn ngữ.",
    },
    {
      q: "Web có hỗ trợ học từ vựng theo chủ đề không?",
      a: "Có, Hanyu Mastery có các bộ flashcard theo chủ đề: du lịch, công việc, học thuật,… giúp học từ vựng dễ nhớ hơn.",
    },
    {
      q: "Tính năng kiểm tra tiến độ học như thế nào?",
      a: "Hệ thống theo dõi các bài học và đề thi bạn đã hoàn thành, tính điểm, và hiển thị tiến độ từng cấp HSK.",
    },
    {
      q: "Tôi có thể lưu lại các từ vựng yêu thích không?",
      a: "Có, bạn có thể thêm từ vựng vào danh sách yêu thích hoặc checklist để ôn tập lại sau.",
    },
    {
      q: "Web có cung cấp hướng dẫn phát âm Pinyin không?",
      a: "Có, mỗi từ vựng đều có Pinyin và file âm thanh chuẩn giúp bạn luyện phát âm đúng.",
    },
    {
      q: "Có cần đăng ký tài khoản mới sử dụng được không?",
      a: "Bạn có thể học một số bài học miễn phí mà không cần đăng ký, nhưng để lưu tiến độ và sử dụng tính năng AI nâng cao thì cần tạo tài khoản.",
    },
    {
      q: "Tôi muốn liên hệ hỗ trợ khi gặp lỗi, làm sao?",
      a: "Bạn có thể vào trang 'Trung tâm hỗ trợ', gửi yêu cầu trực tiếp hoặc liên hệ qua email: support@hanyumastery.vn, hotline: 1900 1234.",
    },
    {
      q: "Có thể học offline không?",
      a: "Hiện tại Hanyu Mastery là nền tảng web, cần kết nối internet để truy cập các bài học và dữ liệu AI.",
    },
  ];

  const handleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchTerm.toLowerCase()),
  );
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-14 pl-11 pr-4 rounded-2xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 shadow-sm text-left"
              >
                <button
                  onClick={() => handleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold cursor-pointer"
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
          })
        ) : (
          <p className="text-slate-400 text-center py-10">
            Không tìm thấy câu hỏi nào phù hợp.
          </p>
        )}
      </div>
    </div>
  );
};
export default FAQPage;
