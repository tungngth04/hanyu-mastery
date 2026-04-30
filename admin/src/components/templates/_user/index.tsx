"use client";

import { Table, Input, Tag, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Ban, Download, Edit, Eye, Filter, Search } from "lucide-react";

interface UserType {
  id: number;
  name: string;
  email: string;
  joined: string;
  status: string;
  level: string;
  progress: string;
}

const UsersManagement = () => {
  const usersData: UserType[] = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@gmail.com",
      joined: "12/03/2026",
      status: "Active",
      level: "HSK 3",
      progress: "65%",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@gmail.com",
      joined: "11/03/2026",
      status: "Active",
      level: "HSK 2",
      progress: "30%",
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "levanc@gmail.com",
      joined: "05/03/2026",
      status: "Inactive",
      level: "HSK 1",
      progress: "10%",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      email: "phamthid@gmail.com",
      joined: "01/03/2026",
      status: "Active",
      level: "HSK 4",
      progress: "85%",
    },
    {
      id: 5,
      name: "Hoàng Tuấn",
      email: "hoangtuan@gmail.com",
      joined: "28/02/2026",
      status: "Banned",
      level: "HSK 1",
      progress: "0%",
    },
  ];

  const columns: ColumnsType<UserType> = [
    {
      title: "Học viên",
      key: "user",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs">
            {record.name.charAt(0)}
          </div>
          <div>
            <p className="font-semibold">{record.name}</p>
            <p className="text-xs text-gray-400">{record.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Cấp độ",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Ngày tham gia",
      dataIndex: "joined",
      key: "joined",
    },
    {
      title: "Tiến độ",
      dataIndex: "progress",
      key: "progress",
      render: (text) => <span className="font-bold text-primary">{text}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        if (status === "Active") return <Tag color="green">Đang học</Tag>;
        if (status === "Inactive") return <Tag color="default">Tạm nghỉ</Tag>;
        return <Tag color="red">Khóa</Tag>;
      },
    },
    {
      title: "Thao tác",
      key: "action",
      fixed: "end",
      align: "right",
      render: () => (
        <div className="flex justify-end gap-2">
          <Button icon={<Eye size={16} />} />
          <Button icon={<Edit size={16} />} />
          <Button danger icon={<Ban size={16} />} />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Quản lý Học viên</h2>
          <p className="text-gray-500">
            Quản lý tài khoản, theo dõi tiến độ của học viên.
          </p>
        </div>

        <div className="flex gap-2">
          <Button icon={<Filter size={16} />}>Lọc</Button>
          <Button icon={<Download size={16} />}>Xuất Excel</Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-80">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <Input placeholder="Tìm tên, email học viên..." className="pl-9" />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={usersData}
        rowKey="id"
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
        }}
      />
    </div>
  );
};

export default UsersManagement;
