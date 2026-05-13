/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Filter, Plus, Search, Volume2 } from "lucide-react";
import Button from "../../atoms/button";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "../../atoms/card";
import { IVocabulary, IVocabularyTopic } from "@/src/types/interface";
import { useAppDispatch } from "@/src/hooks/useHookReducers";
import {
  addVocabularyToFlashcard,
  getTopic,
  getVocabulary,
} from "@/src/services/vocabulary";
import useNotification from "@/src/hooks/useNotification";
import { Dropdown, Pagination } from "antd";
import ScrollContainer from "react-indiana-drag-scroll";
import HanziAnimation from "../../atoms/hanzi-animation";
import { useQueryParams } from "@/src/hooks/useQueryParams";
import { getAllFlashCardDeck } from "@/src/services/flashCardDeck";

const VocabularyPage = () => {
  const [activeTopic, setActiveTopic] = useState("Tất cả");
  const dispatch = useAppDispatch();
  const { searchParams, setQuery } = useQueryParams();
  const { notify } = useNotification();

  const topicId = searchParams.get("topicId");
  const page = Number(searchParams.get("page") || 1);
  const pageSize = Number(searchParams.get("pageSize") || 12);
  const selectedLevel = searchParams.get("level")
    ? Number(searchParams.get("level"))
    : null;
  const keyword = searchParams.get("keyword") || "";
  const [search, setSearch] = useState(keyword);

  const [topic, setTopic] = useState<IVocabularyTopic[]>([]);
  const [vocabulary, setVocabulary] = useState<IVocabulary[]>([]);
  const [total, setTotal] = useState(0);
  const hasFetched = useRef(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [flashcardDecks, setFlashcardDecks] = useState<any[]>([]);
  const [openPlusId, setOpenPlusId] = useState<string | null>(null);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const loadListTopic = async () => {
      try {
        const res = await dispatch(getTopic({ pageSize: 100 })).unwrap();
        setTopic(res);
        notify("success", "Lấy dữ liệu thành công");
      } catch (error) {
        notify("error", "Lỗi không thể lấy danh sách chủ đề");
      }
    };

    loadListTopic();
  }, []);

  useEffect(() => {
    const loadVocabulary = async () => {
      try {
        const res = await dispatch(
          getVocabulary({
            topicId: topicId || undefined,
            page,
            pageSize,
            level: selectedLevel || undefined,
            keyword: keyword || undefined,
          }),
        ).unwrap();
        setVocabulary(res.vocabularies);
        setTotal(res.totalResults);
      } catch (err: any) {
        notify("error", err.message || "Lỗi không thể lấy danh sách từ vựng");
      }
    };

    loadVocabulary();
  }, [topicId, page, pageSize, selectedLevel, keyword]);

  const handleChangePage = (page: number, pageSize: number) => {
    setQuery({
      page,
      pageSize,
    });
  };

  const handleChangePageSize = (_: number, pageSize: number) => {
    setQuery({
      page: 1,
      pageSize,
    });
  };

  const items = [
    {
      key: "all",
      label: (
        <span
          className={selectedLevel === null ? "text-red-500 font-semibold" : ""}
          onClick={() =>
            setQuery({
              level: null,
              page: 1,
            })
          }
        >
          Tất cả
        </span>
      ),
    },
    ...[1, 2, 3, 4, 5, 6].map((lvl) => ({
      key: lvl,
      label: (
        <span
          className={selectedLevel === lvl ? "text-red-500 font-semibold" : ""}
          onClick={() =>
            setQuery({
              level: lvl,
              page: 1,
            })
          }
        >
          HSK {lvl}
        </span>
      ),
    })),
  ];

  const playAudio = (url: string) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    audioRef.current = new Audio(url);
    audioRef.current.play();
  };

  // flashcard
  useEffect(() => {
    const loadDecks = async () => {
      try {
        const res = await dispatch(
          getAllFlashCardDeck({ page: 1, pageSize: 100 }),
        ).unwrap();

        setFlashcardDecks(res.flashcardDecks);
      } catch (err: any) {
        notify("error", err.message || "Không load được flashcard deck");
      }
    };

    loadDecks();
  }, []);
  console.log("firsdfdt", flashcardDecks);

  const handleAddToFlashcard = async (deckId: string, vocabularyId: string) => {
    try {
      await dispatch(
        addVocabularyToFlashcard({
          deckId,
          vocabularyId,
        }),
      ).unwrap();

      notify("success", "Đã thêm vào flashcard");

      setOpenPlusId(null);
    } catch (err: any) {
      notify("error", err.message || "Thêm thất bại");
    }
  };
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
        <form
          onSubmit={(e) => {
            e.preventDefault();

            setQuery({
              keyword: search || null,
              page: 1,
            });
          }}
          className="flex-1"
        >
          <div className="relative w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => {
                const value = e.target.value;
                setSearch(value);

                if (!value) {
                  setQuery({
                    keyword: null,
                    page: 1,
                  });
                }
              }}
              type="search"
              placeholder="Tìm kiếm bằng Hanzi, Pinyin hoặc Tiếng Việt..."
              className="pl-9 w-full pr-4 py-2 bg-white rounded-xl! border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </form>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <button className="border px-4 py-2 rounded-xl text-sm cursor-pointer flex gap-2 items-center">
            <Filter className="h-4 w-4" /> Lọc nâng cao
          </button>
        </Dropdown>
      </div>

      <ScrollContainer className="flex gap-2">
        <Button
          className={`min-w-27.5 py-2 rounded-full! text-sm font-medium transition-all ${
            activeTopic === "Tất cả"
              ? "bg-red-500 text-white shadow-md shadow-red-200 border-transparent"
              : "bg-white text-gray-700! border border-gray-200 hover:bg-primary/70! hover:text-white! shadow-none!"
          }`}
          onClick={() => {
            setActiveTopic("Tất cả");
            setQuery({
              topicId: null,
              page: 1,
            });
          }}
        >
          Tất cả
        </Button>
        {topic.map((topic, index) => (
          <Button
            key={index}
            className={`min-w-38 py-2 rounded-full! text-sm font-medium transition-all whitespace-nowrap ${activeTopic === topic.name ? "bg-red-500 text-white shadow-md shadow-red-200 border-transparent" : "bg-white text-gray-700! border border-gray-200 hover:bg-primary/70! hover:text-white! shadow-none!"}`}
            onClick={() => {
              setActiveTopic(topic.name);
              setQuery({
                topicId: topic._id,
                page: 1,
              });
            }}
          >
            {topic.name}
          </Button>
        ))}
      </ScrollContainer>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {vocabulary.map((item, index) => (
          <Card
            key={index}
            className="group overflow-hidden border border-slate-200 rounded-2xl! hover:shadow-xl! shadow-lg! transition-all cursor-pointer"
          >
            <CardContent className="p-0 relative">
              <div className="absolute top-0 left-0 w-full flex items-center justify-between px-4 py-3 bg-slate-200 border-b border-slate-200">
                <span className="text-xs border border-black px-2 py-0.5 rounded-full font-medium">
                  HSK {item.level}
                </span>

                <div className="flex items-center gap-3 text-slate-400">
                  <Volume2
                    className="w-4 h-4 cursor-pointer hover:text-slate-700"
                    onClick={() => playAudio(item.audio)}
                  />
                  <Dropdown
                    trigger={["click"]}
                    menu={{
                      items:
                        flashcardDecks.length > 0
                          ? flashcardDecks.map((deck) => ({
                              key: deck._id,
                              label: deck.title,
                              onClick: () =>
                                handleAddToFlashcard(deck._id, item._id),
                            }))
                          : [
                              {
                                key: "empty",
                                label: (
                                  <span className="text-slate-400 cursor-default">
                                    Chưa có flashcard
                                  </span>
                                ),
                                disabled: true,
                              },
                            ],
                    }}
                  >
                    <Plus className="w-4 h-4 cursor-pointer hover:text-slate-700" />
                  </Dropdown>
                </div>
              </div>

              <div className="pt-12 p-6 text-center">
                <div className="mb-2 flex justify-center items-center">
                  <HanziAnimation hanzi={item.hanzi} />
                </div>

                <p className="text-lg text-slate-500 mb-1">{item.pinyin}</p>

                <p className="text-slate-700 font-semibold mb-4">
                  {item.meaning}
                </p>

                <div className="border-t border-slate-200 pt-4 flex justify-center gap-3">
                  <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full font-medium">
                    Viết: {item.strokeCount} nét
                  </span>

                  <span className="bg-purple-100 text-purple-600 text-xs px-3 py-1 rounded-full font-medium">
                    Bộ: {item.radical} (Khẩu)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {vocabulary.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500">
            Không tìm thấy từ vựng nào phù hợp với tìm kiếm của bạn.
          </div>
        )}
      </div>

      <Pagination
        align="end"
        current={page}
        pageSize={pageSize}
        total={total}
        showSizeChanger
        onChange={handleChangePage}
        onShowSizeChange={handleChangePageSize}
      />
    </div>
  );
};
export default VocabularyPage;
