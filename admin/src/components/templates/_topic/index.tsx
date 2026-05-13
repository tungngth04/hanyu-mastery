/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Edit, Plus, Trash2 } from "lucide-react";
import { Card } from "../../atoms/card";
import { Modal, Table, Form, Pagination, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import Button from "../../atoms/button";
import { useEffect, useState } from "react";
import Dialog from "../../atoms/dialog";
import { useAppDispatch } from "@/src/hooks/useHookReducers";
import useNotification from "@/src/hooks/useNotification";

import {
  getAllTopics,
  createTopic,
  updateTopic,
  deleteTopic,
} from "@/src/services/topic";
import { useRouter, useSearchParams } from "next/navigation";
import TopicForm from "./topicForm";

const TopicManagement = () => {
  const dispatch = useAppDispatch();
  const { notify } = useNotification();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");

  const [openAdd, setOpenAdd] = useState(false);
  const [editingTopic, setEditingTopic] = useState<any>(null);

  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();

  const [topics, setTopics] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const [pagination, setPagination] = useState({
    current: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 10,
  });
  const fetchTopics = async () => {
    try {
      const res = await dispatch(
        getAllTopics({
          page: pagination.current,
          pageSize: pagination.pageSize,
          search,
        }),
      ).unwrap();
      notify("success", "Tải danh sách topic thành công");
      setTopics(res.topics);
      setTotal(res.total);
    } catch {
      notify("error", "Không tải được topic");
    }
  };

  useEffect(() => {
    fetchTopics();
  }, [pagination, search]);

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
      title: "Tên chủ đề",
      render: (_, record) => record.name,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Mô tả",
      render: (_, record) => record.description || "—",
    },
    {
      title: "Thao tác",
      align: "right",
      fixed: "end",
      width: 120,
      render: (_, record) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setEditingTopic(record)}
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

      const res = await dispatch(createTopic(values)).unwrap();

      notify("success", "Thêm topic thành công");
      fetchTopics();

      setOpenAdd(false);
      formAdd.resetFields();
    } catch {
      notify("error", "Thêm topic thất bại");
    }
  };

  useEffect(() => {
    if (editingTopic) {
      formEdit.setFieldsValue(editingTopic);
    }
  }, [editingTopic, formEdit]);

  const handleEdit = async () => {
    try {
      const values = await formEdit.validateFields();

      const res = await dispatch(
        updateTopic({
          id: editingTopic._id,
          data: values,
        }),
      ).unwrap();
      notify("success", "Cập nhật topic thành công");
      fetchTopics();

      setEditingTopic(null);
      formEdit.resetFields();
    } catch {
      notify("error", "Cập nhật thất bại");
    }
  };

  const handleDelete = (record: any) => {
    Modal.confirm({
      title: "Xóa chủ đề?",
      content: record.name,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      centered: true,

      onOk: async () => {
        try {
          await dispatch(deleteTopic(record._id)).unwrap();
          notify("success", "Xóa thành công");
          setTopics((prev) => prev.filter((item) => item._id !== record._id));
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
    params.set("pageSize", String(pageSize));

    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Quản lý chủ đề</h2>

        <Button onClick={() => setOpenAdd(true)} className="cursor-pointer">
          <Plus size={16} /> Thêm chủ đề
        </Button>
      </div>

      <div className="w-80">
        <Input
          placeholder="Tìm theo tên chủ đề ..."
          value={keyword}
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
          dataSource={topics}
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
              `${range[0]} - ${range[1]} trong ${total} chủ đề`
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
        title="Thêm Topic"
      >
        <TopicForm form={formAdd} />
      </Dialog>

      <Dialog
        open={!!editingTopic}
        onCancel={() => {
          setEditingTopic(null);
          formEdit.resetFields();
        }}
        onOk={handleEdit}
        title="Chỉnh sửa Topic"
      >
        <TopicForm form={formEdit} />
      </Dialog>
    </div>
  );
};

export default TopicManagement;
