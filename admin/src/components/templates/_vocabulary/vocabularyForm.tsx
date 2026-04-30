/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form, Input, InputNumber, Select } from "antd";

const { TextArea } = Input;

const VocabularyForm = ({ form }: { form: any }) => {
  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label="Hanzi"
        name="hanzi"
        rules={[{ required: true, message: "Nhập chữ Hán" }]}
      >
        <Input placeholder="你好" />
      </Form.Item>

      <Form.Item
        label="Pinyin"
        name="pinyin"
        rules={[{ required: true, message: "Nhập pinyin" }]}
      >
        <Input placeholder="nǐ hǎo" />
      </Form.Item>

      <Form.Item
        label="Nghĩa"
        name="meaning"
        rules={[{ required: true, message: "Nhập nghĩa" }]}
      >
        <TextArea rows={2} placeholder="Xin chào" />
      </Form.Item>

      <Form.Item label="Ví dụ" name="example">
        <TextArea rows={2} placeholder="你好，我叫..." />
      </Form.Item>

      <Form.Item label="Nghĩa ví dụ" name="example_meaning">
        <TextArea rows={2} placeholder="Xin chào, tôi tên là..." />
      </Form.Item>

      <Form.Item label="Cấp độ HSK" name="level">
        <Select
          placeholder="Chọn cấp độ"
          options={[
            { value: 1, label: "HSK 1" },
            { value: 2, label: "HSK 2" },
            { value: 3, label: "HSK 3" },
            { value: 4, label: "HSK 4" },
            { value: 5, label: "HSK 5" },
            { value: 6, label: "HSK 6" },
          ]}
        />
      </Form.Item>

      <Form.Item label="Số nét" name="stroke_count">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Bộ thủ" name="radical">
        <Input placeholder="亻" />
      </Form.Item>

      <Form.Item label="Audio URL" name="audio">
        <Input placeholder="https://..." />
      </Form.Item>

      <Form.Item
        label="Topic ID"
        name="topic_id"
        rules={[{ required: true, message: "Nhập topic id" }]}
      >
        <Input placeholder="topic-1" />
      </Form.Item>
    </Form>
  );
};

export default VocabularyForm;
