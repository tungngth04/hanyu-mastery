import Link from "next/link";
import Button from "../../button";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const router = useRouter();

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
      <div className="flex items-center gap-2 font-bold text-xl text-primary">
        <Image
          src={"/images/logo.png"}
          alt="logo.png"
          width={200}
          height={75}
        />
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
        <a href="#features" className="hover:text-primary transition-colors">
          Tính năng
        </a>
        <a
          href="#evaluate"
          className="hover:text-primary transition-colors"
        >
          Đánh giá
        </a>
        <a href="/support" className="hover:text-primary transition-colors">
          Liên hệ
        </a>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/auth">
          <button className="font-semibold cursor-pointer">Đăng nhập</button>
        </Link>
        <Button onClick={() => router.push("/app")}>Bắt đầu học ngay</Button>
      </div>
    </nav>
  );
};
export default Header;
