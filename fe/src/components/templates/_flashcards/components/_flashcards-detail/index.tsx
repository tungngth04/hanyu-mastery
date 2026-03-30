"use client";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  RotateCcw,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { Card, CardContent } from "@/src/components/atoms/card";
import Button from "@/src/components/atoms/button";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch } from "@/src/hooks/useHookReducers";
import {
  getAllFlashCardById,
  studyFlashcardDeck,
  updateFlashcardStatus,
} from "@/src/services/flashCards";
import { IVocabulary } from "@/src/types/interface";
import useNotification from "@/src/hooks/useNotification";

function FlashcardsDetail() {
  const [dataIndex, setDataIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [completed, setCompleted] = useState(false);
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const dispatch = useAppDispatch();
  const { notify } = useNotification();

  const [flashCard, setFlashCard] = useState<IVocabulary[]>([]);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const result = await dispatch(getAllFlashCardById(id)).unwrap();

        setFlashCard(result);
        if (result) {
          notify("success", "Lấy dữ liệu thành công");
        }
      } catch (err) {
        console.log(err);
        notify("error", "Lấy dữ liệu thất bại");
      }
    };

    if (id) fetchVideo();
  }, [id]);

  const progressPercent = ((dataIndex + 1) / flashCard.length) * 100;
  const dataCard = flashCard[dataIndex];

  const handlePrev = () => {
    if (dataIndex > 0) {
      setDataIndex(dataIndex - 1);
      setShowBack(false);
    }
  };

  const handleNext = () => {
    if (dataIndex + 1 < flashCard.length) {
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

  const isMastered = dataCard?.status === "mastered";

  const handleUpdateStatus = async (status: "new" | "mastered") => {
    const current = flashCard[dataIndex];

    try {
      await dispatch(
        updateFlashcardStatus({
          vocabularyId: current._id,
          status,
          deckId: id,
        }),
      ).unwrap();

      const updated = [...flashCard];
      updated[dataIndex].status = status;
      setFlashCard(updated);

      handleNext();
    } catch (err) {
      notify("error", "Cập nhật thất bại");
    }
  };

  useEffect(() => {
    if (!id) return;

    const handleStudy = async () => {
      try {
        await dispatch(studyFlashcardDeck(id)).unwrap();
      } catch (err) {}
    };

    handleStudy();
  }, [id]);

  return (
    <>
      {!completed ? (
        <div className="space-y-2 py-10 px-20">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-black text-2xl">Ôn tập HSK 4 - Cấp tốc</h1>
              <p className="text-slate-500 ">Chủ đề: Công việc và xã hội</p>
            </div>
            <div>
              <Button
                size="sm"
                className="gap-1 rounded-lg bg-primary hover:bg-primary/90 whitespace-nowrap inline-flex items-center"
                onClick={() => router.back()}
              >
                Quay lại
              </Button>
            </div>
          </div>

          <div>
            <div className="flex justify-end">
              <span className="font-bold text-xl text-primary">
                {dataIndex + 1}
              </span>
              <span className="text-slate-500">/{flashCard.length}</span>
            </div>
            <div className="h-2 w-full bg-rose-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-red-500 rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="flex justify-center items-center perspective mt-10 ">
            <div
              className={`relative z-10 transition-transform duration-500 preserve-3d cursor-pointer w-[90%] sm:w-125 md:w-150 lg:w-175 h-100 ${showBack ? "-rotate-y-180" : ""}`}
              onClick={() => setShowBack(!showBack)}
            >
              <Card className="absolute inset-0 backface-hidden border shadow-xl flex items-center justify-center h-100 w-full">
                <CardContent className="flex items-center gap-4 flex-col">
                  <h2 className="text-9xl md:text-9xl font-bold">
                    {dataCard?.hanzi}
                  </h2>

                  <div className="flex items-center justify-center gap-2">
                    <Eye className="text-gray-400" />
                    <p className="text-gray-400">Chạm để xem nghĩa</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="absolute inset-0 rotate-y-180 backface-hidden border shadow-xl flex items-center justify-center h-100 w-full">
                <CardContent className="flex flex-col items-center gap-3 p-10 overflow-y-auto max-h-full">
                  <p className="text-red-500 text-4xl">{dataCard?.pinyin}</p>
                  <p className="text-5xl font-black text-center wrap-break-word">
                    {dataCard?.meaning}
                  </p>
                  <div className="flex gap-4">
                    <p className="bg-blue-200 py-1 px-3 rounded-2xl text-blue-700 font-bold text-sm w-20 text-center">
                      Danh từ
                    </p>
                    <p className="bg-orange-100 py-1 px-3 rounded-2xl text-orange-400 font-bold text-sm w-20 text-center">
                      HSK {dataCard?.level}
                    </p>
                  </div>
                  <Card className="w-full">
                    <CardContent className="w-full">
                      <p className="text-slate-700">Ví dụ:</p>
                      <p className="wrap-break-word">
                        {dataCard?.example} ({dataCard?.exampleMeaning})
                      </p>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-10">
            <div className="flex items-center gap-6">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border border-slate-200 text-slate-400 hover:text-primary hover:border-primary flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft size={22} />
              </button>

              <div className="flex gap-4">
                <Button
                  className={`p-0! w-38 h-18 flex flex-col rounded-2xl! items-center justify-center gap-2 ${!isMastered ? "bg-red-500 text-white hover:bg-none!" : "bg-red-300 hover:bg-rose-500"}`}
                  onClick={() => handleUpdateStatus("new")}
                >
                  <span>
                    <ThumbsDown />
                  </span>
                  <span>Chưa thuộc</span>
                </Button>
                <Button
                  className={`p-0! w-38 h-18 flex flex-col rounded-2xl! items-center justify-center gap-2 ${isMastered ? "bg-green-500! shadow-green-500/20" : "bg-green-300!  hover:bg-green-400!"}`}
                  onClick={() => handleUpdateStatus("mastered")}
                >
                  <span>
                    <ThumbsUp />
                  </span>
                  <span>Đã thuộc</span>
                </Button>
              </div>

              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full border border-slate-200 text-slate-400 hover:text-primary hover:border-primary flex items-center justify-center cursor-pointer"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className=" flex flex-col items-center justify-center h-150 w-full gap-5 mt-10">
          <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center text-green-500">
            <ThumbsUp size={32} />
          </div>
          <h1 className="text-4xl font-bold">Hoàn thành xuất sắc!</h1>
          <p className="text-gray-500">
            Bạn đã ôn tập xong bộ flashcard hôm nay.
          </p>

          <div className="flex flex-col items-center gap-3 w-full max-w-3xs">
            <button
              onClick={handleRestart}
              className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw size={20} />
              Học lại bộ này
            </button>

            <button
              onClick={() => router.push("/flashcards")}
              className="w-full text-gray-500 hover:text-gray-700 flex items-center justify-center gap-2 border px-6 py-3 rounded-full cursor-pointer"
            >
              <ChevronLeft size={18} />
              Quay về danh sách
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default FlashcardsDetail;
