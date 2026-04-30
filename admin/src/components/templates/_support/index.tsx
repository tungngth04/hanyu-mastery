/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Card } from "../../atoms/card";
import { Table, Tag, Button as AntButton, Modal, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Eye } from "lucide-react";

const SupportManagement = () => {
  const [selectedSupport, setSelectedSupport] = useState<any>(null);
  const [openDetail, setOpenDetail] = useState(false);

  const supports = [
    {
      id: "1",
      full_name: "Nguyễn Văn A",
      email: "vana@gmail.com",
      subject: "Không đăng nhập được",
      message: "Tôi không thể đăng nhập vào hệ thống.",
      status: "pending",
      created_at: "01/04/2026",
    },
    {
      id: "2",
      full_name: "Trần Thị B",
      email: "b@gmail.com",
      subject: "Lỗi video",
      message: "Video không phát được.",
      status: "resolved",
      created_at: "02/04/2026",
    },
  ];

  const handleUpdateStatus = (record: any, value: string) => {
    console.log("UPDATE STATUS:", record.id, value);
  };

  const columns: ColumnsType<any> = [
    {
      title: "Người gửi",
      dataIndex: "full_name",
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
      dataIndex: "created_at",
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
      align: "right",
      fixed: "end",
      render: (_, record) => (
        <div className="flex justify-end">
          <button
            onClick={() => {
              setSelectedSupport(record);
              setOpenDetail(true);
            }}
            className="h-8 w-8 flex items-center justify-center rounded hover:bg-gray-100"
          >
            <Eye size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Quản lý liên hệ</h2>
        <p className="text-gray-500">
          Quản lý phản hồi và liên hệ từ người dùng.
        </p>
      </div>

      <Card className="rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={supports}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            scroll={{ x: "max-content" }}
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
              <strong>Họ tên:</strong> {selectedSupport.full_name}
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
