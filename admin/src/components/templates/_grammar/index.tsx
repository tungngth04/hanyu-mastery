/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Table, Modal, Form, Pagination, Input } from "antd";
import { Edit, Plus, Trash2 } from "lucide-react";
import Button from "../../atoms/button";
import { Card } from "../../atoms/card";
import Dialog from "../../atoms/dialog";
import GrammarForm from "./grammarForm";
import {
  getAllLessons,
  createLesson,
  updateLesson,
  deleteLesson,
} from "@/src/services/grammar";
import { useAppDispatch } from "@/src/hooks/useHookReducers";
import useNotification from "@/src/hooks/useNotification";
import { ColumnsType } from "antd/es/table";
import { useRouter, useSearchParams } from "next/navigation";

const GrammarManagement = () => {
  const dispatch = useAppDispatch();
  const { notify } = useNotification();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");

  const [lessons, setLessons] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const [openAdd, setOpenAdd] = useState(false);
  const [editingLesson, setEditingLesson] = useState<any>(null);

  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();

  const [pagination, setPagination] = useState({
    current: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 10,
  });

  const fetchLessons = async () => {
    try {
      const res = await dispatch(
        getAllLessons({
          page: pagination.current,
          pageSize: pagination.pageSize,
          search,
        }),
      ).unwrap();
      notify("success", "Tải danh sách bài ngữ pháp thành công");
      setLessons(res.data);
      setTotal(res.pagination.total);
    } catch {
      notify("error", "Không tải được bài ngữ pháp");
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [pagination, search]);

  const handleAdd = async () => {
    const values = await formAdd.validateFields();

    await dispatch(createLesson(values));
    notify("success", "Thêm thành công");

    setOpenAdd(false);
    formAdd.resetFields();
    fetchLessons();
  };

  useEffect(() => {
    if (editingLesson) {
      formEdit.setFieldsValue({
        ...editingLesson,
        topicId: editingLesson.topicId?._id,
      });
    }
  }, [editingLesson, formEdit]);

  const handleEdit = async () => {
    try {
      const values = await formEdit.validateFields();

      await dispatch(
        updateLesson({
          id: editingLesson._id,
          data: values,
        }),
      );

      notify("success", "Cập nhật bài ngữ pháp thành công");

      setEditingLesson(null);
      formEdit.resetFields();
      fetchLessons();
    } catch {
      notify("error", "Cập nhật bài ngữ pháp thất bại");
    }
  };

  const handleDelete = (record: any) => {
    Modal.confirm({
      title: "Xóa bài ngữ pháp?",
      content: record.title,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      centered: true,
      onOk: async () => {
        try {
          await dispatch(deleteLesson(record._id)).unwrap();
          notify("success", "Xóa bài ngữ pháp thành công");
          fetchLessons();
        } catch {
          notify("error", "Xóa bài ngữ pháp thất bại");
        }
      },
    });
  };

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
      title: "Bộ ngữ pháp",
      dataIndex: ["topicId", "title"],
      width: 200,
      sorter: (a, b) => a.topicId.title.localeCompare(b.topicId.title),
    },
    {
      title: "Cấp độ ngữ pháp",
      dataIndex: ["topicId", "level"],
      width: 200,
      sorter: (a, b) => a.topicId.level.localeCompare(b.topicId.level),
    },
    {
      title: "Tên bài ngữ pháp",
      dataIndex: "title",
      ellipsis: true,
      width: 250,
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Thời lượng học",
      dataIndex: "duration",
      ellipsis: true,
      width: 150,
      sorter: (a, b) => a.duration - b.duration,
    },
    {
      title: "Nội dung bài ngữ pháp",
      dataIndex: "content",
      ellipsis: true,
      width: 250,
    },
    {
      title: "Thao tác",
      align: "right",
      fixed: "end",
      width: 120,
      render: (_, record) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setEditingLesson(record)}
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

  const handleChangePagination = (page: number, pageSize: number) => {
    setPagination({
      current: page,
      pageSize,
    });

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    params.set("pageSize", String(pageSize));

    router.push(`?${params.toString()}`);
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Quản lý ngữ pháp</h2>
        </div>

        <Button onClick={() => setOpenAdd(true)} className="cursor-pointer">
          <Plus size={16} /> Thêm ngữ pháp
        </Button>
      </div>

      <div className="w-80">
        <Input
          placeholder="Tìm theo bộ ngữ pháp, cấp độ, tên bài ngữ pháp ..."
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

      <Card>
        <Table
          columns={columns}
          dataSource={lessons}
          rowKey="_id"
          pagination={false}
        />

        <div className="px-3 py-4 flex justify-end">
          <Pagination
            total={total}
            current={pagination.current}
            pageSize={pagination.pageSize}
            showSizeChanger
            showTotal={(total, range) =>
              `${range[0]} - ${range[1]} trong ${total} ngữ pháp`
            }
            locale={{ items_per_page: "/ trang" }}
            onChange={handleChangePagination}
          />
        </div>
      </Card>

      <Dialog
        open={openAdd}
        onOk={handleAdd}
        onCancel={() => setOpenAdd(false)}
      >
        <GrammarForm form={formAdd} />
      </Dialog>

      <Dialog
        open={!!editingLesson}
        onOk={handleEdit}
        onCancel={() => {
          setEditingLesson(null);
          formEdit.resetFields();
        }}
        title="Chỉnh sửa bài ngữ pháp"
      >
        <GrammarForm form={formEdit} />
      </Dialog>
    </div>
  );
};

export default GrammarManagement;
