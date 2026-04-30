"use client";

import { Edit, Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "../../atoms/card";
import { Form, Input, Modal, Tag } from "antd";
import Button from "../../atoms/button";
import { useState } from "react";
import Dialog from "../../atoms/dialog";
import TopicForm from "./topicForm";

const TopicManagement = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();

  const topics = [
    {
      id: 1,
      title: "Từ vựng HSK 1 - Cơ bản",
      words: 150,
      category: "HSK 1",
      lastUpdated: "15/03/2026",
      status: "Published",
      desc: "Bộ từ vựng cơ bản dành cho người mới bắt đầu học tiếng Trung.",
    },
    {
      id: 2,
      title: "Từ vựng HSK 2 - Trung cấp",
      words: 300,
      category: "HSK 2",
      lastUpdated: "10/03/2026",
      status: "Published",
      desc: "Tiếp nối HSK 1, mở rộng vốn từ vựng trong giao tiếp hàng ngày.",
    },
    {
      id: 3,
      title: "Chủ đề: Công việc & Văn phòng",
      words: 45,
      category: "Giao tiếp",
      lastUpdated: "02/03/2026",
      status: "Draft",
      desc: "Các từ vựng chuyên ngành thường dùng trong môi trường công sở.",
    },
    {
      id: 4,
      title: "Chủ đề: Du lịch & Đặt phòng",
      words: 60,
      category: "Giao tiếp",
      lastUpdated: "25/02/2026",
      status: "Published",
      desc: "Hữu ích cho các chuyến du lịch đến các quốc gia nói tiếng Trung.",
    },
  ];

  const filteredTopics = topics.filter(
    (t) =>
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase()),
  );

  const handleAdd = async () => {
    try {
      const values = await formAdd.validateFields();
      console.log("ADD:", values);

      setOpenAdd(false);
      formAdd.resetFields();
    } catch (err) {}
  };

  const handleEdit = async () => {
    try {
      const values = await formEdit.validateFields();
      console.log("EDIT:", values);

      setOpenEdit(null);
    } catch (err) {}
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Bộ flashcard</h2>
          <p className="text-gray-500">Tạo và quản lý các bộ thẻ từ vựng.</p>
        </div>

        <Button onClick={() => setOpenAdd(true)}>
          <Plus size={16} /> Thêm Bộ flashcard
        </Button>
      </div>

      <div className="w-80">
        <Input
          placeholder="Tìm bộ flashcard..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTopics.map((deck) => (
          <Card
            key={deck.id}
            className="group border shadow-sm rounded-2xl hover:shadow-md transition-all"
          >
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-4 mt-4">
                <Tag color={deck.status === "Published" ? "green" : "default"}>
                  {deck.status === "Published" ? "Đã xuất bản" : "Bản nháp"}
                </Tag>

                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => {
                      setOpenEdit(deck.id);

                      formEdit.setFieldsValue({
                        title: deck.title,
                        desc: deck.desc,
                        category: deck.category,
                      });
                    }}
                    className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-slate-100"
                  >
                    <Edit size={16} />
                  </button>

                  <button
                    onClick={() =>
                      Modal.confirm({
                        title: "Xóa bộ flashcard?",
                        content: deck.title,
                        okText: "Xóa",
                        okType: "danger",
                        centered: true,
                      })
                    }
                    className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-slate-100 text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <h3 className="font-bold text-lg line-clamp-2 min-h-14">
                {deck.title}
              </h3>

              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Chủ đề:</span>
                  <span>{deck.category}</span>
                </div>

                <div className="flex justify-between">
                  <span>Số lượng:</span>
                  <span className="text-primary font-bold">
                    {deck.words} từ
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Cập nhật:</span>
                  <span>{deck.lastUpdated}</span>
                </div>
              </div>

              <button className="mt-6 w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition">
                Quản lý thẻ ({deck.words})
              </button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog
        open={openAdd}
        onCancel={() => setOpenAdd(false)}
        onOk={handleAdd}
        title="Thêm flashcard"
      >
        <TopicForm form={formAdd} />
      </Dialog>

      <Dialog
        open={openEdit !== null}
        onCancel={() => {
          setOpenEdit(null);
          formEdit.resetFields();
        }}
        onOk={handleEdit}
        title="Chỉnh sửa"
      >
        <TopicForm form={formEdit} />
      </Dialog>
    </div>
  );
};

export default TopicManagement;
