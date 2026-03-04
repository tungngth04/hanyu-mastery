"use client";

import Image from "next/image";
import imgNotFound from "../../../../public/images/not-found.png";
import { useRouter } from "next/navigation";
import "./style.scss";
import Button from "../../atoms/button";
import { House } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="not-found">
      <div>
        <Image src={imgNotFound} alt="Not Found" />
        <p className="text-xl">
          Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
        <Button
          onClick={() => router.push("/")}
          title="Trang chủ"
          className=" py-4 rounded-full! text-xl w-50! flex items-center gap-2 justify-center"
        >
          <House />
          Về trang chủ
        </Button>
      </div>
    </div>
  );
}
