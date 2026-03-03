import Image from "next/image";

const Footer = () => {
  return (
    <footer className="py-4 px-6 border-t border-slate-100 bg-slate-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <Image
            src={"/images/logo.png"}
            alt="logo.png"
            width={200}
            height={75}
          />
        </div>
        <p className="text-slate-500 text-sm font-medium">
          © 2026 Hanyu Mastery. Thiết kế bởi Tùng.
        </p>
        <div className="flex gap-6 text-sm font-bold text-slate-400 uppercase tracking-widest">
          <a href="#" className="hover:text-primary">
            Facebook
          </a>
          <a href="#" className="hover:text-primary">
            TikTok
          </a>
          <a href="#" className="hover:text-primary">
            YouTube
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
