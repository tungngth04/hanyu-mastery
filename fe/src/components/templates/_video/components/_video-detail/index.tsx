"use client";
import { Bookmark, Clock, MessageCircle, Plus, ThumbsUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Button from "@/src/components/atoms/button";
import { Card, CardContent } from "@/src/components/atoms/card";
import { useAppDispatch, useAppSelector } from "@/src/hooks/useHookReducers";
import useNotification from "@/src/hooks/useNotification";
import { getVideoById } from "@/src/services/video";
import { IVideoItem, IVideoNote, IVideoProgress } from "@/src/types/interface";
import { formatTimeAgo } from "@/src/helpers/format-time";
import YouTube from "react-youtube";
import { updateProgress } from "@/src/services/video/video_progress";
import { createNote } from "@/src/services/video/video_note";
import { saveVideo } from "@/src/services/video/video_save";
import socket from "@/src/constants/socket";
import {
  createComment,
  getCommentsByVideo,
} from "@/src/services/video/video_commnent";

const VideoDetail = () => {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { notify } = useNotification();

  const [video, setVideo] = useState<IVideoItem>();
  const [notes, setNotes] = useState<IVideoNote[]>([]);
  const [progress, setProgress] = useState<IVideoProgress>();
  const [noteContent, setNoteContent] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [showNote, setShowNote] = useState(true);
  const [videoSave, setVideoSave] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [comments, setComments] = useState<any[]>([]);
  const [commentInput, setCommentInput] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { userInfor } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const result = await dispatch(getVideoById(id)).unwrap();

        setVideo(result.video);
        setNotes(result.notes);
        setProgress(result.progress);
        setVideoSave(result.isSaved);
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

  const formatViews = (views: number) => {
    if (views >= 1_000_000) return (views / 1_000_000).toFixed(1) + "M";
    if (views >= 1_000) return (views / 1_000).toFixed(1) + "K";
    return views.toString();
  };

  // lấy thời gian hiện tại
  const getCurrentTime = () => {
    if (video?.type === "youtube") {
      return playerRef.current?.getCurrentTime() || 0;
    }
    return videoRef.current?.currentTime || 0;
  };

  // cập nhật thời gian sau mỗi 50s
  useEffect(() => {
    if (!video) return;

    const interval = setInterval(() => {
      const time = getCurrentTime();
      if (time < 1) return;

      dispatch(updateProgress({ videoId: id, currentTime: time }));
    }, 50000);

    return () => clearInterval(interval);
  }, [video]);

  // load video tới thời điểm đã lưu
  useEffect(() => {
    if (!progress || !video) return;

    const time = progress.currentTime;

    setTimeout(() => {
      if (video.type === "youtube") {
        playerRef.current?.seekTo(time, true);
      } else {
        if (videoRef.current) videoRef.current.currentTime = time;
      }
    }, 1000);
  }, [progress, video]);

  // nhảy tới 1 thời điểm cụ thể
  const seekTo = (time: number) => {
    if (video?.type === "youtube") {
      playerRef.current?.seekTo(time, true);
    } else {
      if (videoRef.current) videoRef.current.currentTime = time;
    }
  };

  const handleAddNote = async () => {
    const time = getCurrentTime();

    if (!noteContent) return;

    const res = await dispatch(
      createNote({
        videoId: id,
        time,
        content: noteContent,
      }),
    ).unwrap();

    setNotes((prev) => [...prev, res]);
    setNoteContent("");
  };

  const formatTime = (time: number | string) => {
    const totalSeconds = Math.floor(Number(time));

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const mm = String(minutes).padStart(2, "0");
    const ss = String(seconds).padStart(2, "0");

    return `${mm}:${ss}`;
  };

  const handleSaveVideo = async () => {
    try {
      const res = await dispatch(saveVideo({ videoId: id })).unwrap();

      setVideoSave(res.saved);

      if (res.saved) {
        notify("success", "Lưu video thành công");
      } else {
        notify("success", "Bỏ lưu video thành công");
      }
    } catch (error) {
      notify("error", "Có lỗi xảy ra");
    }
  };

  useEffect(() => {
    if (!id) return;

    const fetchComments = async () => {
      const res = await dispatch(getCommentsByVideo(id)).unwrap();
      setComments(res);
    };

    fetchComments();
  }, [id]);

  useEffect(() => {
    if (!id) return;

    socket.emit("join_video", id);

    socket.on("new_comment", (comment) => {
      setComments((prev) => [comment, ...prev]);
    });

    return () => {
      socket.off("new_comment");
    };
  }, [id]);

  const handleSendComment = async () => {
    if (!commentInput.trim()) return;

    await dispatch(
      createComment({
        videoId: id,
        content: commentInput,
      }),
    ).unwrap();

    setCommentInput("");
  };

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
                onReady={(e) => {
                  playerRef.current = e.target;
                  if (progress?.currentTime) {
                    e.target.seekTo(progress.currentTime, true);
                  }
                }}
                onStateChange={(e) => {
                  // 2 = pause (YouTube PlayerState.PAUSED)
                  if (e.data === 2) {
                    const time = e.target.getCurrentTime();
                    setCurrentTime(time);
                  }
                }}
              />
            ) : (
              <video
                ref={videoRef}
                className="w-full h-125 object-cover"
                src={video?.videoUrl}
                controls
              />
            )}
          </div>

          <div className="flex justify-between">
            <div></div>
            <button
              className={`flex justify-center items-center gap-2  border rounded-2xl px-4 py-1.5 text-sm hover:bg-slate-100 cursor-pointer ${videoSave ? "bg-amber-300 border-amber-300 hover:bg-amber-400!" : ""}`}
              onClick={handleSaveVideo}
            >
              <Bookmark size={16} />
              {videoSave ? "Hủy lưu video" : "Lưu video"}
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
                Bình luận ({comments.length})
              </div>

              <div className="flex gap-3 items-start w-full">
                <Image
                  src={userInfor?.avatar || "https://i.pravatar.cc/40"}
                  alt="avatar"
                  width={40}
                  height={40}
                  className="rounded-full "
                />

                <div className="flex-1 space-y-3">
                  <input
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Viết bình luận..."
                    className="w-full border border-slate-200  rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-md"
                  />
                  <div className="flex justify-end gap-3">
                    <button className="border rounded-full px-4 py-1.5 text-sm hover:bg-slate-100 cursor-pointer">
                      Hủy
                    </button>

                    <button
                      className="bg-red-500 text-white rounded-full px-4 py-1.5 text-sm hover:bg-red-600 cursor-pointer"
                      onClick={handleSendComment}
                    >
                      Gửi
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-6 max-h-100 overflow-y-auto pr-2">
                {comments.map((item, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <Image
                      src={item.userId.avatar || "https://i.pravatar.cc/40"}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex gap-4 items-center">
                        <p className="font-bold text-lg">
                          {item.userId.fullName}
                        </p>
                        <span className="text-slate-500 text-sm">
                          {formatTimeAgo(item.createdAt)}
                        </span>
                      </div>
                      <p className="text-lg text-slate-500">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full xl:w-80 shrink-0 space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-2xl">📝 Ghi chú của tôi</h3>
            <button
              className="text-sm border rounded-full px-3 py-1 cursor-pointer"
              onClick={() => setShowNote(!showNote)}
            >
              {showNote ? "Ẩn" : "Hiện"}
            </button>
          </div>

          <Card>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-500 mb-1 font-bold">
                GHI CHÚ TẠI {formatTime(currentTime)}
              </p>

              <textarea
                className="w-full h-20 border border-slate-200 rounded-xl px-4 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Ghi chú của bạn..."
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
              />

              <Button
                className="flex w-full items-center justify-center gap-2 font-black text-base rounded-full!"
                onClick={handleAddNote}
              >
                <Plus size={16} />
                Thêm ghi chú
              </Button>
            </CardContent>
          </Card>

          {showNote && (
            <div className="max-h-100 overflow-y-auto space-y-4 pr-2 ">
              {notes.map((item, index) => (
                <Card key={index} className="cursor-pointer">
                  <CardContent>
                    <div
                      className="space-y-2"
                      onClick={() => seekTo(item.time)}
                    >
                      <p className="text-red-500 text-sm font-bold flex items-center gap-1">
                        <Clock size={14} /> {formatTime(item.time)}
                      </p>
                      <p className="font-semibold">{item.content}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default VideoDetail;
