import { Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import { Card, CardContent } from "../../atoms/card";
import Button from "../../atoms/button";

const SupportPage = () => {
  const connect = [
    {
      label: "EMAIL",
      info: "support@hanyumastery.vn",
      icon: Mail,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: "LIVE CHAT",
      info: "Hỗ trợ 24/7",
      icon: MessageSquare,
      color: "text-green-500",
      bg: "bg-green-50",
    },
    {
      label: "HOTLINE",
      info: "1900 1234",
      icon: Phone,
      color: "text-yellow-500",
      bg: "bg-yellow-50",
    },
    {
      label: "VĂN PHÒNG",
      info: "Cầu Giấy, Hà Nội",
      icon: MapPin,
      bg: "bg-rose-50",
      color: "text-rose-500",
    },
  ];
  return (
    <div className="text-center space-y-8 py-10 px-4 sm:px-6 md:px-12 lg:px-24 xl:px-20 max-w-7xl mx-auto">
      <h1 className="font-black text-4xl">Trung tâm Hỗ trợ</h1>
      <p className="text-xl text-slate-500">
        Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi vấn đề của bạn.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-6 lg:col-span-1">
          {connect.map((item, index) => (
            <Card key={index} className="border shadow-sm">
              <CardContent className="flex items-center gap-4">
                <div className={`${item.bg} ${item.color} p-3 rounded-3xl`}>
                  <item.icon size={16} />
                </div>
                <div className="text-left">
                  <p className="text-sm text-slate-600 font-blod">
                    {item.label}
                  </p>
                  <p className="text-sm font-black">{item.info}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="space-y-6 lg:col-span-2">
          <Card className="border shadow-sm">
            <CardContent className="flex gap-4 text-left flex-col">
              <h2 className="font-black text-xl">Gửi yêu cầu hỗ trợ</h2>
              <Button
                icon={<Send size={20} />}
                className="inline-flex items-center justify-center gap-2 rounded-3xl! py-3!"
              >
                Gửi tin nhắn{" "}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default SupportPage;
