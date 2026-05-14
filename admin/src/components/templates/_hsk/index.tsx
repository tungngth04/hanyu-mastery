/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Edit, Plus, Trash2 } from "lucide-react";
import { Card } from "../../atoms/card";
import { Modal, Tag, Table, Form, Pagination, Input } from "antd";
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
import HSKExamForm from "./hskForm";
import {
  createHSKExam,
  deleteHSKExam,
  getAllHSKExams,
  updateHSKExam,
} from "@/src/services/hsk";

const HSKManagement = () => {
  const dispatch = useAppDispatch();
  const { notify } = useNotification();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");

  const [openAdd, setOpenAdd] = useState(false);
  const [editingExam, setEditingExam] = useState<any>(null);

  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();

  const [exams, setExams] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const [pagination, setPagination] = useState({
    current: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("limit")) || 10,
  });

  const fetchExams = async () => {
    try {
      const res = await dispatch(
        getAllHSKExams({
          page: pagination.current,
          pageSize: pagination.pageSize,
          search,
        }),
      ).unwrap();

      setExams(res.exams || res);
      setTotal(res.totalResults || 0);

      notify("success", "Tải danh sách đề thi thành công");
    } catch {
      notify("error", "Không tải được đề thi");
    }
  };

  useEffect(() => {
    fetchExams();
  }, [pagination, search]);

  const columns: ColumnsType<any> = [
    {
      title: "STT",
      width: 80,
      align: "center",
      render: (_, __, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },

    {
      title: "Tiêu đề",
      dataIndex: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },

    {
      title: "Mã đề",
      dataIndex: "code",
      align: "center",
    },

    {
      title: "Level",
      dataIndex: "level",
      align: "center",
      render: (level) => <Tag color="blue">HSK {level}</Tag>,
      sorter: (a, b) => a.level - b.level,
    },

    {
      title: "Năm",
      dataIndex: "year",
      align: "center",
      sorter: (a, b) => a.year - b.year,
    },

    {
      title: "Số câu",
      dataIndex: "totalQuestions",
      align: "center",
      sorter: (a, b) => a.totalQuestions - b.totalQuestions,
    },

    {
      title: "Thời gian",
      dataIndex: "totalDuration",
      align: "center",
      render: (v) => `${v} phút`,
      sorter: (a, b) => a.totalDuration - b.totalDuration,
    },

    {
      title: "Tổng điểm",
      dataIndex: "totalScore",
      align: "center",
      sorter: (a, b) => a.totalScore - b.totalScore,
    },

    {
      title: "Điểm đạt",
      dataIndex: "passingScore",
      align: "center",
      sorter: (a, b) => a.passingScore - b.passingScore,
    },

    {
      title: "Thao tác",
      align: "right",
      render: (_, record) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setEditingExam(record)}
            className="h-8 w-8 flex items-center justify-center rounded-xl hover:bg-gray-100"
          >
            <Edit size={16} />
          </button>

          <button
            onClick={() => handleDelete(record)}
            className="h-8 w-8 flex items-center justify-center rounded-xl hover:bg-gray-100 text-red-500"
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

      await dispatch(createHSKExam(values)).unwrap();

      notify("success", "Thêm đề thi thành công");

      fetchExams();

      setOpenAdd(false);
      formAdd.resetFields();
    } catch {
      notify("error", "Thêm đề thi thất bại");
    }
  };

  useEffect(() => {
    if (editingExam) {
      formEdit.setFieldsValue({
        title: editingExam.title,
        code: editingExam.code,
        level: editingExam.level,
        year: editingExam.year,
        totalQuestions: editingExam.totalQuestions,
        totalDuration: editingExam.totalDuration,
        totalScore: editingExam.totalScore,
        passingScore: editingExam.passingScore,
      });
    }
  }, [editingExam, formEdit]);

  const handleEdit = async () => {
    try {
      const values = await formEdit.validateFields();

      await dispatch(
        updateHSKExam({
          id: editingExam._id,
          data: values,
        }),
      ).unwrap();

      notify("success", "Cập nhật đề thi thành công");

      fetchExams();

      setEditingExam(null);
      formEdit.resetFields();
    } catch {
      notify("error", "Cập nhật thất bại");
    }
  };

  const handleDelete = (record: any) => {
    Modal.confirm({
      title: "Xóa đề thi?",
      content: record.title,
      okType: "danger",
      centered: true,
      onOk: async () => {
        try {
          await dispatch(deleteHSKExam(record._id)).unwrap();
          notify("success", "Xóa thành công");
          fetchExams();
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
          <h2 className="text-3xl font-bold">Quản lý đề Thi HSK</h2>
        </div>

        <Button onClick={() => setOpenAdd(true)} className="cursor-pointer">
          <Plus size={16} /> Thêm đề Thi
        </Button>
      </div>

      <div className="w-80">
        <Input
          placeholder="Tìm theo tiêu đề ..."
          allowClear
          onChange={(e) => {
            const value = e.target.value;
            setKeyword(value);

            if (!value) {
              setSearch("");
            }
          }}
          onPressEnter={() => {
            if (!keyword.trim()) return;
            setSearch(keyword);
          }}
        />
      </div>

      <Card className="rounded-2xl shadow-sm overflow-hidden">
        <Table
          columns={columns}
          dataSource={exams}
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
        title="Thêm đề Thi"
      >
        <HSKExamForm form={formAdd} />
      </Dialog>

      <Dialog
        open={!!editingExam}
        onCancel={() => {
          setEditingExam(null);
          formEdit.resetFields();
        }}
        onOk={handleEdit}
        title="Chỉnh sửa đề Thi"
      >
        <HSKExamForm form={formEdit} mode="edit" />
      </Dialog>
    </div>
  );
};

export default HSKManagement;
