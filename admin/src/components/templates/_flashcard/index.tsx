/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Edit, Plus, Trash2 } from "lucide-react";
import { Card, CardContent } from "../../atoms/card";
import { Form, Input, Modal, Pagination, Tag } from "antd";
import Button from "../../atoms/button";
import { useEffect, useState } from "react";
import Dialog from "../../atoms/dialog";
import FlashcardForm from "./flashcardForm";
import {
  createFlashcardDeck,
  deleteFlashcardDeck,
  getAllFlashcardDeck,
  updateFlashcardDeck,
} from "@/src/services/flashcard";
import { useAppDispatch } from "@/src/hooks/useHookReducers";
import useNotification from "@/src/hooks/useNotification";
import { useRouter, useSearchParams } from "next/navigation";
import dayjs from "dayjs";

const FlashcardManagement = () => {
  const dispatch = useAppDispatch();
  const { notify } = useNotification();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");

  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();

  const [decks, setDecks] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const [pagination, setPagination] = useState({
    current: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 12,
  });
  const fetchDecks = async () => {
    try {
      const res = await dispatch(
        getAllFlashcardDeck({
          page: pagination.current,
          pageSize: pagination.pageSize,
          search,
        }),
      ).unwrap();
      notify("success", "Tải danh sách flashcard thành công");
      setDecks(res.flashcardDecks);
      setTotal(res.totalResults);
    } catch {
      notify("error", "Không tải được flashcard");
    }
  };

  useEffect(() => {
    fetchDecks();
  }, [pagination, search]);

  const handleAdd = async () => {
    try {
      const values = await formAdd.validateFields();

      await dispatch(createFlashcardDeck(values)).unwrap();

      notify("success", "Thêm flashcard thành công");

      setOpenAdd(false);
      formAdd.resetFields();

      fetchDecks();
    } catch {
      notify("error", "Thêm flashcard thất bại");
    }
  };

  const handleEdit = async () => {
    try {
      const values = await formEdit.validateFields();

      if (!openEdit) return;

      await dispatch(
        updateFlashcardDeck({
          id: openEdit.toString(),
          data: values,
        }),
      ).unwrap();

      notify("success", "Cập nhật flashcard thành công");

      setOpenEdit(null);
      formEdit.resetFields();

      fetchDecks();
    } catch {
      notify("error", "Cập nhật thất bại");
    }
  };

  const handleDelete = (record: any) => {
    Modal.confirm({
      title: "Xóa bộ flashcard?",
      content: record.title,
      okText: "Xóa",
      okType: "danger",
      centered: true,
      cancelText: "Hủy",

      onOk: async () => {
        try {
          await dispatch(deleteFlashcardDeck(record._id)).unwrap();

          notify("success", "Xóa flashcard thành công");
          fetchDecks();
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
          <h2 className="text-2xl font-bold">Quản lý bộ flashcard</h2>
        </div>

        <Button onClick={() => setOpenAdd(true)} className="cursor-pointer">
          <Plus size={16} /> Thêm bộ flashcard
        </Button>
      </div>

      <div className="w-80">
        <Input
          placeholder="Tìm bộ flashcard..."
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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {decks.map((deck) => (
          <Card
            key={deck._id}
            className="group border shadow-sm rounded-2xl hover:shadow-md transition-all"
          >
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-4 mt-4">
                <Tag color={deck.isSystem ? "green" : "default"}>
                  {deck.isSystem ? "Admin" : "User"}
                </Tag>

                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => {
                      setOpenEdit(deck._id);

                      formEdit.setFieldsValue({
                        title: deck.title,
                        topic: deck.topic,
                        level: Number(
                          deck.level?.toString().replace("HSK ", ""),
                        ),
                      });
                    }}
                    className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-slate-100 cursor-pointer"
                  >
                    <Edit size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(deck)}
                    className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-slate-100 text-red-500 cursor-pointer"
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
                  <span>Mô tả:</span>
                  <span>{deck.topic}</span>
                </div>

                <div className="flex justify-between">
                  <span>Cấp độ</span>
                  <span>{deck.level}</span>
                </div>

                <div className="flex justify-between">
                  <span>Số lượng:</span>
                  <span>{deck.cards} từ</span>
                </div>

                <div className="flex justify-between">
                  <span>Cập nhật:</span>
                  <span>{dayjs(deck.updatedAt).format("DD/MM/YYYY")}</span>
                </div>
              </div>

              <button className="mt-6 w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition">
                Quản lý thẻ ({deck.cards})
              </button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="px-3 py-4 flex justify-end">
        <Pagination
          total={total}
          current={pagination.current}
          pageSize={pagination.pageSize}
          showSizeChanger
          showTotal={(total, range) =>
            `${range[0]} - ${range[1]} trong ${total} bộ flashcard`
          }
          locale={{ items_per_page: "/ trang" }}
          onChange={handleChangePagination}
        />
      </div>

      <Dialog
        open={openAdd}
        onCancel={() => setOpenAdd(false)}
        onOk={handleAdd}
        title="Thêm flashcard"
      >
        <FlashcardForm form={formAdd} />
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
        <FlashcardForm form={formEdit} />
      </Dialog>
    </div>
  );
};

export default FlashcardManagement;
