"use client";
import { Filter, Plus, Search, Volume2 } from "lucide-react";
import Button from "../../atoms/button";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "../../atoms/card";
import { IVocabulary, IVocabularyTopic } from "@/src/types/interface";
import { useAppDispatch } from "@/src/hooks/useHookReducers";
import { getTopic, getVocabulary } from "@/src/services/vocabulary";
import useNotification from "@/src/hooks/useNotification";
import { useRouter, useSearchParams } from "next/navigation";
import { Pagination } from "antd";
import ScrollContainer from "react-indiana-drag-scroll";

const VocabularyPage = () => {
  const [activeTopic, setActiveTopic] = useState("Tất cả");
  const dispatch = useAppDispatch();
  const { notify } = useNotification();
  const router = useRouter();

  const searchParams = useSearchParams();
  const topicId = searchParams.get("topicId");
  const page = Number(searchParams.get("page") || 1);
  const pageSize = Number(searchParams.get("pageSize") || 10);

  const [topics, setTopic] = useState<IVocabularyTopic[]>([]);
  const [vocabulary, setVocabulary] = useState<IVocabulary[]>([]);
  const [total, setTotal] = useState(0);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const loadListTopic = async () => {
      try {
        const res = await dispatch(getTopic()).unwrap();
        setTopic(res || []);
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
          }),
        ).unwrap();
        setVocabulary(res.vocabularies);
        setTotal(res.totalResults);
      } catch (err) {
        notify("error", "Lỗi load từ vựng");
      }
    };

    loadVocabulary();
  }, [topicId, page, pageSize]);

  const handleChangePage = (page: number, pageSize: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(page));
    params.set("pageSize", String(pageSize));

    router.push(`/vocabulary?${params.toString()}`);
  };

  const handleChangePageSize = (current: number, pageSize: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", "1");
    params.set("pageSize", String(pageSize));

    router.push(`/vocabulary?${params.toString()}`);
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

      <ScrollContainer className="flex gap-2">
        <Button
          className={`min-w-27.5 py-2 rounded-full! text-sm font-medium transition-all ${
            activeTopic === "Tất cả"
              ? "bg-red-500 text-white shadow-md shadow-red-200 border-transparent"
              : "bg-white text-gray-700! border border-gray-200 hover:bg-primary/70! hover:text-white! shadow-none!"
          }`}
          onClick={() => {
            setActiveTopic("Tất cả");
            router.push("/vocabulary");
          }}
        >
          Tất cả
        </Button>
        {topics.map((topic, index) => (
          <Button
            key={index}
            className={`min-w-27.5 py-2 rounded-full! text-sm font-medium transition-all ${activeTopic === topic.name ? "bg-red-500 text-white shadow-md shadow-red-200 border-transparent" : "bg-white text-gray-700! border border-gray-200 hover:bg-primary/70! hover:text-white! shadow-none!"}`}
            onClick={() => {
              setActiveTopic(topic.name);
              router.push(`/vocabulary?topicId=${topic._id}`);
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
                <span className="text-xs border border-black px-2 py-[2px] rounded-full font-medium">
                  HSK {item.level}
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
