/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form, Input, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/src/hooks/useHookReducers";
import { getAllTopics } from "@/src/services/vocabulary";

type Topic = {
  _id: string;
  name: string;
  description?: string;
};
const VocabularyForm = ({ form }: { form: any }) => {
  const dispatch = useAppDispatch();
  const [topics, setTopics] = useState<Topic[]>([]);
  const { TextArea } = Input;

  useEffect(() => {
    const fetchTopics = async () => {
      const res = await dispatch(
        getAllTopics({ page: 1, pageSize: 1000 }),
      ).unwrap();
      setTopics(res);
    };

    fetchTopics();
  }, []);

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

      <Form.Item label="Nghĩa ví dụ" name="exampleMeaning">
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

      <Form.Item label="Số nét" name="strokeCount">
        <Input style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Bộ thủ" name="radical">
        <Input placeholder="亻" />
      </Form.Item>

      <Form.Item label="Audio URL" name="audio">
        <Input placeholder="https://..." />
      </Form.Item>

      <Form.Item
        label="Chủ đề"
        name="topicId"
        rules={[{ required: true, message: "Chọn chủ đề" }]}
      >
        <Select
          placeholder="Chọn chủ đề"
          options={topics.map((t) => ({
            value: t._id,
            label: t.name,
          }))}
        />
      </Form.Item>
    </Form>
  );
};

export default VocabularyForm;
