/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card } from "../../atoms/card";
import {
  Table,
  Tag,
  Button as AntButton,
  Modal,
  Select,
  Pagination,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getAllSupport,
  getSupportDetail,
  updateSupportStatus,
} from "@/src/services/support";
import useNotification from "@/src/hooks/useNotification";
import { useAppDispatch } from "@/src/hooks/useHookReducers";
import { useRouter, useSearchParams } from "next/navigation";

const SupportManagement = () => {
  const [selectedSupport, setSelectedSupport] = useState<any>(null);
  const [openDetail, setOpenDetail] = useState(false);

  const dispatch = useAppDispatch();
  const { notify } = useNotification();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [supports, setSupports] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    current: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("limit")) || 10,
  });

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dispatch(
          getAllSupport({
            page: pagination.current,
            limit: pagination.pageSize,
          }),
        ).unwrap();

        setSupports(res.supports);
        setTotal(res.total);
        notify("success", "Tải danh sách hỗ trợ thành công");
      } catch (err) {
        notify("error", "Không thể tải danh sách hỗ trợ");
      }
    };

    fetchData();
  }, []);

  const handleUpdateStatus = async (record: any, value: string) => {
    try {
      await dispatch(
        updateSupportStatus({
          id: record._id,
          status: value,
        }),
      ).unwrap();

      notify("success", "Cập nhật trạng thái thành công");

      setSupports((prev) =>
        prev.map((item) =>
          item._id === record._id ? { ...item, status: value } : item,
        ),
      );
    } catch (err) {
      notify("error", "Cập nhật thất bại");
    }
  };

  const handleViewDetail = async (record: any) => {
    try {
      const res = await dispatch(getSupportDetail(record._id)).unwrap();

      setSelectedSupport(res);
      setOpenDetail(true);
    } catch (err) {
      notify("error", "Không thể lấy chi tiết");
    }
  };

  const columns: ColumnsType<any> = [
    {
      title: "STT",
      key: "index",
      width: 70,
      align: "center",
      render: (_: any, __: any, index: number) => {
        return (pagination.current - 1) * pagination.pageSize + index + 1;
      },
    },
    {
      title: "Người gửi",
      dataIndex: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Tiêu đề",
      dataIndex: "subject",
    },
    {
      title: "Ngày gửi",
      dataIndex: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status, record) => (
        <Select
          value={status}
          onChange={(value) => handleUpdateStatus(record, value)}
          options={[
            { value: "pending", label: "Chưa xử lý" },
            { value: "resolved", label: "Đã xử lý" },
          ]}
          style={{ width: 140 }}
        />
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      align: "center",
      fixed: "end",
      render: (_, record) => (
        <div className="flex justify-center">
          <button
            onClick={() => handleViewDetail(record)}
            className="h-8 w-8 flex items-center justify-center rounded hover:bg-gray-100 cursor-pointer"
          >
            <Eye size={16} />
          </button>
        </div>
      ),
    },
  ];

  const handleChangePagination = (page: number, pageSize: number) => {
    setPagination({
      current: page,
      pageSize: pageSize,
    });

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    params.set("limit", String(pageSize));

    router.push(`?${params.toString()}`);
  };
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Quản lý liên hệ</h2>
      </div>

      <Card className="rounded-2xl shadow-sm overflow-hidden">
        <div>
          <Table
            columns={columns}
            dataSource={supports}
            rowKey="_id"
            pagination={false}
            scroll={{ x: "max-content" }}
          />
        </div>
        <div className="px-3 py-4 flex justify-end">
          <Pagination
            total={total}
            current={pagination.current}
            pageSize={pagination.pageSize}
            showSizeChanger
            showTotal={(total, range) =>
              `${range[0]} - ${range[1]} trong ${total} liên hệ`
            }
            onChange={handleChangePagination}
            locale={{
              items_per_page: " / trang",
            }}
          />
        </div>
      </Card>

      <Modal
        open={openDetail}
        onCancel={() => setOpenDetail(false)}
        footer={[
          <AntButton key="close" onClick={() => setOpenDetail(false)}>
            Đóng
          </AntButton>,
        ]}
        title="Chi tiết liên hệ"
        centered
      >
        {selectedSupport && (
          <div className="space-y-3">
            <div>
              <strong>Họ tên:</strong> {selectedSupport.fullName}
            </div>

            <div>
              <strong>Email:</strong> {selectedSupport.email}
            </div>

            <div>
              <strong>Tiêu đề:</strong> {selectedSupport.subject}
            </div>

            <div>
              <strong>Nội dung:</strong>
              <div className="mt-1 p-3 border rounded bg-gray-50">
                {selectedSupport.message}
              </div>
            </div>

            <div>
              <strong>Trạng thái:</strong>{" "}
              <Tag
                color={
                  selectedSupport.status === "resolved" ? "green" : "orange"
                }
              >
                {selectedSupport.status === "resolved"
                  ? "Đã xử lý"
                  : "Chưa xử lý"}
              </Tag>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SupportManagement;
