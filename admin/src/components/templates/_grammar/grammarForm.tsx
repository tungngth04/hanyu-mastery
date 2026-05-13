/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form, Input, InputNumber, Select } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/src/hooks/useHookReducers";
import { getAllGrammarTopics } from "@/src/services/grammar";

const { TextArea } = Input;

const GrammarForm = ({ form }: { form: any }) => {
  const dispatch = useAppDispatch();
  const [topics, setTopics] = useState<any[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const res = await dispatch(
        getAllGrammarTopics({ page: 1, pageSize: 1000 }),
      ).unwrap();

      setTopics(res);
    };

    fetchTopics();
  }, []);

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label="Tên bài ngữ pháp"
        name="title"
        rules={[{ required: true, message: "Nhập tên bài ngữ pháp" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Nội dung" name="content">
        <TextArea rows={5} />
      </Form.Item>

      <Form.Item label="Thời lượng (phút)" name="duration">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Thứ tự" name="orderIndex">
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Chủ đề"
        name="topicId"
        rules={[{ required: true, message: "Chọn topic" }]}
      >
        <Select
          options={topics.map((t) => ({
            value: t._id,
            label: t.title,
          }))}
        />
      </Form.Item>
    </Form>
  );
};

export default GrammarForm;
