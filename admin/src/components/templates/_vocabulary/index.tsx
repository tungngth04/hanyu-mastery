/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Table, Tag, Modal, Form, Input, Pagination } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Edit, Plus, Trash2 } from "lucide-react";
import Button from "../../atoms/button";
import { Card } from "../../atoms/card";
import Dialog from "../../atoms/dialog";
import VocabularyForm from "./vocabularyForm";
import { useAppDispatch } from "@/src/hooks/useHookReducers";
import useNotification from "@/src/hooks/useNotification";
import { useRouter, useSearchParams } from "next/navigation";
import {
  createVocabulary,
  deleteVocabulary,
  getAllVocabularies,
  updateVocabulary,
} from "@/src/services/vocabulary";

const VocabularyManagement = () => {
  const dispatch = useAppDispatch();
  const { notify } = useNotification();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [openAdd, setOpenAdd] = useState(false);
  const [editingVocabulary, setEditingVocabulary] = useState<any>(null);

  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();

  const [vocabularies, setVocabularies] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const [pagination, setPagination] = useState({
    current: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 10,
  });

  const fetchVocabulary = async () => {
    try {
      const res = await dispatch(
        getAllVocabularies({
          page: pagination.current,
          pageSize: pagination.pageSize,
        }),
      ).unwrap();

      setVocabularies(res.vocabularies);
      setTotal(res.totalResults);
    } catch {
      notify("error", "Không tải được dữ liệu");
    }
  };

  useEffect(() => {
    fetchVocabulary();
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
      title: "Hanzi",
      dataIndex: "hanzi",
      width: 120,
      render: (text) => (
        <span className="text-lg font-bold text-primary">{text}</span>
      ),
    },
    {
      title: "Pinyin",
      dataIndex: "pinyin",
      width: 120,
    },
    {
      title: "Nghĩa",
      dataIndex: "meaning",
      ellipsis: true,
      width: 250,
    },
    {
      title: "Ví dụ",
      dataIndex: "example",
      ellipsis: true,
      width: 250,
    },
    {
      title: "Dịch ví dụ",
      dataIndex: "exampleMeaning",
      ellipsis: true,
      width: 250,
    },
    {
      title: "HSK",
      dataIndex: "level",
      width: 80,
      align: "center",
      render: (lv) => <Tag color="blue">HSK {lv}</Tag>,
    },
    {
      title: "Nét",
      dataIndex: "strokeCount",
      width: 80,
      align: "center",
    },
    {
      title: "Bộ thủ",
      dataIndex: "radical",
      width: 100,
      align: "center",
      render: (r) => <span className="font-semibold">{r}</span>,
    },
    {
      title: "Topic",
      dataIndex: "topicId",
      width: 120,
      ellipsis: true,
      render: (topic) => topic?.name || "-",
    },
    {
      title: "Thao tác",
      align: "right",
      fixed: "end",
      width: 120,
      render: (_, record) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setEditingVocabulary(record)}
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
      const res = await dispatch(createVocabulary(values)).unwrap();
      notify("success", "Thêm từ vựng thành công");
      fetchVocabulary();

      setOpenAdd(false);
      formAdd.resetFields();
    } catch {
      notify("error", "Thêm từ vựng thất bại");
    }
  };

  useEffect(() => {
    if (editingVocabulary) {
      formEdit.setFieldsValue({
        ...editingVocabulary,
        topicId: editingVocabulary.topicId?._id,
      });
    }
  }, [editingVocabulary, formEdit]);

  const handleEdit = async () => {
    try {
      const values = await formEdit.validateFields();

      const res = await dispatch(
        updateVocabulary({
          id: editingVocabulary._id,
          data: values,
        }),
      ).unwrap();
      notify("success", "Cập nhật từ vựng thành công");
      fetchVocabulary();

      setEditingVocabulary(null);
      formEdit.resetFields();
    } catch {
      notify("error", "Cập nhật thất bại");
    }
  };

  const handleDelete = (record: any) => {
    Modal.confirm({
      title: "Xóa từ vựng?",
      content: record.hanzi,
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      centered: true,

      onOk: async () => {
        try {
          await dispatch(deleteVocabulary(record._id)).unwrap();
          notify("success", "Xóa thành công");
          setVocabularies((prev) =>
            prev.filter((item) => item._id !== record._id),
          );
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
        <div>
          <h2 className="text-3xl font-bold">Quản lý từ vựng</h2>
        </div>

        <Button onClick={() => setOpenAdd(true)} className="cursor-pointer">
          <Plus size={16} /> Thêm từ vựng
        </Button>
      </div>

      <div className="w-80">
        <Input placeholder="Tìm theo hanzi / pinyin..." />
      </div>

      <Card className="rounded-2xl shadow-sm overflow-hidden">
        <Table
          columns={columns}
          dataSource={vocabularies}
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
              `${range[0]} - ${range[1]} trong ${total} từ vựng`
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
        title="Thêm từ vựng"
        width={600}
      >
        <VocabularyForm form={formAdd} />
      </Dialog>

      <Dialog
        open={!!editingVocabulary}
        onCancel={() => {
          setEditingVocabulary(null);
          formEdit.resetFields();
        }}
        onOk={handleEdit}
        title="Chỉnh sửa từ vựng"
        width={600}
      >
        <VocabularyForm form={formEdit} />
      </Dialog>
    </div>
  );
};

export default VocabularyManagement;
