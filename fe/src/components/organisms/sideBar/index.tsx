"use client";
import {
  BookMarked,
  BookOpen,
  GraduationCap,
  HelpCircle,
  Info,
  Layers,
  LifeBuoy,
  Mic,
  User,
  Video,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

const SideBar = () => {
  const pathname = usePathname();
  const route = useRouter();

  const navItems = [
    { label: "Tổng quan", icon: BookOpen, href: "/app" },
    { label: "Từ vựng theo chủ đề", icon: Layers, href: "/vocabulary" },
    { label: "Flashcards", icon: Layers, href: "/flashcards" },
    { label: "Luyện phát âm", icon: Mic, href: "/pronunciation" },
    { label: "Học qua video", icon: Video, href: "/video" },
    { label: "Ngữ pháp và kỹ năng", icon: BookMarked, href: "/grammar" },
    { label: "Luyện thi HSK", icon: GraduationCap, href: "/hsk" },
  ];

  const helpItems = [
    { label: "Giới thiệu", icon: Info, href: "/about" },
    { label: "Câu hỏi thường gặp", icon: HelpCircle, href: "/faq" },
    { label: "Trung tâm hỗ trợ", icon: LifeBuoy, href: "/support" },
    { label: "Hồ sơ cá nhân", icon: User, href: "/profile" },
  ];

  const renderItem = (item: NavItem, index: number) => {
    const Icon = item.icon;
    const isActive = pathname.startsWith(item.href);
    return (
      <Link key={index} href={item.href}>
        <div
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer font-medium transition-all ${isActive ? "bg-primary/10 text-primary" : "text-slate-600 hover:bg-slate-100"}`}
        >
          <Icon size={20} /> {item.label}
        </div>
      </Link>
    );
  };

  return (
    <div className="fixed top-0 left-0 z-60 w-64 bg-white border-r border-slate-200 hidden lg:block">
      <div className="flex items-center gap-2 font-bold text-xl text-primary">
        <Image
          src={"/images/logo.png"}
          alt="logo.png"
          width={200}
          height={75}
          className="cursor-pointer"
          onClick={() => route.push("/")}
        />
      </div>
      <nav className="p-4 space-y-1.5"> {navItems.map(renderItem)}</nav>

      <div className="px-4 mt-6">
        <p className="text-xs font-semibold text-slate-400 mb-2 uppercase">
          Trợ giúp
        </p>
        <div className="space-y-1.5">{helpItems.map(renderItem)}</div>
      </div>
    </div>
  );
};
export default SideBar;
