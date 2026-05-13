/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ChevronLeft, Clock, Volume2, CheckCircle2, Mic } from "lucide-react";
import { Badge, Button, Progress } from "antd";
import { Card, CardContent } from "@/src/components/atoms/card";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch } from "@/src/hooks/useHookReducers";
import { getHSKExamDetail, submitHSKExam } from "@/src/services/hsk";
import { ExamData } from "../../type";
import Timer from "../_time";
import { useParams } from "next/navigation";

export default function HSKExamDetail() {
  const params = useParams();
  const id = params.id as string;
  const [examData, setExamData] = useState<ExamData | null>(null);
  const dispatch = useAppDispatch();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<any[]>([]);
  const [writingAnswer, setWritingAnswer] = useState<string>("");
  const [orderAnswers, setOrderAnswers] = useState<Record<number, string[]>>(
    {},
  );

  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await dispatch(getHSKExamDetail(id)).unwrap();

        setExamData(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchExam();
  }, [dispatch]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  // ================= SAFE DATA =================
  const sections = examData?.sections ?? [];

  const allQuestions = useMemo(() => {
    return sections.flatMap((s: any) => s.questions ?? []);
  }, [sections]);

  const totalQuestions = allQuestions.length;

  // ================= FIND CURRENT QUESTION =================
  let currentQ: any = null;
  let sectionIndex = 0;

  let counter = 0;

  for (let i = 0; i < sections.length; i++) {
    const qs = sections[i].questions ?? [];

    for (let j = 0; j < qs.length; j++) {
      if (counter === currentQuestionIndex) {
        currentQ = qs[j];
        sectionIndex = i;
        break;
      }
      counter++;
    }

    if (currentQ) break;
  }

  const handleSelectAnswer = (value: any) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const mapIndexToABC = ["A", "B", "C", "D"];

      const payload = {
        examId: id,
        spentTime: 45 * 60 - 0,
        answers: allQuestions.map((q, idx) => ({
          questionNumber: q.questionNumber,
          answer:
            typeof answers[idx] === "number"
              ? mapIndexToABC[answers[idx]]
              : (answers[idx] ?? ""),
        })),
      };

      const res = await dispatch(submitHSKExam(payload)).unwrap();

      setShowResults(true);
      setResults(res);
    } catch (err) {
      console.error("Submit error:", err);
    }
  };
  // Tính điểm
  const correctAnswers = allQuestions.filter(
    (q, idx) => answers[idx] === q.correctAnswer,
  ).length;
  const score = Math.round((correctAnswers / totalQuestions) * 300); // HSK 3 max 300 điểm

  if (showResults) {
    return (
      <div className="max-w-3xl mx-auto py-8 space-y-8">
        <Link href="/hsk">
          <Button className="gap-2 rounded-lg">
            <ChevronLeft size={18} /> Quay lại
          </Button>
        </Link>

        {/* Kết quả */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 text-white text-center space-y-6 shadow-xl">
          <h2 className="text-4xl font-black">Kết quả thi</h2>
          <div className="space-y-2">
            <p className="text-6xl font-black text-primary">{score}</p>
            <p className="text-xl text-slate-300">/300 điểm</p>
          </div>
          <div className="pt-4">
            {score >= 180 ? (
              <Badge className="bg-green-500 text-white border-0 px-4 py-2 text-base">
                ✓ Đạt HSK 3
              </Badge>
            ) : (
              <Badge className="bg-amber-500 text-white border-0 px-4 py-2 text-base">
                Cần ôn thêm
              </Badge>
            )}
          </div>
        </div>

        {/* Chi tiết */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8 space-y-6">
            <h3 className="text-xl font-bold text-slate-900">
              Phân tích chi tiết
            </h3>

            <div className="space-y-4">
              {examData?.sections.map((section) => {
                const sectionAnswers =
                  results?.answers?.filter(
                    (a: any) => a.sectionKey === section.key,
                  ) || [];

                const correctInSection = sectionAnswers.filter(
                  (a: any) => a.isCorrect,
                ).length;

                return (
                  <div
                    key={section.key}
                    className="p-4 bg-slate-50 rounded-2xl"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-900">
                        {section.name}
                      </span>

                      <span className="font-bold text-primary">
                        {correctInSection}/{sectionAnswers.length}
                      </span>
                    </div>

                    <Progress
                      percent={
                        sectionAnswers.length
                          ? (correctInSection / sectionAnswers.length) * 100
                          : 0
                      }
                      className="h-2"
                    />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Button
          className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold"
          onClick={() => (window.location.href = "/hsk")}
        >
          Làm đề khác
        </Button>
      </div>
    );
  }
  const handleSelectOrder = (key: string) => {
    setOrderAnswers((prev) => {
      const current = prev[currentQuestionIndex] || [];

      let updated;

      if (current.includes(key)) {
        updated = current.filter((x) => x !== key);
      } else {
        updated = [...current, key];
      }

      return {
        ...prev,
        [currentQuestionIndex]: updated,
      };
    });
  };
  const handleWritingChange = (value: string) => {
    setWritingAnswer(value);

    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);
  };

  const isAnswered = (idx: number) => {
    return answers[idx] !== undefined || (orderAnswers[idx]?.length ?? 0) > 0;
  };

  const answeredCount = allQuestions.filter((_, idx) => isAnswered(idx)).length;

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/hsk">
          <Button className="gap-2">
            <ChevronLeft size={18} /> Quay lại
          </Button>
        </Link>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            {examData?.title}
          </h1>
          <p className="text-slate-500 text-sm mt-1 flex items-center justify-center gap-1">
            <Clock size={14} /> Thời gian còn lại: <Timer initial={45 * 60} />
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-slate-600">Câu hỏi</p>
          <p className="text-2xl font-black text-primary">
            {currentQuestionIndex + 1}/{totalQuestions}
          </p>
        </div>
      </div>

      {/* Progress bar toàn bộ */}

      <div className="w-full mb-2 space-y-1">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>
            {answeredCount} / {totalQuestions} câu đã trả lời
          </span>

          <span>
            {totalQuestions
              ? Math.round((answeredCount / totalQuestions) * 100)
              : 0}
            %
          </span>
        </div>

        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{
              width: `${totalQuestions ? (answeredCount / totalQuestions) * 100 : 0}%`,
            }}
          />
        </div>
      </div>

      {/* Tabs điều hướng phần thi */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {examData?.sections.map((section, sIdx) => {
          const isActive = sectionIndex === sIdx;
          const startIndex = examData.sections
            .slice(0, sIdx)
            .reduce((acc, curr) => acc + curr.questions.length, 0);
          return (
            <Button
              key={section.key}
              type={isActive ? "primary" : "default"}
              className="rounded-xl whitespace-nowrap"
              onClick={() => setCurrentQuestionIndex(startIndex)}
            >
              {section.name}
            </Button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Cột trái: Khu vực câu hỏi */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-0 shadow-md bg-white rounded-2xl overflow-hidden">
            <CardContent className="p-6 sm:p-8 space-y-6">
              {/* Tiêu đề câu hỏi */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                  {currentQuestionIndex + 1}
                </div>
                <div className="flex-1 mt-1">
                  <h3 className="text-lg font-bold text-slate-900">
                    {currentQ?.question}
                  </h3>
                </div>
              </div>

              {/* Nút nghe (nếu có audio) */}
              {currentQ?.audio && (
                <Button className="gap-2 rounded-lg border-slate-200 text-primary hover:border-primary w-full sm:w-auto">
                  <Volume2 size={18} /> Nghe Audio câu hỏi
                </Button>
              )}

              {/* Nội dung bổ sung cho phần nói */}
              {currentQ?.content && (
                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-lg text-slate-800 text-center font-medium my-4">
                  {currentQ?.content}
                </div>
              )}

              {/* Các lựa chọn hoặc Ghi âm */}
              {currentQ?.type === "single_choice" && (
                <div className="space-y-3 pt-4">
                  {currentQ?.options.map((option: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectAnswer(idx)}
                      className={`w-full p-4 rounded-2xl border-2 ${
                        answers[currentQuestionIndex] === idx
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-slate-200"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
              {currentQ?.type === "ordering" && (
                <div className="space-y-3">
                  <p className="text-slate-500 text-sm">
                    Chọn theo thứ tự đúng (A → B → C)
                  </p>

                  {currentQ.options.map((option: string, idx: number) => {
                    const key = option[0];

                    const selected = (
                      orderAnswers[currentQuestionIndex] || []
                    ).includes(key);

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOrder(key)}
                        className={`w-full p-4 rounded-xl border text-left transition ${
                          selected
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-slate-200"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}

                  <div className="mt-3 text-sm">
                    Đáp án của bạn:{" "}
                    <b>{(orderAnswers[currentQuestionIndex] || []).join("")}</b>
                  </div>
                </div>
              )}
              {currentQ?.type === "sentence_writing" && (
                <div className="space-y-3">
                  <p className="text-slate-500 text-sm">
                    Viết lại câu hoàn chỉnh:
                  </p>

                  <textarea
                    className="w-full p-4 border rounded-xl min-h-[120px]"
                    value={answers[currentQuestionIndex] || ""}
                    onChange={(e) => handleWritingChange(e.target.value)}
                    placeholder="Nhập câu..."
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Nút điều hướng */}
          <div className="flex gap-4">
            <Button
              className="flex-1 rounded-xl h-12 border-slate-200"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              ← Câu trước
            </Button>
            {currentQuestionIndex === totalQuestions - 1 ? (
              <Button
                className="flex-1 rounded-xl h-12 bg-primary hover:bg-primary/90 text-white font-bold"
                onClick={handleSubmit}
              >
                Nộp bài
              </Button>
            ) : (
              <Button
                className="flex-1 rounded-xl h-12 bg-primary hover:bg-primary/90 text-white font-bold"
                onClick={handleNext}
              >
                Câu tiếp →
              </Button>
            )}
          </div>
        </div>

        {/* Cột phải: Bảng điều khiển */}
        <div className="lg:col-span-1">
          <Card className="border border-slate-200 shadow-sm bg-white rounded-2xl sticky top-4">
            <CardContent className="p-6">
              <h3 className="font-bold text-slate-900 text-lg mb-6">
                Bảng câu hỏi
              </h3>

              <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {examData?.sections.map((section, sIdx) => {
                  const startIndex = examData.sections
                    .slice(0, sIdx)
                    .reduce((acc, curr) => acc + curr.questions.length, 0);
                  return (
                    <div key={section.key} className="space-y-3">
                      <div className="flex justify-between items-center text-sm font-bold text-slate-600 border-b border-slate-100 pb-2">
                        <span>{section.name}</span>
                        <span className="text-primary">
                          {section.questions.length} câu
                        </span>
                      </div>
                      <div className="grid grid-cols-5 sm:grid-cols-5 gap-2">
                        {section.questions.map((_, qIdx) => {
                          const globalIdx = startIndex + qIdx;
                          const isAnswered =
                            answers[globalIdx] !== undefined ||
                            orderAnswers[globalIdx]?.length > 0;
                          return (
                            <button
                              key={globalIdx}
                              onClick={() => setCurrentQuestionIndex(globalIdx)}
                              className={`w-full aspect-square rounded-lg flex items-center justify-center text-xs font-bold transition-all ${
                                globalIdx === currentQuestionIndex
                                  ? "bg-primary text-white shadow-md shadow-primary/30"
                                  : isAnswered
                                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                              }`}
                              title={`Câu ${globalIdx + 1}`}
                            >
                              {globalIdx + 1}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-4 h-4 rounded bg-primary"></div> Đang chọn
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-4 h-4 rounded bg-green-100"></div> Đã trả
                  lời
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <div className="w-4 h-4 rounded bg-slate-100"></div> Chưa trả
                  lời
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
