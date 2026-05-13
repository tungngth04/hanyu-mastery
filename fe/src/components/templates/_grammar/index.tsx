/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { BookMarked, CheckCircle2, ChevronDown, Layers } from "lucide-react";
import { Card, CardContent } from "../../atoms/card";
import Button from "../../atoms/button";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/src/hooks/useHookReducers";
import useNotification from "@/src/hooks/useNotification";
import {
  getGrammarSidebar,
  getLessonDetail,
  updateGrammarProgress,
} from "@/src/services/grammar";

const GrammarPage = () => {
  const dispatch = useAppDispatch();
  const { notify } = useNotification();

  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [topics, setTopics] = useState<any[]>([]);
  const [currentLesson, setCurrentLesson] = useState<any>(null);
  const [stats, setStats] = useState({
    totalLessons: 0,
    completedLessons: 0,
    percent: 0,
  });

  const handleClickLesson = async (lessonId: string) => {
    try {
      const res = await dispatch(getLessonDetail(lessonId)).unwrap();
      setCurrentLesson(res.data);
      const topicIndex = topics.findIndex((t) =>
        t.lessons.some((l: any) => l.id === lessonId),
      );

      if (topicIndex !== -1) {
        setOpenIndex(topicIndex);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchSidebar = async () => {
      try {
        const res = await dispatch(getGrammarSidebar()).unwrap();

        const mapped = res.data.map((topic: any) => ({
          id: topic._id,
          title: topic.title,
          completed: topic.completed,
          total: topic.total,
          lessons: topic.lessons.map((l: any) => ({
            id: l._id,
            title: l.title,
            status: l.status,
          })),
        }));

        setTopics(mapped);
        setStats(res.stats);

        const firstLesson =
          mapped
            .flatMap((t: any) => t.lessons)
            .find((l: any) => l.status === "pending") ||
          mapped.flatMap((t: any) => t.lessons)[0];

        if (firstLesson) {
          handleClickLesson(firstLesson.id);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchSidebar();
  }, []);

  const handleNextLesson = async () => {
    const allLessons = topics.flatMap((t) => t.lessons);
    const currentIndex = allLessons.findIndex((l) => l.id === currentLesson.id);

    const current = allLessons[currentIndex];
    const next = allLessons[currentIndex + 1];

    await dispatch(
      updateGrammarProgress({
        lessonId: current.id,
        progressPercent: 100,
      }),
    );

    const res = await dispatch(getGrammarSidebar()).unwrap();

    const mapped = res.data.map((topic: any) => ({
      id: topic._id,
      title: topic.title,
      completed: topic.completed,
      total: topic.total,
      lessons: topic.lessons.map((l: any) => ({
        id: l._id,
        title: l.title,
        status: l.status,
      })),
    }));

    setTopics(mapped);
    setStats(res.stats);

    if (next) {
      await handleClickLesson(next.id);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="p-10 flex flex-col xl:flex-row gap-8">
      <div className="flex-1 space-y-6">
        <Card>
          <CardContent className="space-y-8">
            <div className="space-y-2">
              <span className="bg-purple-100 text-purple-700 text-sm px-3 py-1 rounded-full font-medium hover:bg-purple-200">
                Đang học: {currentLesson?.topic?.level}
              </span>
              <h1 className="text-3xl font-bold mt-2">
                {currentLesson?.title}
              </h1>
              <p className="flex items-center text-slate-500 gap-2">
                <BookMarked size={16} /> Bài {currentLesson?.orderIndex} • Ước
                lượng: {currentLesson?.duration} phút
              </p>
            </div>
            <div className="grammar-content">
              <div
                dangerouslySetInnerHTML={{
                  __html: currentLesson?.content || "",
                }}
              />
            </div>

            <div className="border-t border-slate-100 pt-8 flex gap-4 justify-end">
              <button className="border py-2 px-4 rounded-2xl cursor-pointer hover:bg-slate-200 ">
                Quay lại
              </button>
              <Button
                icon={<ChevronDown size={16} className="-rotate-90" />}
                className="whitespace-nowrap inline-flex items-center justify-center gap-4 rounded-2xl"
                onClick={handleNextLesson}
              >
                Bài tiếp theo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full xl:w-100 shrink-0 space-y-6">
        <Card>
          <CardContent className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg">
            <h3 className="font-bold text-lg mb-2">Tiến độ của bạn</h3>
            <div className="mb-4 flex gap-2 items-end">
              <span className="text-4xl font-black">
                {stats.completedLessons}
              </span>
              <span className="text-slate-400">/ {stats.totalLessons} bài</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 mb-2">
              <div
                className="bg-primary h-2 rounded-full"
                style={{ width: `${stats.percent}%` }}
              />
            </div>
            <p className="text-xs text-slate-400">
              Đã hoàn thành {stats.percent}% tổng số bài ngữ pháp
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-0!">
            <div className="flex items-center gap-2 px-6 py-4  bg-slate-50 rounded-t-2xl">
              <Layers size={20} className="text-slate-800" />
              <h3 className="font-bold text-slate-800 text-xl">Lộ trình học</h3>
            </div>
            {topics.map((item, index) => {
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
                      isOpen ? "max-h-100 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {item.lessons.map((lesson: any) => {
                      const isActive = currentLesson?.id === lesson.id;

                      return (
                        <li
                          key={lesson.id}
                          onClick={() => {
                            if (lesson.status === "locked") return;
                            handleClickLesson(lesson.id);
                          }}
                          className={`px-6 py-2.5 flex items-start gap-3 text-sm transition-colors cursor-pointer ${
                            isActive
                              ? "bg-red-100 text-red-700 font-semibold border-l-4 border-red-500"
                              : lesson.status === "done"
                                ? "text-green-600"
                                : lesson.status === "pending"
                                  ? "text-slate-700"
                                  : "text-slate-500 opacity-60"
                          }`}
                        >
                          {isActive ? (
                            <div className="w-4 h-4 rounded-full bg-red-500 mt-0.5 shrink-0" />
                          ) : lesson.status === "done" ? (
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
                      );
                    })}
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
