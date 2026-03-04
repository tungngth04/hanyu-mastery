import { Bell, BellDot, Search } from "lucide-react";
import Image from "next/image";

const Header = () => {
  return (
    <header className="flex items-center px-6 h-16 bg-white/80 shadow-md sticky top-0 z-50 border-b border-slate-200 backdrop-blur-md">
      <div className="relative flex-1 min-w-0 mr-2 ">
        <Search className="text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" />
        <input
          className="w-full bg-transparent rounded-full text-sm outline-none focus:ring-2 ring-slate-400/20 pl-10 pr-4 py-2"
          placeholder="Tìm kiếm khóa học, từ vựng, ngữ pháp..."
        />
      </div>
      <div className="flex items-center gap-4 ml-auto shrink-0">
        <BellDot className="h-6 w-6 text-slate-400 cursor-pointer" />
        <div className="bg-slate-200 h-6 w-px " />
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold ">Học viên</p>
          <p className="text-slate-500 text-xs">HSK 3</p>
        </div>
        <div>
          <Image
            src="https://i.pravatar.cc/100?u=1"
            alt="avatar"
            width={40}
            height={40}
            className="rounded-full cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
};
export default Header;
