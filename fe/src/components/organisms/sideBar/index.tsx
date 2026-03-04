"use client";
import {
  BookMarked,
  BookOpen,
  GraduationCap,
  Layers,
  Mic,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();

  const navItems = [
    { label: "Tổng quan", icon: BookOpen, href: "/app" },
    { label: "Flashcards", icon: Layers, href: "/flashcards" },
    { label: "Luyện phát âm", icon: Mic, href: "/pronunciation" },
    { label: "Học qua video", icon: Video, href: "/video" },
    { label: "Ngữ pháp và kỹ năng", icon: BookMarked, href: "/grammar" },
    { label: "Luyện thi HSK", icon: GraduationCap, href: "/hsk" },
  ];

  return (
    <div className="fixed top-0 left-0 z-60 w-64 bg-white border-r border-slate-200 hidden md:block">
      <div className="flex items-center gap-2 font-bold text-xl text-primary">
        <Image
          src={"/images/logo.png"}
          alt="logo.png"
          width={200}
          height={75}
        />
      </div>
      <nav className="p-4 space-y-1.5">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={index} href={item.href}>
              <div
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer font-medium transition-all ${isActive ? "bg-primary/10 text-primary" : "text-slate-600 hover:bg-slate-100"}`}
              >
                <Icon size={20} /> {item.label}
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};
export default SideBar;
