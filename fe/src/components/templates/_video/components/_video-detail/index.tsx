"use client";
import { Bookmark, Clock, MessageCircle, Plus, ThumbsUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Button from "@/src/components/atoms/button";
import { Card, CardContent } from "@/src/components/atoms/card";
import { useAppDispatch } from "@/src/hooks/useHookReducers";
import useNotification from "@/src/hooks/useNotification";
import { getVideoById } from "@/src/services/video/inedx";
import { IVideoItem } from "@/src/types/interface";
import { formatTimeAgo } from "@/src/helpers/format-time";
import YouTube from "react-youtube";

const VideoDetail = () => {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { notify } = useNotification();
  const [comment, setComment] = useState("");
  const [video, setVideo] = useState<IVideoItem>();
  const [notes, setNotes] = useState([]);
  const [progress, setProgress] = useState(null);
  const playerRef = useRef(null);
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const result = await dispatch(getVideoById(id)).unwrap();

        setVideo(result.video);
        setNotes(result.notes);
        setProgress(result.progress);
      } catch (err) {
        console.log(err);
      }
    };

    if (id) fetchVideo();
  }, [id]);
  console.log("ádasdasd", video);

  const formatViews = (views: number) => {
    if (views >= 1_000_000) return (views / 1_000_000).toFixed(1) + "M";
    if (views >= 1_000) return (views / 1_000).toFixed(1) + "K";
    return views.toString();
  };

  const comments = [
    {
      id: 1,
      name: "Nguyễn Thu Thủy",
      avatar: "https://i.pravatar.cc/40?img=1",
      time: "2 giờ trước",
      content:
        "Cảm ơn cô giáo! Phần này giải thích rất rõ. Tôi hiểu hơn về thanh điệu rồi.",
      likes: 12,
    },
    {
      id: 2,
      name: "Trần Minh Hoàng",
      avatar: "https://i.pravatar.cc/40?img=2",
      time: "5 giờ trước",
      content:
        "Bài giảng quá hay! Có thể giải thích thêm về từ '认为' không ạ?",
      likes: 8,
    },
    {
      id: 3,
      name: "Lê Mỹ Linh",
      avatar: "https://i.pravatar.cc/40?img=3",
      time: "1 ngày trước",
      content:
        "Tôi đã luyện tập theo hướng dẫn của cô và kết quả khá tốt. Cảm ơn!",
      likes: 24,
    },
  ];

  return (
    <div className="p-10 flex flex-col gap-10">
      <div className="flex justify-end">
        <Button
          size="sm"
          className="gap-1 rounded-lg bg-primary hover:bg-primary/90 whitespace-nowrap inline-flex items-center"
          onClick={() => router.back()}
        >
          Quay lại
        </Button>
      </div>
      <div className="flex flex-col xl:flex-row gap-8">
        <div className="flex-1 space-y-6">
          <div className="rounded-2xl overflow-hidden">
            {video?.type === "youtube" ? (
              <YouTube
                videoId={video.videoId}
                opts={{
                  width: "100%",
                  height: "500",
                }}
                onReady={(event) => {
                  playerRef.current = event.target;
                }}
              />
            ) : (
              <video
                className="w-full h-125 object-cover"
                src={video?.videoUrl}
                controls
              />
            )}
          </div>

          <div className="flex justify-between">
            <div></div>
            <button className="flex justify-center items-center gap-2  border rounded-2xl px-4 py-1.5 text-sm hover:bg-slate-100 cursor-pointer">
              <Bookmark size={16} />
              Lưu video
            </button>
          </div>

          <Card>
            <CardContent className="space-y-4">
              <h3 className="text-3xl font-bold line-clamp-2">
                {video?.title}
              </h3>
              <p className="text-slate-500">
                {video?.type === "youtube"
                  ? video?.author
                  : video?.type === "s3"
                    ? video.createdBy?.name
                    : "Tác giả ẩn danh"}{" "}
              </p>
              <p className="text-slate-500">
                {formatViews(video?.views ?? 0)} lượt xem •{" "}
                {formatTimeAgo(video?.publishedAt)}
              </p>
              <p className="bg-blue-100 hover:bg-blue-200 text-blue-600 py-0.5 px-4 rounded-full text-xs font-semibold w-fit">
                HSK {video?.level}
              </p>
              <p className="text-slate-500">{video?.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-xl font-bold">
                <MessageCircle size={22} />
                Bình luận (3)
              </div>

              <div className="flex gap-3 items-start w-full">
                <Image
                  src="https://i.pravatar.cc/40"
                  alt="avatar"
                  width={40}
                  height={40}
                  className="rounded-full "
                />

                <div className="flex-1 space-y-3">
                  <input
                    placeholder="Viết bình luận..."
                    className="w-full border border-slate-200  rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-md"
                  />
                  <div className="flex justify-end gap-3">
                    <button className="border rounded-full px-4 py-1.5 text-sm hover:bg-slate-100 cursor-pointer">
                      Hủy
                    </button>

                    <button className="bg-red-500 text-white rounded-full px-4 py-1.5 text-sm hover:bg-red-600 cursor-pointer">
                      Gửi
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {comments.map((item, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex gap-4 items-center">
                        <p className="font-bold text-lg">{item.name}</p>
                        <span className="text-slate-500 text-sm">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-lg text-slate-500">{item.content}</p>
                      <div className="flex items-center gap-8 mt-4">
                        <div className="flex justify-center items-center gap-1 text-slate-500 ">
                          <ThumbsUp size={16} />
                          {item.likes}
                        </div>

                        <button className="hover:text-blue-500 items-center text-slate-500">
                          Trả lời
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full xl:w-100 shrink-0 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-2xl">📝 Ghi chú của tôi</h3>
            <button className="text-sm border rounded-full px-3 py-1 cursor-pointer">
              Ẩn
            </button>
          </div>

          <Card>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-500 mb-1 font-bold">
                GHI CHÚ TẠI 0:00
              </p>

              <textarea
                className="w-full h-20 border border-slate-200 rounded-xl px-4 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Ghi chú của bạn..."
              />

              <Button className="flex w-full items-center justify-center gap-2 font-black text-base rounded-full!">
                <Plus size={16} />
                Thêm ghi chú
              </Button>
            </CardContent>
          </Card>

          {[1, 2, 3].map((item, index) => (
            <Card key={index}>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-red-500 text-sm font-bold flex items-center gap-1">
                    <Clock size={14} /> 00:15
                  </p>
                  <p className="font-semibold">Thanh 1 vs Thanh 2</p>
                  <p className="text-xs text-slate-500">
                    Thanh 1 cao ngang, thanh 2 lên cao
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
export default VideoDetail;
