"use client";
import { useState } from "react";
import { Eye, RotateCcw, ThumbsDown, ThumbsUp } from "lucide-react";
import { Card, CardContent } from "@/src/components/atoms/card";
import Button from "@/src/components/atoms/button";
import { useRouter } from "next/navigation";

function FlashcardsDetail() {
  const [dataIndex, setDataIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [completed, setCompleted] = useState(false);
  const router = useRouter();

  const data = [
    {
      id: 1,
      front: "环境",
      pinyin: "huánjìng",
      back: "Môi trường",
      example: "保护环境 (Bǎohù huánjìng) - Bảo vệ môi trường",
    },
    {
      id: 2,
      front: "文化",
      pinyin: "wénhuà",
      back: "Văn hóa",
      example: "中国文化 (Zhōngguó wénhuà) - Văn hóa Trung Quốc",
    },
    {
      id: 3,
      front: "教育",
      pinyin: "jiàoyù",
      back: "Giáo dục",
      example: "教育改革 (Jiàoyù gǎigé) - Cải cách giáo dục",
    },
    {
      id: 4,
      front: "经济",
      pinyin: "jīngjì",
      back: "Kinh tế",
      example: "经济发展 (Jīngjì fāzhǎn) - Phát triển kinh tế",
    },
    {
      id: 5,
      front: "科技",
      pinyin: "kējì",
      back: "Công nghệ",
      example: "科技创新 (Kējì chuàngxīn) - Đổi mới công nghệ",
    },
    {
      id: 6,
      front: "健康",
      pinyin: "jiànkāng",
      back: "Sức khỏe",
      example: "保持健康 (Bǎochí jiànkāng) - Giữ gìn sức khỏe",
    },
    {
      id: 7,
      front: "旅游",
      pinyin: "lǚyóu",
      back: "Du lịch",
      example: "旅游景点 (Lǚyóu jǐngdiǎn) - Điểm du lịch",
    },
    {
      id: 8,
      front: "艺术",
      pinyin: "yìshù",
      back: "Nghệ thuật",
      example: "艺术展览 (Yìshù zhǎnlǎn) - Triển lãm nghệ thuật",
    },
    {
      id: 9,
      front: "体育",
      pinyin: "tǐyù",
      back: "Thể thao",
      example: "体育比赛 (Tǐyù bǐsài) - Trận đấu thể thao",
    },
    {
      id: 10,
      front: "社会",
      pinyin: "shèhuì",
      back: "Xã hội",
      example: "社会问题 (Shèhuì wèntí) - Vấn đề xã hội",
    },
  ];

  const progressPercent = ((dataIndex + 1) / data.length) * 100;
  const dataCard = data[dataIndex];

  const handleNext = () => {
    if (dataIndex + 1 < data.length) {
      setDataIndex(dataIndex + 1);
      setShowBack(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setDataIndex(0);
    setShowBack(false);
    setCompleted(false);
  };

  return (
    <>
      {!completed ? (
        <div className="space-y-8 py-10 px-20">
          <div className="flex justify-end">
            <Button
              size="sm"
              className="gap-1 rounded-lg bg-primary hover:bg-primary/90 whitespace-nowrap inline-flex items-center"
              onClick={() => router.back()}
            >
              Quay lại
            </Button>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-black text-2xl">Ôn tập HSK 4 - Cấp tốc</h1>
              <p className="text-slate-500 ">Chủ đề: Công việc và xã hội</p>
            </div>
            <div>
              <span className="font-bold text-xl text-primary">
                {dataIndex + 1}
              </span>
              <span className="text-slate-500">/{data.length}</span>
            </div>
          </div>

          <div className="h-2 w-full bg-rose-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-500 rounded-full transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex justify-center items-center perspective">
            <div
              className={`relative z-10 transition-transform duration-500 preserve-3d cursor-pointer w-[90%] sm:w-125 md:w-150 lg:w-175 h-100 ${showBack ? "-rotate-y-180" : ""}`}
              onClick={() => setShowBack(!showBack)}
            >
              <Card className="absolute inset-0 backface-hidden border shadow-xl flex items-center justify-center h-100 w-full">
                <CardContent className="flex items-center gap-4 flex-col">
                  <h2 className="text-9xl md:text-9xl font-bold">
                    {dataCard.front}
                  </h2>

                  <div className="flex items-center justify-center gap-2">
                    <Eye className="text-gray-400" />
                    <p className="text-gray-400">Chạm để xem nghĩa</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="absolute inset-0 rotate-y-180 backface-hidden border shadow-xl flex items-center justify-center h-100 w-full">
                <CardContent className="flex flex-col items-center gap-3 p-0!">
                  <p className="text-red-500 text-4xl">{dataCard.pinyin}</p>
                  <p className="text-5xl font-black">{dataCard.back}</p>
                  <div className="flex gap-4">
                    <p className="bg-blue-200 py-1 px-3 rounded-2xl text-blue-700 font-bold text-sm w-20 text-center">
                      Danh từ
                    </p>
                    <p className="bg-orange-100 py-1 px-3 rounded-2xl text-orange-400 font-bold text-sm w-20 text-center">
                      HSK 4
                    </p>
                  </div>
                  <Card className="w-full">
                    <CardContent>
                      <p className="text-slate-700">Ví dụ:</p>
                      <p>{dataCard.example}</p>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-center gap-6">
            <Button
              className="bg-white text-primary! p-0! w-38 h-18 flex flex-col items-center justify-center gap-2 hover:bg-rose-100"
              onClick={handleNext}
            >
              <span>
                <ThumbsDown />
              </span>
              <span>Chưa thuộc</span>
            </Button>
            <Button
              className="bg-green-300!  p-0! w-38 h-18 flex flex-col items-center justify-center gap-2 shadow-green-500/20! hover:bg-green-400!"
              onClick={handleNext}
            >
              <span>
                <ThumbsUp />
              </span>
              <span>Đã thuộc</span>
            </Button>
          </div>
        </div>
      ) : (
        <div className=" flex flex-col items-center justify-center h-100 w-full gap-5 mt-10">
          <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center text-green-500">
            <ThumbsUp size={32} />
          </div>
          <h1 className="text-4xl font-bold">Hoàn thành xuất sắc!</h1>
          <p className="text-gray-500">
            Bạn đã ôn tập xong bộ flashcard hôm nay.
          </p>

          <button
            onClick={handleRestart}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full flex items-center justify-center gap-2"
          >
            <RotateCcw size={20} /> Học lại bộ này
          </button>
        </div>
      )}
    </>
  );
}
export default FlashcardsDetail;
