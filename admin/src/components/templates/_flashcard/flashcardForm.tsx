/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form, Input, Select } from "antd";

const { TextArea } = Input;

interface Props {
  form: any;
  initialValues?: any;
}

const FlashcardForm = ({ form, initialValues }: Props) => {
  return (
    <Form form={form} layout="vertical" initialValues={initialValues}>
      <Form.Item
        label="Tên bộ flashcard"
        name="title"
        rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
      >
        <Input placeholder="VD: HSK 3 từ vựng" />
      </Form.Item>

      <Form.Item label="Mô tả" name="topic">
        <TextArea rows={3} placeholder="Nhập mô tả..." />
      </Form.Item>

      <Form.Item
        label="Cấp độ"
        name="level"
        rules={[{ required: true, message: "Vui lòng chọn cấp độ!" }]}
      >
        <Select placeholder="Chọn cấp độ HSK">
          {[1, 2, 3, 4, 5, 6].map((level) => (
            <Select.Option key={level} value={level}>
              HSK {level}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default FlashcardForm;
