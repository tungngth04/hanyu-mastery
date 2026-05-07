/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form, Input } from "antd";

const { TextArea } = Input;

const TopicForm = ({ form }: { form: any }) => {
  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label="Tên chủ đề"
        name="name"
        rules={[{ required: true, message: "Vui lòng nhập tên chủ đề" }]}
      >
        <Input placeholder="Nhập tên chủ đề..." />
      </Form.Item>

      <Form.Item label="Mô tả" name="description">
        <TextArea rows={3} placeholder="Nhập mô tả..." />
      </Form.Item>
    </Form>
  );
};

export default TopicForm;
