import type { Metadata } from "next";
import "./globals.css";
import { Suspense } from "react";
import ProviderComponent from "./provider";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Hanyu Mastery | Nền tảng học tiếng Trung toàn diện",
  description:
    "Hanyu Mastery là nền tảng học tiếng Trung toàn diện, cung cấp các khóa học từ cơ bản đến nâng cao, giúp bạn nhanh chóng làm chủ ngôn ngữ này. Với phương pháp giảng dạy hiệu quả và tài liệu phong phú, chúng tôi cam kết đồng hành cùng bạn trên hành trình chinh phục tiếng Trung.",
  keywords: [
    "Hanyu Mastery",
    "học tiếng Trung",
    "nền tảng học tiếng Trung",
    "khóa học tiếng Trung",
    "học tiếng Trung online",
    "tài liệu học tiếng Trung",
    "phương pháp giảng dạy hiệu quả",
    "chinh phục tiếng Trung",
  ],
  authors: [
    {
      name: "Nguyễn Thanh Tùng",
      url: "https://hanyu-mastery.com",
    },
  ],
  icons: {
    icon: "/images/title-meta.png",
  },
  openGraph: {
    title: "Hanyu Mastery | Nền tảng học tiếng Trung toàn diện",
    description:
      "Hanyu Mastery là nền tảng học tiếng Trung toàn diện, cung cấp các khóa học từ cơ bản đến nâng cao, giúp bạn nhanh chóng làm chủ ngôn ngữ này. Với phương pháp giảng dạy hiệu quả và tài liệu phong phú, chúng tôi cam kết đồng hành cùng bạn trên hành trình chinh phục tiếng Trung.",
    url: "https://hanyu-mastery.com",
    siteName: "Hanyu Mastery",
    images: [
      {
        url: "/images/title-meta.png",
        width: 800,
        height: 600,
        alt: "Hanyu Mastery Logo",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hanyu Mastery | Nền tảng học tiếng Trung toàn diện",
    description:
      "Hanyu Mastery là nền tảng học tiếng Trung toàn diện, cung cấp các khóa học từ cơ bản đến nâng cao, giúp bạn nhanh chóng làm chủ ngôn ngữ này. Với phương pháp giảng dạy hiệu quả và tài liệu phong phú, chúng tôi cam kết đồng hành cùng bạn trên hành trình chinh phục tiếng Trung.",
    images: [
      {
        url: "/images/title-meta.png",
        width: 800,
        height: 600,
        alt: "Hanyu Mastery Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunito.className}  antialiased`}>
        <Suspense fallback={null}>
          <ProviderComponent main={children} />
        </Suspense>
      </body>
    </html>
  );
}
