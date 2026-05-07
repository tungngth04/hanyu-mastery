/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Edit, Plus, Trash2 } from "lucide-react";
import { Card } from "../../atoms/card";
import { Modal, Tag, Table, Form, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import Button from "../../atoms/button";
import { useCallback, useEffect, useState } from "react";
import Dialog from "../../atoms/dialog";
import VideoForm from "./videoForm";
import { useAppDispatch } from "@/src/hooks/useHookReducers";
import useNotification from "@/src/hooks/useNotification";
import {
  createUploadVideo,
  createYoutubeVideo,
  deleteVideo,
  getAllVideos,
  updateVideo,
} from "@/src/services/video";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

const VideoManagement = () => {
  const dispatch = useAppDispatch();
  const { notify } = useNotification();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [openAdd, setOpenAdd] = useState(false);
  const [editingVideo, setEditingVideo] = useState<any>(null);

  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();

  const [videos, setVideos] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const [pagination, setPagination] = useState({
    current: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("limit")) || 10,
  });

  const fetchVideos = useCallback(async () => {
    try {
      const res = await dispatch(
        getAllVideos({
          page: pagination.current,
          pageSize: pagination.pageSize,
        }),
      ).unwrap();
      notify("success", "Tải danh sách video thành công");

      setVideos(res.videos);
      setTotal(res.totalResults);
    } catch {
      notify("error", "Không tải được video");
    }
  }, [pagination, dispatch]);

  useEffect(() => {
    fetchVideos();
  }, [pagination]);

  const columns: ColumnsType<any> = [
    {
      title: "STT",
      align: "center",
      width: 80,
      render: (_, __, index) => (
        <span className="font-semibold">
          {(pagination.current - 1) * pagination.pageSize + index + 1}
        </span>
      ),
    },
    {
      title: "Video",
      width: 150,
      render: (_, record) => (
        <div className="flex gap-3 items-center">
          <Image
            src={record.thumbnail}
            alt={record.title}
            width={96}
            height={56}
            className="rounded object-cover"
          />
        </div>
      ),
    },
    {
      title: "Tiêu đề",
      width: 350,
      render: (_, record) => (
        <p className=" line-clamp-1 truncate">{record.title || "—"}</p>
      ),
    },
    {
      title: "Mô tả",
      width: 350,
      render: (_, record) => (
        <p className="line-clamp-1 text-gray-500">
          {record.description || "—"}
        </p>
      ),
    },
    {
      title: "Level",
      align: "center",
      render: (_, record) => <Tag color="blue">HSK {record.level}</Tag>,
    },
    {
      title: "Lượt xem",
      align: "center",
      render: (_, record) => <span>{record.views}</span>,
    },
    {
      title: "Loại",
      align: "center",
      render: (_, record) => (
        <Tag color={record.type === "youtube" ? "red" : "green"}>
          {record.type?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Người tạo",
      width: 350,
      render: (_, record) => (
        <p className="line-clamp-1">{record.author || "—"}</p>
      ),
    },
    {
      title: "Ngày tạo",
      align: "center",
      render: (_, record) => (
        <span>
          {record.createdAt
            ? new Date(record.createdAt).toLocaleDateString()
            : "—"}
        </span>
      ),
    },
    {
      title: "Thao tác",
      fixed: "end",
      align: "right",
      width: 100,
      render: (_, record) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              setEditingVideo(record);
            }}
            className="h-8 w-8 flex items-center justify-center rounded-xl hover:bg-gray-100 cursor-pointer"
          >
            <Edit size={16} />
          </button>

          <button
            onClick={() => handleDelete(record)}
            className="h-8 w-8 flex items-center justify-center rounded-xl hover:bg-gray-100 text-red-500 cursor-pointer"
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

      if (values.type === "youtube") {
        await dispatch(
          createYoutubeVideo({
            title: values.title,
            url: values.url,
            level: values.level,
            description: values.description,
          }),
        );
      }

      if (values.type === "s3") {
        const formData = new FormData();

        formData.append("title", values.title);
        formData.append("level", values.level);
        formData.append("description", values.description);
        formData.append("thumbnail", values.thumbnail || "");

        formData.append("file", values.file[0].originFileObj);

        await dispatch(createUploadVideo(formData));
      }

      notify("success", "Thêm video thành công");
      fetchVideos();

      setOpenAdd(false);
      formAdd.resetFields();
    } catch (err) {
      notify("error", "Thêm video thất bại");
    }
  };

  useEffect(() => {
    if (editingVideo) {
      formEdit.setFieldsValue({
        title: editingVideo.title,
        description: editingVideo.description,
        level: editingVideo.level,
        type: editingVideo.type,
        url:
          editingVideo.type === "youtube"
            ? `https://www.youtube.com/watch?v=${editingVideo.videoId}`
            : editingVideo.url,
      });
    }
  }, [editingVideo, formEdit]);

  const handleEdit = async () => {
    try {
      const values = await formEdit.validateFields();

      await dispatch(
        updateVideo({
          id: editingVideo._id,
          data: {
            title: values.title,
            description: values.description,
            level: values.level,
            url: values.url,
          },
        }),
      ).unwrap();
      notify("success", "Cập nhật video thành công");
      fetchVideos();

      setEditingVideo(null);
      formEdit.resetFields();
    } catch {
      notify("error", "Cập nhật thất bại");
    }
  };

  const handleDelete = (record: any) => {
    Modal.confirm({
      title: "Xóa video?",
      content: record.title,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      centered: true,

      onOk: async () => {
        try {
          await dispatch(deleteVideo(record._id)).unwrap();
          notify("success", "Xóa thành công");
          setVideos((prev) => prev.filter((item) => item._id !== record._id));
          setTotal((prev) => prev - 1);
        } catch {
          notify("error", "Xóa thất bại");
        }
      },
    });
  };

  const handleChangePagination = (page: number, pageSize: number) => {
    setPagination({
      current: page,
      pageSize,
    });

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    params.set("limit", String(pageSize));

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Quản lý Video</h2>
        </div>

        <Button onClick={() => setOpenAdd(true)} className="cursor-pointer">
          <Plus size={16} /> Thêm Video
        </Button>
      </div>

      <Card className="rounded-2xl shadow-sm overflow-hidden">
        <Table
          columns={columns}
          dataSource={videos}
          rowKey="_id"
          pagination={false}
          scroll={{ x: "max-content" }}
        />

        <div className="px-3 py-4 flex justify-end">
          <Pagination
            total={total}
            current={pagination.current}
            pageSize={pagination.pageSize}
            showSizeChanger
            showTotal={(total, range) =>
              `${range[0]} - ${range[1]} trong ${total} video`
            }
            locale={{ items_per_page: "/ trang" }}
            onChange={handleChangePagination}
          />
        </div>
      </Card>

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

      <Dialog
        open={!!editingVideo}
        onCancel={() => {
          setEditingVideo(null);
          formEdit.resetFields();
        }}
        onOk={handleEdit}
        title="Chỉnh sửa Video"
      >
        <VideoForm form={formEdit} mode="edit" />
      </Dialog>
    </div>
  );
};

export default VideoManagement;
