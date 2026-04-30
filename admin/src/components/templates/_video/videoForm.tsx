/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form, Input } from "antd";

const { TextArea } = Input;

const VideoForm = ({ form }: { form: any }) => {
  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label="Tiêu đề video"
        name="title"
        rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
      >
        <Input placeholder="Nhập tiêu đề..." />
      </Form.Item>

      <Form.Item label="Mô tả" name="desc">
        <TextArea rows={3} placeholder="Nhập mô tả..." />
      </Form.Item>

      <Form.Item
        label="URL video"
        name="url"
        rules={[{ required: true, message: "Nhập URL video" }]}
      >
        <Input placeholder="https://..." />
      </Form.Item>

      <Form.Item label="Thumbnail" name="thumb">
        <Input placeholder="https://..." />
      </Form.Item>

      <Form.Item
        label="Chủ đề"
        name="level"
        rules={[{ required: true, message: "Nhập chủ đề" }]}
      >
        <Input placeholder="VD: HSK 4" />
      </Form.Item>
    </Form>
  );
};

export default VideoForm;