"use client";
import {
  BookMarked,
  BookOpen,
  FileText,
  Layers,
  LayoutDashboard,
  Phone,
  Users,
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

type SideBarProps = {
  sidebarOpen: boolean;
};

const SideBar = ({ sidebarOpen }: SideBarProps) => {
  const pathname = usePathname();
  const route = useRouter();

  const navItems = [
    { label: "Tổng quan", icon: LayoutDashboard, href: "/app" },
    { label: "Quản lý người dùng", icon: Users, href: "/users" },
    { label: "Quản lý từ vựng", icon: BookOpen, href: "/vocabulary" },
    { label: "Quản lý flashcards", icon: Layers, href: "/flashcards" },
    { label: "Quản lý chủ đề", icon: FileText, href: "/topic" },
    { label: "Quản lý liên hệ", icon: Phone, href: "/support" },
    { label: "Quản lý video", icon: Video, href: "/video" },
    { label: "Quản lý ngữ pháp", icon: BookMarked, href: "/grammar" },
    { label: "Quản lý đề luyện thi HSK", icon: FileText, href: "/hsk" },
  ];

  const renderItem = (item: NavItem, index: number) => {
    const Icon = item.icon;
    const isActive = pathname.startsWith(item.href);
    return (
      <Link key={index} href={item.href}>
        <div
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer font-medium transition-all ${isActive ? "bg-primary text-white shadow-md shadow-primary/20" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"}`}
        >
          <Icon size={20} /> {item.label}
        </div>
      </Link>
    );
  };

  return (
    <aside
      className={`bg-white border-r border-slate-200 flex flex-col transition-all duration-300 z-20 ${
        sidebarOpen
          ? "w-64"
          : "w-0 -translate-x-full overflow-hidden absolute h-full"
      } md:relative md:translate-x-0`}
    >
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
    </aside>
  );
};
export default SideBar;
