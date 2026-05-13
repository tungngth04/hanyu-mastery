/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Table, Input, Tag, Button, Pagination, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Download, Eye, Lock, LockOpen, Search } from "lucide-react";
import { useAppDispatch } from "@/src/hooks/useHookReducers";
import useNotification from "@/src/hooks/useNotification";
import { useEffect, useState } from "react";
import { getAllUsers, toggleUserStatus } from "@/src/services/user";
import { Card } from "../../atoms/card";
import { useRouter, useSearchParams } from "next/navigation";

const UsersManagement = () => {
  const dispatch = useAppDispatch();
  const { notify } = useNotification();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");
  const [keyword, setKeyword] = useState("");

  const [users, setUsers] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  const [pagination, setPagination] = useState({
    current: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("limit")) || 10,
  });

  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [openDetail, setOpenDetail] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await dispatch(
        getAllUsers({
          page: pagination.current,
          limit: pagination.pageSize,
          search,
        }),
      ).unwrap();
      notify("success", "Tải danh sách user thành công");

      setUsers(res.users);
      setTotal(res.users.length);
    } catch {
      notify("error", "Không tải được danh sách user");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [pagination, search]);

  const handleToggleStatus = (record: any) => {
    Modal.confirm({
      title: "Xác nhận",
      okType: "danger",
      centered: true,
      content:
        record.status === "active"
          ? "Bạn có chắc muốn khóa tài khoản này?"
          : "Bạn có chắc muốn mở khóa tài khoản này?",
      okText: "Xác nhận",
      cancelText: "Hủy",

      onOk: async () => {
        try {
          await dispatch(toggleUserStatus(record._id)).unwrap();

          notify("success", "Cập nhật trạng thái thành công");

          fetchUsers();
        } catch {
          notify("error", "Lỗi cập nhật");
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

  const columns: ColumnsType<any> = [
    {
      title: "STT",
      render: (_, __, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
    },
    {
      title: "Người dùng",
      width: 250,
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.avatar || "/default-avatar.png"}
            className="w-10 h-10 rounded-full object-cover border"
          />
          <div>
            <p className="font-semibold">{record.fullName}</p>
          </div>
        </div>
      ),
      sorter: (a, b) => a.fullName.localeCompare(b.fullName),
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 250,
      render: (email) => email || "—",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "SĐT",
      dataIndex: "phone",
      width: 200,
      render: (phone) => phone || "—",
    },
    {
      title: "Mục tiêu",
      dataIndex: "learningGoal",
      width: 250,
      render: (text) => (
        <span className="text-gray-600 text-sm line-clamp-2">
          {text || "—"}
        </span>
      ),
    },
    {
      title: "Streak",
      dataIndex: "studyStreak",
      align: "center",
      sorter: (a, b) => a.studyStreak - b.studyStreak,
    },
    {
      title: "Role",
      dataIndex: "role",
      width: 80,
      render: (role) => (
        <Tag color={role === "admin" ? "purple" : "blue"}>{role}</Tag>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      width: 100,
      render: (status) =>
        status === "active" ? (
          <Tag color="green">Hoạt động</Tag>
        ) : (
          <Tag color="red">Bị khóa</Tag>
        ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      width: 120,
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Thao tác",
      align: "right",
      fixed: "end",
      width: 100,
      render: (_, record) => (
        <div className="flex justify-end gap-2">
          <Button
            icon={<Eye size={16} />}
            onClick={() => handleViewDetail(record)}
          />

          <Button
            danger={record.status === "active"}
            icon={
              record.status === "active" ? (
                <Lock size={16} />
              ) : (
                <LockOpen size={16} />
              )
            }
            onClick={() => handleToggleStatus(record)}
          />
        </div>
      ),
    },
  ];

  const handleViewDetail = (record: any) => {
    setSelectedUser(record);
    setOpenDetail(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Quản lý Học viên</h2>
      </div>

      <div className="flex justify-between items-center gap-4">
        <div className="relative w-80">
          <Input
            placeholder="Tìm tên, email học viên..."
            className="pl-9"
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

        <Button icon={<Download size={16} />}>Xuất Excel</Button>
      </div>

      <Card className="rounded-2xl shadow-sm overflow-hidden">
        <Table
          columns={columns}
          dataSource={users}
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
              `${range[0]} - ${range[1]} trong ${total} người dùng`
            }
            locale={{ items_per_page: "/ trang" }}
            onChange={handleChangePagination}
          />
        </div>
      </Card>

      <Modal
        open={openDetail}
        onCancel={() => setOpenDetail(false)}
        footer={[
          <Button key="close" onClick={() => setOpenDetail(false)}>
            Đóng
          </Button>,
        ]}
        title="Chi tiết người dùng"
        centered
      >
        {selectedUser && (
          <div className="space-y-3">
            <div>
              <strong>Họ tên:</strong> {selectedUser.fullName}
            </div>

            <div>
              <strong>Email:</strong> {selectedUser.email}
            </div>

            <div>
              <strong>SĐT:</strong> {selectedUser.phone || "—"}
            </div>

            <div>
              <strong>Mục tiêu:</strong> {selectedUser.learningGoal || "—"}
            </div>

            <div>
              <strong>Streak:</strong> {selectedUser.studyStreak}
            </div>

            <div>
              <strong>Role:</strong> {selectedUser.role}
            </div>

            <div>
              <strong>Trạng thái:</strong>{" "}
              <Tag color={selectedUser.status === "active" ? "green" : "red"}>
                {selectedUser.status === "active" ? "Hoạt động" : "Bị khóa"}
              </Tag>
            </div>

            <div>
              <strong>Ngày tạo:</strong>{" "}
              {new Date(selectedUser.createdAt).toLocaleDateString()}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UsersManagement;
