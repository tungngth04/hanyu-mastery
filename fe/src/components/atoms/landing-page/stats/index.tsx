const Stats = () => {
  return (
    <section className="py-20 px-6 bg-primary text-white">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
        <div>
          <p className="text-5xl font-black mb-2">500k+</p>
          <p className="text-primary-foreground/80 font-bold uppercase tracking-widest text-sm">
            Từ vựng đã học
          </p>
        </div>
        <div>
          <p className="text-5xl font-black mb-2">95%</p>
          <p className="text-primary-foreground/80 font-bold uppercase tracking-widest text-sm">
            Tỉ lệ đỗ HSK
          </p>
        </div>
        <div>
          <p className="text-5xl font-black mb-2">150+</p>
          <p className="text-primary-foreground/80 font-bold uppercase tracking-widest text-sm">
            Chủ đề thực tế
          </p>
        </div>
        <div>
          <p className="text-5xl font-black mb-2">4.9/5</p>
          <p className="text-primary-foreground/80 font-bold uppercase tracking-widest text-sm">
            Xếp hạng ứng dụng
          </p>
        </div>
      </div>
    </section>
  );
};
export default Stats;
