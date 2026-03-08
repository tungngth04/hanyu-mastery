const PronunciationPage = () => {
  // Dữ liệu phụ âm cơ bản
  const initials = [
    "b",
    "p",
    "m",
    "f",
    "d",
    "t",
    "n",
    "l",
    "g",
    "k",
    "h",
    "j",
    "q",
    "x",
    "zh",
    "ch",
    "sh",
    "r",
    "z",
    "c",
    "s",
    "y",
    "w",
  ];
  // Dữ liệu 4 thanh điệu cơ bản
  const tones = [
    { id: 1, mark: "ā", name: "Thanh 1", desc: "Cao và ngang" },
    {
      id: 2,
      mark: "á",
      name: "Thanh 2",
      desc: "Từ thấp lên cao (như dấu sắc)",
    },
    {
      id: 3,
      mark: "ǎ",
      name: "Thanh 3",
      desc: "Xuống thấp rồi lên cao (như dấu hỏi)",
    },
    {
      id: 4,
      mark: "à",
      name: "Thanh 4",
      desc: "Từ cao xuống thấp (như dấu nặng)",
    },
  ];
  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Luyện phát âm chuẩn
        </h1>
        <p className="text-slate-500 mt-2">
          Học cách phát âm Pinyin và luyện tập với công nghệ nhận diện giọng nói
          AI.
        </p>
      </div>
    </div>
  );
};
export default PronunciationPage;
