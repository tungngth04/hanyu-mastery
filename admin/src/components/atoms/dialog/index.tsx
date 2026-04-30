import { Modal } from "antd";
import React from "react";

interface ModalProps {
  open: boolean;
  title?: string;
  onCancel: () => void;
  onOk?: () => void;
  okText?: string;
  cancelText?: string;
  children: React.ReactNode;
  width?: number;
  loading?: boolean;
}

const Dialog: React.FC<ModalProps> = ({
  open,
  title,
  onCancel,
  onOk,
  okText = "Lưu",
  cancelText = "Hủy",
  children,
  width = 520,
  loading = false,
}) => {
  return (
    <Modal
      open={open}
      title={title}
      onCancel={onCancel}
      onOk={onOk}
      okText={okText}
      cancelText={cancelText}
      width={width}
      confirmLoading={loading}
      centered
      style={{ top: 20 }}
    >
      {children}
    </Modal>
  );
};

export default Dialog;
