import { useState } from "react";
import Image from "next/image";
import { CirclePlay, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { IVideoItem } from "@/src/types/interface";
import Button from "@/src/components/atoms/button";

interface VideoItemProps {
  video: IVideoItem;
  footer?: boolean;
}

const VideoItem = ({ video, footer }: VideoItemProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter();

  const handlePlay = () => setIsPlaying(true);
  const formatViews = (views: number) => {
    if (views >= 1_000_000) return (views / 1_000_000).toFixed(1) + "M";
    if (views >= 1_000) return (views / 1_000).toFixed(1) + "K";
    return views.toString();
  };
  return (
    <div
      className={`w-full group hover:bg-slate-300 p-4 rounded-2xl ${!footer ? "cursor-pointer" : ""}`}
      onClick={!footer ? () => router.push(`/video/${video._id}`) : undefined}
    >
      <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
        {video.type === "youtube" ? (
          isPlaying ? (
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="relative w-full h-full">
              <Image
                src={video.thumbnail || "/images/banner.jpg"}
                alt={video.title}
                fill
                className="object-cover"
              />
              <div
                className="absolute inset-0 flex items-center justify-center text-white"
                onClick={handlePlay}
              >
                <CirclePlay size={64} />
              </div>
            </div>
          )
        ) : video.videoUrl ? (
          <video
            className="w-full h-full object-cover"
            src={video.videoUrl}
            controls
          />
        ) : (
          <Image
            src={video.thumbnail || "/images/banner.jpg"}
            alt={video.title}
            fill
            className="object-cover"
          />
        )}
      </div>

      <div className="flex gap-3">
        <div className="bg-slate-200 rounded-full flex items-center justify-center text-slate-500 text-sm w-9 h-9 shrink-0">
          {video.type === "youtube"
            ? video?.author?.charAt(0)
            : video.type === "s3"
              ? video.createdBy?.name?.charAt(0)
              : "?"}
        </div>
        <div className="space-y-1">
          <h4 className="text-slate-900 font-bold line-clamp-2">
            {video.title}
          </h4>
          <p className="text-sm text-slate-500 line-clamp-1">
            {video.type === "youtube"
              ? video?.author
              : video.type === "s3"
                ? video.createdBy?.name
                : "Tác giả ẩn danh"}
          </p>
          <p className="text-slate-400 text-xs">
            {formatViews(video.views)} lượt xem • HSK {video.level}
          </p>
        </div>
      </div>

      {footer && (
        <div className="flex gap-2 pt-2">
          <Button
            className="flex-1 rounded-full! p-0! text-sm!"
            onClick={() => router.push(`/video/${video._id}`)}
          >
            Xem tiếp
          </Button>
          <button className="w-12 h-8 border border-red-400 text-red-500 rounded-full flex items-center justify-center hover:bg-red-50 cursor-pointer">
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoItem;
