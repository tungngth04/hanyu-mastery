/* eslint-disable @typescript-eslint/no-explicit-any */
import { TrendingUp } from "lucide-react";
import { Card, CardContent } from "../card";

export const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
  bg,
  trend,
}: any) => {
  return (
    <Card className="border-0 shadow-sm rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-500">{title}</p>
            <h3 className="text-3xl font-black text-slate-900">{value}</h3>
          </div>
          <div className={`p-3 rounded-2xl ${bg} ${color}`}>
            <Icon size={24} strokeWidth={2} />
          </div>
        </div>
        <div className="mt-4 flex items-center text-sm">
          <TrendingUp
            size={16}
            className={`${trend.startsWith("+") ? "text-green-500" : "text-slate-400"} mr-1`}
          />
          <span
            className={`${trend.startsWith("+") ? "text-green-500" : "text-slate-500"} font-bold`}
          >
            {trend}
          </span>
          <span className="text-slate-400 ml-2">so với tháng trước</span>
        </div>
      </CardContent>
    </Card>
  );
};
