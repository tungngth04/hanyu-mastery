import Link from "next/link";
import Button from "../../button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAppDispatch } from "@/src/hooks/useHookReducers";
import { clearAuth } from "@/src/services/auth";
import useNotification from "@/src/hooks/useNotification";
import LocalStorage from "@/src/helpers/local-storage";

const Header = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { notify } = useNotification();

  const token = LocalStorage.getLocalStorage<string | null>(
    "access-token",
    null,
  );

  const handleLogout = async () => {
    await dispatch(clearAuth());
    notify("success", "Đăng xuất thành công");
    router.push("/");
  };
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
        <a href="#evaluate" className="hover:text-primary transition-colors">
          Đánh giá
        </a>
        <a href="/support" className="hover:text-primary transition-colors">
          Liên hệ
        </a>
      </div>
      <div className="flex items-center gap-4">
        {token ? (
          <button
            className="font-semibold cursor-pointer"
            onClick={() => handleLogout()}
          >
            Đăng xuất
          </button>
        ) : (
          <Link href="/auth">
            <button className="font-semibold cursor-pointer">Đăng nhập</button>
          </Link>
        )}

        <Button onClick={() => router.push("/app")}>Bắt đầu học ngay</Button>
      </div>
    </nav>
  );
};
export default Header;
