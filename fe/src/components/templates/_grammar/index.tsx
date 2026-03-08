"use client";
import { BookMarked, CheckCircle2, ChevronDown, Layers } from "lucide-react";
import { Card, CardContent } from "../../atoms/card";
import Button from "../../atoms/button";
import { useState } from "react";

const GrammarPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const grammarTopics = [
    {
      id: "hsk1",
      title: "Ngữ pháp HSK 1 - Căn bản",
      completed: 8,
      total: 12,
      lessons: [
        { title: "Đại từ nhân xưng & Câu hỏi với 吗 (ma)", status: "done" },
        {
          title: "Động từ 是 (shì) - Câu khẳng định, phủ định",
          status: "done",
        },
        { title: "Đại từ nghi vấn (什么, 谁, 哪儿...)", status: "done" },
        { title: "Câu chữ 有 (yǒu) chỉ sự tồn tại", status: "done" },
        { title: "Lượng từ cơ bản (个, 口, 本...)", status: "pending" },
        { title: "Trạng từ chỉ mức độ (很, 太, 真...)", status: "locked" },
      ],
    },
    {
      id: "hsk2",
      title: "Ngữ pháp HSK 2 - Sơ cấp",
      completed: 2,
      total: 15,
      lessons: [
        { title: "Câu cầu khiến với 请, 让, 叫", status: "done" },
        { title: "Trợ từ động thái 得 (de)", status: "done" },
        { title: "Câu so sánh với 比 (bǐ)", status: "pending" },
        { title: "Giới từ 为, 对, 给", status: "locked" },
      ],
    },
    {
      id: "hsk3",
      title: "Ngữ pháp HSK 3 - Trung cấp",
      completed: 0,
      total: 20,
      lessons: [
        { title: "Câu chữ 把 (bǎ) - Cách dùng cơ bản", status: "pending" },
        { title: "Câu chữ 被 (bèi)", status: "locked" },
        { title: "Bổ ngữ kết quả", status: "locked" },
        { title: "Bổ ngữ xu hướng kép", status: "locked" },
      ],
    },
  ];
  return (
    <div className="p-10 flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-6">
        <Card>
          <CardContent className="space-y-8">
            <div className="space-y-2">
              <span className="bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full font-medium hover:bg-purple-200">
                Đang học: HSK 3
              </span>
              <h1 className="text-3xl font-bold mt-2">
                Câu chữ 把 (bǎ) - Cách dùng cơ bản
              </h1>
              <p className="flex items-center text-slate-500 gap-2">
                <BookMarked size={16} /> Bài 1 • Ước lượng: 15 phút
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold">1. Khái niệm</h3>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 space-y-4">
                <p>
                  Câu chữ &quot;把&quot; là một dạng câu đặc biệt trong tiếng
                  Trung, dùng để nhấn mạnh sự tác động của chủ thể lên đối
                  tượng, làm cho đối tượng đó thay đổi vị trí, trạng thái, hoặc
                  chịu một kết quả nào đó.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold">2. Cấu trúc cơ bản</h3>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg text-amber-900 text-lg text-center font-medium">
                Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần khác
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold">3. Ví dụ minh họa</h3>
              <Card>
                <CardContent>
                  <div className="flex gap-4">
                    <div className="bg-slate-200 rounded-full flex items-center justify-center w-9 h-9 text-slate-500 font-bold">
                      1
                    </div>
                    <div className="space-y-2">
                      <h1 className="text-xl font-black text-gray-700">
                        我把书放在桌子上了。
                      </h1>
                      <p className="text-primary">
                        Wǒ bǎ shū fàng zài zhuōzi shàng le.
                      </p>
                      <p className="text-slate-600">
                        Tôi đã đặt quyển sách lên bàn rồi.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-2">
                <CardContent>
                  <div className="flex gap-4">
                    <div className="bg-slate-200 rounded-full flex items-center justify-center w-9 h-9 text-slate-500 font-bold">
                      2
                    </div>
                    <div className="space-y-2">
                      <h1 className="text-xl font-black text-gray-700">
                        请把门关上。
                      </h1>
                      <p className="text-primary">Qǐng bǎ mén guān shàng.</p>
                      <p className="text-slate-600">Xin hãy đóng cửa lại.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="border-t border-slate-100 pt-8 flex gap-4 justify-end">
              <button className="border py-2 px-4 rounded-2xl cursor-pointer hover:bg-slate-200 ">
                Quay lại
              </button>
              <Button
                icon={<ChevronDown size={16} className="-rotate-90" />}
                className="whitespace-nowrap inline-flex items-center justify-center gap-4 rounded-2xl"
              >
                Làm bài tập vận dụng
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full lg:w-100 shrink-0 space-y-6">
        <Card>
          <CardContent className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg">
            <h3 className="font-bold text-lg mb-2">Tiến độ của bạn</h3>
            <div className="mb-4 flex gap-2 items-end">
              <span className="text-4xl font-black">10</span>
              <span className="text-slate-400">/ 47 bài</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 mb-2">
              <div className="bg-primary h-2 rounded-full w-[21%]"></div>
            </div>
            <p className="text-xs text-slate-400">
              Đã hoàn thành 21% tổng số bài ngữ pháp
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0!">
            <div className="flex items-center gap-2 px-6 py-4  bg-slate-50 rounded-t-2xl">
              <Layers size={20} className="text-slate-800" />
              <h3 className="font-bold text-slate-800 text-xl">Lộ trình học</h3>
            </div>
            {grammarTopics.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={index} className="border-t border-slate-200">
                  <div
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex items-center justify-between py-4 px-6 cursor-pointer hover:bg-slate-100"
                  >
                    <div className="flex flex-col">
                      <span className="font-bold text-base">{item.title}</span>
                      <span className="text-sm text-slate-400 mt-1">
                        {item.completed}/{item.total} bài hoàn thành
                      </span>
                    </div>

                    <ChevronDown
                      className={`transition-transform duration-1000 text-slate-500 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  <ul
                    className={`overflow-hidden transition-all duration-1000 ease-in-out ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {item.lessons.map((lesson, idx) => (
                      <li
                        key={idx}
                        className={`px-6 py-2.5 flex items-start gap-3 text-sm transition-colors cursor-pointer ${
                          lesson.status === "pending"
                            ? "bg-primary/5 text-primary font-medium border-l-2 border-primary"
                            : "text-slate-600 hover:bg-slate-100 border-l-2 border-transparent"
                        }`}
                      >
                        {lesson.status === "done" ? (
                          <CheckCircle2
                            size={16}
                            className="text-green-500 mt-0.5 shrink-0"
                          />
                        ) : lesson.status === "pending" ? (
                          <div className="w-4 h-4 rounded-full border-2 border-primary mt-0.5 shrink-0"></div>
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-slate-300 mt-0.5 shrink-0 opacity-50"></div>
                        )}

                        <span
                          className={
                            lesson.status === "locked" ? "opacity-50" : ""
                          }
                        >
                          {lesson.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default GrammarPage;
