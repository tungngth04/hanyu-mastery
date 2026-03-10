"use client";
import { Filter, Plus, Search, Volume2 } from "lucide-react";
import Button from "../../atoms/button";
import { useState } from "react";
import { Card, CardContent } from "../../atoms/card";

const VocabularyPage = () => {
  const [activeTopic, setActiveTopic] = useState("Tất cả");
  const topics = [
    "Tất cả",
    "Chào hỏi",
    "Gia đình",
    "Công việc",
    "Sở thích",
    "Du lịch",
    "Mua sắm",
    "Ăn uống",
  ];

  const mockVocabulary = [
    {
      id: 1,
      hanzi: "你好",
      pinyin: "nǐ hǎo",
      meaning: "Xin chào",
      topic: "Chào hỏi",
      level: "HSK 1",
    },
    {
      id: 2,
      hanzi: "谢谢",
      pinyin: "xièxie",
      meaning: "Cảm ơn",
      topic: "Chào hỏi",
      level: "HSK 1",
    },
    {
      id: 3,
      hanzi: "爸爸",
      pinyin: "bàba",
      meaning: "Bố",
      topic: "Gia đình",
      level: "HSK 1",
    },
    {
      id: 4,
      hanzi: "妈妈",
      pinyin: "māma",
      meaning: "Mẹ",
      topic: "Gia đình",
      level: "HSK 1",
    },
    {
      id: 5,
      hanzi: "工作",
      pinyin: "gōngzuò",
      meaning: "Công việc",
      topic: "Công việc",
      level: "HSK 2",
    },
    {
      id: 6,
      hanzi: "旅游",
      pinyin: "lǚyóu",
      meaning: "Du lịch",
      topic: "Du lịch",
      level: "HSK 2",
    },
    {
      id: 7,
      hanzi: "苹果",
      pinyin: "píngguǒ",
      meaning: "Quả táo",
      topic: "Ăn uống",
      level: "HSK 1",
    },
    {
      id: 8,
      hanzi: "电脑",
      pinyin: "diànnǎo",
      meaning: "Máy tính",
      topic: "Công việc",
      level: "HSK 2",
    },
    {
      id: 9,
      hanzi: "朋友",
      pinyin: "péngyǒu",
      meaning: "Bạn bè",
      topic: "Chào hỏi",
      level: "HSK 1",
    },
  ];
  return (
    <div className="py-10 px-10 space-y-8">
      <div>
        <h1 className="text-3xl font-black">Từ vựng theo chủ đề</h1>
        <p className="text-slate-500 mt-2">
          Học và tra cứu từ vựng tiếng Trung được phân loại theo các chủ đề
          thông dụng.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm bằng Hanzi, Pinyin hoặc Tiếng Việt..."
            className="pl-9 w-full pr-4 py-2 bg-white rounded-xl! border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <button className="border px-4 py-2 rounded-xl text-sm cursor-pointer flex gap-2 items-center">
          <Filter className="h-4 w-4" /> Lọc nâng cao
        </button>
      </div>

      <div className="flex overflow-x-auto pb-2 scrollbar-hide gap-2">
        {topics.map((topic, index) => (
          <Button
            key={index}
            className={`min-w-27.5 py-2 rounded-full! text-sm font-medium transition-all ${activeTopic === topic ? "bg-red-500 text-white shadow-md shadow-red-200 border-transparent" : "bg-white text-gray-700! border border-gray-200 hover:bg-primary/70! hover:text-white! shadow-none!"}`}
            onClick={() => setActiveTopic(topic)}
          >
            {topic}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {mockVocabulary.map((item, index) => (
          <Card
            key={index}
            className="group overflow-hidden border border-slate-200 rounded-2xl! hover:shadow-xl! shadow-lg! transition-all cursor-pointer"
          >
            <CardContent className="p-0 relative">
              <div className="absolute top-0 left-0 w-full flex items-center justify-between px-4 py-3 bg-slate-200 border-b border-slate-200">
                <span className="text-xs border border-black px-2 py-[2px] rounded-full font-medium">
                  {item.level}
                </span>

                <div className="flex items-center gap-3 text-slate-400">
                  <Volume2 className="w-4 h-4 cursor-pointer hover:text-slate-700" />
                  <Plus className="w-4 h-4 cursor-pointer hover:text-slate-700" />
                </div>
              </div>

              <div className="pt-12 p-6 text-center">
                <h3 className="text-5xl font-bold text-slate-900 mb-2 group-hover:text-primary">
                  {item.hanzi}
                </h3>

                <p className="text-lg text-slate-500 mb-1">{item.pinyin}</p>

                <p className="text-slate-700 font-semibold mb-4">
                  {item.meaning}
                </p>

                <div className="border-t border-slate-200 pt-4 flex justify-center gap-3">
                  <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full font-medium">
                    Viết: 12 nét
                  </span>

                  <span className="bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full font-medium">
                    Bộ: ⼝ (Khẩu)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {mockVocabulary.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500">
            Không tìm thấy từ vựng nào phù hợp với tìm kiếm của bạn.
          </div>
        )}
      </div>
    </div>
  );
};
export default VocabularyPage;
