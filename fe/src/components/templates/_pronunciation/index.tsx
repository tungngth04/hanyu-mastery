"use client";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "../../atoms/card";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Info,
  Mic,
  Play,
  Volume2,
} from "lucide-react";
import Button from "../../atoms/button";
import { useAppDispatch } from "@/src/hooks/useHookReducers";
import {
  combinePinyin,
  getPinyin,
  uploadPronunciation,
} from "@/src/services/pronunciation";
import { IPronunciationResult, IVocabulary } from "@/src/types/interface";
import { getDaily } from "@/src/services/vocabulary";
import useNotification from "@/src/hooks/useNotification";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

type ChartRow = {
  time: number;
  [key: string]: number;
};

type PinyinData = {
  initials: string[];
  finals: string[];
  tones: {
    id: number;
    mark: string;
    name: string;
    desc: string;
    _id: string;
  }[];

  initialAudio: Record<string, string>;
  finalAudio: Record<string, string>;
  toneAudio: Record<string, string>;
};
const PronunciationPage = () => {
  const [level, setLevel] = useState("Luyện tập");
  const [recording, setRecording] = useState(false);
  const dispatch = useAppDispatch();
  const { notify } = useNotification();

  const [resultScore, setResultScore] = useState<IPronunciationResult | null>(
    null,
  );
  const [vocabulary, setVocabulary] = useState<IVocabulary[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentWord = vocabulary[currentIndex];

  const levels = ["Luyện tập", "Bảng Pinyin"];

  const getScoreMeta = (score?: number) => {
    if (!score && score !== 0) {
      return {
        label: "Chưa có",
        color: "gray",
        bg: "bg-gray-50",
        text: "text-gray-500",
        border: "border-gray-200",
      };
    }

    if (score >= 90) {
      return {
        label: "Rất tốt",
        color: "green",
        bg: "bg-green-50",
        text: "text-green-600",
        border: "border-green-200",
      };
    }

    if (score >= 75) {
      return {
        label: "Tốt",
        color: "blue",
        bg: "bg-blue-50",
        text: "text-blue-600",
        border: "border-blue-200",
      };
    }

    if (score >= 60) {
      return {
        label: "Khá",
        color: "yellow",
        bg: "bg-yellow-50",
        text: "text-yellow-600",
        border: "border-yellow-200",
      };
    }

    if (score >= 40) {
      return {
        label: "Yếu",
        color: "orange",
        bg: "bg-orange-50",
        text: "text-orange-600",
        border: "border-orange-200",
      };
    }

    return {
      label: "Kém",
      color: "red",
      bg: "bg-red-50",
      text: "text-red-600",
      border: "border-red-200",
    };
  };

  const scoreMeta = getScoreMeta(resultScore?.pronunciation);

  const colors = ["green", "orange", "red", "pink"];

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = async () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });

      try {
        const result = await dispatch(
          uploadPronunciation({ audio: blob, text: currentWord?.hanzi }),
        ).unwrap();
        setResultScore(result);
      } catch (error) {
        console.error("Upload thất bại:", error);
      }
    };

    mediaRecorder.start();

    setRecording(true);
  };
  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const toggleRecording = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const phonemeList = resultScore?.phonemes?.[0]?.phonemes || [];

  const makeCurve = (value: number): number[] => [
    value - 8,
    value + 6,
    value + 2,
    value,
  ];

  const chartData: ChartRow[] = [0, 1, 2, 3].map((t) => {
    const row: ChartRow = { time: t };

    phonemeList.forEach((p) => {
      const key = p.phoneme;
      const curve = makeCurve(p.accuracy);
      row[key] = curve[t];
    });

    return row;
  });

  useEffect(() => {
    const loadListTopic = async () => {
      try {
        const res = await dispatch(getDaily()).unwrap();
        setVocabulary(res);

        notify("success", "Lấy dữ liệu thành công");
      } catch (error) {
        notify("error", "Lỗi không thể lấy danh sách từ vựng theo ngày");
      }
    };

    loadListTopic();
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? vocabulary.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === vocabulary.length - 1 ? 0 : prev + 1));
  };

  const handlePlayAudio = () => {
    if (!currentWord?.audio) return;

    const audio = new Audio(currentWord.audio);
    audio.play().catch((err) => {
      console.error("Không phát được audio:", err);
    });
  };

  const handlePlaySlow = () => {
    if (!currentWord?.audio) return;

    const audio = new Audio(currentWord.audio);
    audio.playbackRate = 0.6;
    audio.play().catch((err) => {
      console.error("Không phát chậm được audio:", err);
    });
  };

  // Bảng Pinyin
  const [piyin, setPiyin] = useState<PinyinData>({
    initials: [],
    finals: [],
    tones: [],
    initialAudio: {},
    finalAudio: {},
    toneAudio: {},
  });

  useEffect(() => {
    const loadListTopic = async () => {
      try {
        const res = await dispatch(getPinyin()).unwrap();
        setPiyin(res);

        notify("success", "Lấy dữ liệu thành công");
      } catch (error) {
        notify("error", "Lỗi không thể lấy danh sách từ vựng theo ngày");
      }
    };

    loadListTopic();
  }, []);

  const [selectedInitial, setSelectedInitial] = useState<string | null>(null);
  const [selectedFinal, setSelectedFinal] = useState<string | null>(null);
  const [selectedTone, setSelectedTone] = useState<number | null>(null);
  const [combinedPinyin, setCombinedPinyin] = useState("");
  const [combinedAudio, setCombinedAudio] = useState("");
  const [isCombining, setIsCombining] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleCombine = async () => {
      if (!selectedFinal || !selectedTone) return;

      try {
        setIsCombining(true);

        const res = await dispatch(
          combinePinyin({
            initial: selectedInitial || "",
            final: selectedFinal,
            tone: selectedTone,
          }),
        ).unwrap();

        if (!res) return;

        setCombinedPinyin(res.pinyin);
        setCombinedAudio(res.audio);
      } catch (err) {
        console.error("Combine lỗi:", err);
      } finally {
        setTimeout(() => setIsCombining(false), 300);
      }
    };

    handleCombine();
  }, [selectedInitial, selectedFinal, selectedTone]);

  const playAudio = (url?: string, rate = 1) => {
    if (!url) return;

    // dừng audio cũ
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(url);
    audio.playbackRate = rate;

    audioRef.current = audio;

    audio.play().catch((err) => {
      console.error("Play error:", err);
    });
  };
  return (
    <div className="px-2 py-10 md:px-10">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Luyện phát âm chuẩn
        </h1>
        <p className="text-slate-500 mt-2 mb-2">
          Học cách phát âm Pinyin và luyện tập với công nghệ nhận diện giọng nói
          AI
        </p>
      </div>

      <div className="grid w-full sm:w-100 grid-cols-2 mb-8 bg-white border border-slate-200 rounded-full py-1 px-2">
        {levels.map((item, index) => (
          <button
            key={index}
            onClick={() => setLevel(item)}
            className={`px-4 py-1.5 text-sm rounded-full cursor-pointer transition ${
              level === item
                ? "bg-red-500 text-white"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      {level === "Luyện tập" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 slide-up">
          <Card>
            <CardContent className="flex flex-col justify-center items-center space-y-6">
              <div className="flex flex-col justify-center items-center space-y-2 w-full">
                <div className="flex justify-between items-center w-full mb-2">
                  <button
                    className="text-slate-400 hover:text-primary cursor-pointer"
                    onClick={handlePrev}
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <span className="bg-rose-100 hover:bg-rose-300 text-primary/80 py-0.5 px-4 rounded-full">
                    Từ vựng {currentIndex + 1}/{vocabulary.length}
                  </span>
                  <button
                    className="text-slate-400 hover:text-primary cursor-pointer"
                    onClick={handleNext}
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
                <h2 className="text-7xl font-chinese font-bold text-slate-900 tracking-wider mt-2 ">
                  {currentWord?.hanzi || "--"}
                </h2>
                <p className="text-2xl font-medium text-slate-500">
                  {currentWord?.pinyin || "--"}
                </p>
                <p className="text-slate-600 font-medium">
                  {currentWord?.meaning || "--"}
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handlePlayAudio}
                  className="rounded-full! w-14 h-14 p-0 bg-white border  border-slate-300 text-primary! hover:bg-slate-200! transition-all flex justify-center items-center shadow-slate-400/30! hover:scale-110"
                  title="Nghe âm thanh chuẩn"
                >
                  <Volume2 size={20} />
                </Button>
                <Button
                  onClick={handlePlaySlow}
                  className="rounded-full! w-14 h-14 p-0 bg-white border  border-slate-300 text-gray-900! hover:bg-slate-200! transition-all flex justify-center items-center shadow-slate-400/30! hover:scale-110"
                  title="Phát từ chậm"
                >
                  <Play size={20} className="ml-1" />
                </Button>
              </div>

              <div className="w-full pt-2 border-t border-slate-100 flex flex-col justify-center items-center">
                <p className="text-sm font-medium text-slate-500 mb-6">
                  Đến lượt bạn thử sức!
                </p>

                <Button
                  size="lg"
                  className={`rounded-full! w-24 h-24 shadow-lg border-0 transition-all duration-300 flex items-center justify-center ${
                    recording
                      ? "bg-rose-500 shadow-rose-500/30 scale-110 animate-pulse"
                      : "bg-primary shadow-primary/30 hover:scale-105"
                  }`}
                  onClick={toggleRecording}
                >
                  <Mic size={32} className="text-white" />
                </Button>
                <p className="mt-4 text-sm font-medium text-slate-600">
                  {recording ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="inline-block w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
                      Đang lắng nghe...
                    </span>
                  ) : (
                    "Nhấn để thu âm"
                  )}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardContent className="bg-linear-to-br from-indigo-50 to-white rounded-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-indigo-100 text-indigo-600 rounded-full">
                    <CheckCircle2 size={20} />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">
                    Đánh giá phát âm
                  </h3>
                </div>

                <div className="flex gap-3 items-end">
                  <span className="text-indigo-600  text-5xl font-black">
                    {resultScore?.pronunciation ?? "--"}
                  </span>
                  <span className="text-lg font-bold text-slate-500 mb-1">
                    /100
                  </span>
                  <span
                    className={`mb-2 flex items-center gap-1 px-2 py-0.5 rounded-full border ${scoreMeta.bg} ${scoreMeta.text} ${scoreMeta.border}`}
                  >
                    {scoreMeta.label}
                  </span>
                </div>

                <div className="space-y-4">
                  {phonemeList.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <p className="text-slate-500">
                          Độ chuẩn xác ({item.phoneme})
                        </p>
                        <p className={`text-${colors[index]}-600 font-bold`}>
                          {Math.round(item.accuracy)}%
                        </p>
                      </div>

                      <div className="bg-slate-100 h-3 w-full rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-${colors[index]}-500 rounded-full transition-all`}
                          style={{ width: `${item.accuracy}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-white/60 rounded-xl border border-indigo-100 backdrop-blur-sm">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    <strong className="text-indigo-700">Mẹo AI:</strong> Âm
                    &quot;liang&quot; bạn phát âm hơi giống thanh 4. Chữ này
                    trong từ &quot;piàoliang&quot; đọc là thanh nhẹ (khinh
                    thanh), bạn cần đọc ngắn và nhẹ hơn nhé!
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <div>
                  <h3 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-4">
                    <span>Biểu đồ thanh điệu</span>
                    <Info size={20} className="text-slate-400" />
                  </h3>
                </div>

                <div className="w-full h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />

                      {phonemeList.map((p, i) => (
                        <Line
                          key={p._id}
                          type="monotone"
                          dataKey={p.phoneme}
                          stroke={
                            ["#ef4444", "#3b82f6", "#22c55e", "#a855f7"][i % 4]
                          }
                          strokeWidth={3}
                          dot={{ r: 4 }}
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Bảng Pinyin */}
      {level === "Bảng Pinyin" && (
        <div className="slide-up">
          <Card>
            <CardContent className="space-y-10">
              <div className="space-y-4">
                <h3 className="font-bold text-xl text-slate-900">
                  Thanh mẫu (Phụ âm)
                </h3>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                  {piyin.initials.map((item, index) => (
                    <button
                      key={index}
                      onClick={async () => {
                        try {
                          const audioUrl = piyin?.initialAudio?.[item];

                          if (audioUrl) {
                            playAudio(audioUrl);
                          }

                          setSelectedInitial((prev) =>
                            prev === item ? null : item,
                          );
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      className={`h-12 border text-base font-bold hover:border-primary hover:text-primary hover:bg-primary/5 rounded-xl ${
                        selectedInitial === item
                          ? "bg-primary text-white border-primary"
                          : "border-slate-200"
                      } cursor-pointer group`}
                    >
                      <span>{item}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-xl text-slate-900">
                  Vận mẫu (Nguyên âm)
                </h3>
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                  {piyin.finals.map((item, index) => (
                    <button
                      key={index}
                      onClick={async () => {
                        try {
                          const audioUrl = piyin?.finalAudio?.[item];

                          if (audioUrl) {
                            playAudio(audioUrl);
                          }

                          setSelectedFinal((prev) =>
                            prev === item ? null : item,
                          );
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      className={`h-12 border text-base font-bold rounded-xl cursor-pointer
      ${
        selectedFinal === item
          ? "bg-primary text-white border-primary"
          : "border-slate-200 hover:border-primary hover:text-primary"
      }`}
                    >
                      <span>{item}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-xl text-slate-900">
                  4 Thanh điệu cơ bản
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                  {piyin?.tones.map((item, index) => (
                    <Card key={index} className="hover:border-primary!">
                      <CardContent
                        className={`group cursor-pointer ${
                          selectedTone === item.id
                            ? "border-primary bg-primary/10"
                            : "hover:border-primary"
                        } `}
                        onClick={async () => {
                          try {
                            setSelectedTone((prev) =>
                              prev === item.id ? null : item.id,
                            );
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-bold text-slate-400 ">
                            {item.name}
                          </span>
                          <span
                            className="h-8 w-8 text-primary opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center"
                            onClick={async () => {
                              try {
                                const audioUrl = piyin?.toneAudio?.[item.id];

                                if (audioUrl) {
                                  playAudio(audioUrl);
                                }
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                          >
                            <Volume2 size={18} />
                          </span>
                        </div>
                        <div>
                          <p className="text-5xl font-bold text-slate-900 text-center py-6 group-hover:text-primary transition-colors">
                            {item.mark}
                          </p>
                          <p className="text-sm text-slate-500 text-center font-medium">
                            {item.desc}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <div>
                  {combinedPinyin && (
                    <div className="flex gap-8 text-left mt-6 space-y-3">
                      <p className="text-2xl text-slate-500">Kết quả ghép:</p>

                      {/* <div className="flex  gap-4"> */}
                      <p className="text-3xl font-bold text-primary">
                        {combinedPinyin}
                      </p>

                      <button
                        onClick={() => {
                          if (!combinedAudio) return;

                          playAudio(combinedAudio);
                        }}
                        className="px-4  bg-primary  text-white rounded-lg flex items-center gap-2"
                      >
                        <Volume2 size={18} /> Nghe lại
                      </button>
                      {/* </div> */}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
export default PronunciationPage;
