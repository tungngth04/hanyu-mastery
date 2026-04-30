/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Table, Tag, Modal, Form, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Edit, Plus, Trash2 } from "lucide-react";
import Button from "../../atoms/button";
import { Card } from "../../atoms/card";
import Dialog from "../../atoms/dialog";
import VocabularyForm from "./vocabularyForm";

const VocabularyManagement = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState<string | null>(null);
  const [current, setCurrent] = useState<any>(null);

  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();

  const vocabularies = [
    {
      id: "1",
      hanzi: "你好",
      pinyin: "nǐ hǎo",
      meaning: "Xin chào",
      example: "你好，我叫Tùng",
      example_meaning: "Xin chào, tôi tên Tùng",
      level: 1,
      stroke_count: 6,
      radical: "亻",
      topic_id: "topic-1",
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
      console.log("EDIT:", current.id, values);

      setOpenEdit(null);
      formEdit.resetFields();
    } catch {}
  };

  const columns: ColumnsType<any> = [
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
      dataIndex: "example_meaning",
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
      dataIndex: "stroke_count",
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
      dataIndex: "topic_id",
      width: 120,
      ellipsis: true,
    },
    {
      title: "Thao tác",
      key: "action",
      width: 120,
      align: "right",
      fixed: "end",
      render: (_, record) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              setOpenEdit(record.id);
              setCurrent(record);
              formEdit.setFieldsValue(record);
            }}
            className="h-8 w-8 flex items-center justify-center hover:bg-gray-100 rounded"
          >
            <Edit size={16} />
          </button>

          <button
            onClick={() =>
              Modal.confirm({
                title: "Xóa từ vựng?",
                content: record.hanzi,
                okType: "danger",
                centered: true,
              })
            }
            className="h-8 w-8 flex items-center justify-center hover:bg-gray-100 rounded text-red-500"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Quản lý từ vựng</h2>
          <p className="text-gray-500">
            Quản lý từ vựng tiếng Trung trong hệ thống
          </p>
        </div>

        <Button onClick={() => setOpenAdd(true)}>
          <Plus size={16} /> Thêm từ vựng
        </Button>
      </div>

      <div className="w-80">
        <Input placeholder="Tìm theo hanzi / pinyin..." />
      </div>

      <Card className="rounded-2xl shadow-sm overflow-hidden">
        <div className="w-full overflow-x-auto">
          <Table
            columns={columns}
            dataSource={vocabularies}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            scroll={{ x: "max-content" }}
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
        open={openEdit !== null}
        onCancel={() => {
          setOpenEdit(null);
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
