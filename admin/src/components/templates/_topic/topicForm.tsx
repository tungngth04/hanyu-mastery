/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form, Input } from "antd";

const { TextArea } = Input;

interface Props {
  form: any;
  initialValues?: any;
}

const TopicForm = ({ form, initialValues }: Props) => {
  return (
    <Form form={form} layout="vertical" initialValues={initialValues}>
      <Form.Item
        label="Tên bộ flashcard"
        name="title"
        rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
      >
        <Input placeholder="VD: HSK 3 từ vựng" />
      </Form.Item>

      <Form.Item label="Mô tả" name="desc">
        <TextArea rows={3} placeholder="Nhập mô tả..." />
      </Form.Item>

      <Form.Item
        label="Chủ đề"
        name="category"
        rules={[{ required: true, message: "Vui lòng nhập chủ đề!" }]}
      >
        <Input placeholder="VD: Giao tiếp" />
      </Form.Item>
    </Form>
  );
};

export default TopicForm;
