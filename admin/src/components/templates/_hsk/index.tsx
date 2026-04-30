import { Edit, Plus } from "lucide-react";
import { Card, CardContent } from "../../atoms/card";
import Button from "../../atoms/button";

const HSKManagement = () => {
  const examsData = [
    {
      id: 1,
      title: "Đề thi thử HSK 3 - Bộ 1",
      questions: 80,
      time: 90,
      attempts: 1250,
      avgScore: 215,
    },
    {
      id: 2,
      title: "Đề thi thử HSK 4 - Bộ 5",
      questions: 100,
      time: 105,
      attempts: 850,
      avgScore: 198,
    },
    {
      id: 3,
      title: "Đề thi thử HSK 2 - Bộ 2",
      questions: 60,
      time: 50,
      attempts: 3200,
      avgScore: 165,
    },
  ];
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Đề thi HSK</h2>
          <p className="text-slate-500">
            Quản lý ngân hàng đề thi thử các cấp độ.
          </p>
        </div>
        <Button className="bg-primary text-white">
          <Plus size={16} className="mr-2" /> Tạo Đề thi mới
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {examsData.map((exam) => (
          <Card
            key={exam.id}
            className="border-0 shadow-sm rounded-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg text-slate-900 mb-1">
                  {exam.title}
                </h3>
                <button className="h-8 w-8 -mt-1 -mr-2 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-blue-600">
                  <Edit size={16} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-500 mb-1">Cấu trúc</p>
                  <p className="font-bold text-slate-900">
                    {exam.questions} câu / {exam.time} phút
                  </p>
                </div>
                <div className="bg-slate-50 rounded-xl p-3">
                  <p className="text-xs text-slate-500 mb-1">Lượt thi</p>
                  <p className="font-bold text-slate-900">
                    {exam.attempts.toLocaleString()} lần
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-slate-500">Điểm trung bình:</span>
                <span className="font-bold text-primary">
                  {exam.avgScore}/300
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HSKManagement;
