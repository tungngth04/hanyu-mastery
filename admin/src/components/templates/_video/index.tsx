/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Edit, Plus, Trash2 } from "lucide-react";
import { Card } from "../../atoms/card";
import { Input, Modal, Tag, Table, Form } from "antd";
import type { ColumnsType } from "antd/es/table";
import Button from "../../atoms/button";
import { useState } from "react";
import Dialog from "../../atoms/dialog";
import VideoForm from "./videoForm";

const VideoManagement = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState<number | null>(null);

  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();
  const [currentVideo, setCurrentVideo] = useState<any>(null);

  const videoCourses = [
    {
      id: 1,
      title: "100 câu giao tiếp tiếng Trung cơ bản",
      views: "12.5k",
      duration: "15:20",
      level: "Giao tiếp",
      status: "Published",
      desc: "Tổng hợp các câu giao tiếp thông dụng nhất.",
      url: "https://example.com/video1",
      thumb: "https://example.com/thumb1.jpg",
    },
    {
      id: 2,
      title: "Phân biệt 认为 vs 以为",
      views: "3.2k",
      duration: "08:45",
      level: "Ngữ pháp",
      status: "Draft",
      desc: "Hướng dẫn chi tiết cách dùng 2 từ dễ nhầm lẫn này.",
      url: "https://example.com/video2",
      thumb: "https://example.com/thumb2.jpg",
    },
    {
      id: 3,
      title: "Luyện nghe thụ động HSK 4",
      views: "22k",
      duration: "45:00",
      level: "HSK 4",
      status: "Published",
      desc: "Phương pháp luyện nghe thụ động hiệu quả.",
      url: "https://example.com/video3",
      thumb: "https://example.com/thumb3.jpg",
    },
  ];

  const columns: ColumnsType<any> = [
    {
      title: "Video",
      key: "video",
      render: (_, record) => (
        <div className="flex gap-3">
          <img
            src={`https://picsum.photos/seed/${record.id}/120/80`}
            className="w-24 h-14 object-cover rounded"
          />
          <div>
            <p className="font-semibold">{record.title}</p>
            <p className="text-xs text-gray-500 line-clamp-1">{record.desc}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Chủ đề",
      dataIndex: "level",
    },
    {
      title: "Thời lượng",
      dataIndex: "duration",
    },
    {
      title: "Lượt xem",
      dataIndex: "views",
      render: (text) => <span className="font-bold">{text}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status === "Published" ? "green" : ""}>{status}</Tag>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      fixed: "end",
      align: "right",
      render: (_, record) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              setOpenEdit(record.id);
              setCurrentVideo(record);

              formEdit.setFieldsValue(record);
            }}
            className="h-8 w-8 flex items-center justify-center rounded hover:bg-gray-100"
          >
            <Edit size={16} />
          </button>

          <button
            onClick={() =>
              Modal.confirm({
                title: "Xóa video?",
                content: record.title,
                okText: "Xóa",
                okType: "danger",
                centered: true,
              })
            }
            className="h-8 w-8 flex items-center justify-center rounded hover:bg-gray-100 text-red-500"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  const handleAdd = async () => {
    try {
      const values = await formAdd.validateFields();
      console.log("ADD:", values);

      setOpenAdd(false);
      formAdd.resetFields();
    } catch {}
  };

  const handleEdit = async () => {
    try {
      const values = await formEdit.validateFields();

      console.log("EDIT ID:", currentVideo.id);
      console.log("DATA:", values);

      setOpenEdit(null);
      formEdit.resetFields();
    } catch {}
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Quản lý Video</h2>
          <p className="text-gray-500">Quản lý kho video học tập.</p>
        </div>

        <Button onClick={() => setOpenAdd(true)}>
          <Plus size={16} /> Thêm Video
        </Button>
      </div>

      {/* TABLE */}
      <Card className="rounded-2xl shadow-sm">
        <Table
          columns={columns}
          dataSource={videoCourses}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </Card>

      {/* ADD MODAL */}
      <Dialog
        open={openAdd}
        onCancel={() => {
          setOpenAdd(false);
          formAdd.resetFields();
        }}
        onOk={handleAdd}
        title="Thêm Video"
      >
        <VideoForm form={formAdd} />
      </Dialog>

      {/* EDIT MODAL */}
      <Dialog
        open={openEdit !== null}
        onCancel={() => {
          setOpenEdit(null);
          formEdit.resetFields();
        }}
        onOk={handleEdit}
        title="Chỉnh sửa Video"
      >
        <VideoForm form={formEdit} />
      </Dialog>
    </div>
  );
};

export default VideoManagement;
