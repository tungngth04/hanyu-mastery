"use client";

import { Modal } from "antd";
import { Save } from "lucide-react";
import React from "react";

type DialogProps = {
  title?: string;
  open: boolean;
  onCancel: () => void;
  onOk?: () => void;
  children: React.ReactNode;
  okText?: string;
  cancelText?: string;
  width?: number;
  submitFormId?: string;
};

const DialogComponent = ({
  title,
  open,
  onCancel,
  onOk,
  children,
  okText = "Xác nhận",
  cancelText = "Hủy",
  submitFormId,
  width = 400,
}: DialogProps) => {
  return (
    <Modal
      title={title}
      centered
      open={open}
      onCancel={onCancel}
      okText={okText}
      width={width}
      footer={null}
    >
      {children}

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={onCancel}
          className="px-4 py-2 rounded-full border hover:bg-gray-100  cursor-pointer"
        >
          Hủy
        </button>

        <button
          onClick={onOk}
          form={submitFormId}
          className="flex items-center gap-2 px-5 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 cursor-pointer"
        >
          <Save size={16} />
          Lưu thay đổi
        </button>
      </div>
    </Modal>
  );
};

export default DialogComponent;
