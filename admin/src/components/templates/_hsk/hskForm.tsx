/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form, Input, InputNumber } from "antd";

const HSKExamForm = ({
  form,
  mode = "add",
}: {
  form: any;
  mode?: "add" | "edit";
}) => {
  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label="Tiêu đề đề thi"
        name="title"
        rules={[{ required: true, message: "Nhập tiêu đề đề thi" }]}
      >
        <Input placeholder="HSK 4 H41001" />
      </Form.Item>

      <Form.Item
        label="Mã đề"
        name="code"
        rules={[{ required: true, message: "Nhập mã đề" }]}
      >
        <Input placeholder="H41001" />
      </Form.Item>

      <Form.Item
        label="Cấp độ HSK"
        name="level"
        rules={[{ required: true, message: "Nhập level" }]}
      >
        <InputNumber min={1} max={6} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Năm"
        name="year"
        rules={[{ required: true, message: "Nhập năm" }]}
      >
        <Input placeholder="2014" />
      </Form.Item>

      <Form.Item
        label="Tổng số câu hỏi"
        name="totalQuestions"
        rules={[{ required: true, message: "Nhập số câu hỏi" }]}
      >
        <InputNumber min={1} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Thời gian (phút)"
        name="totalDuration"
        rules={[{ required: true, message: "Nhập thời gian" }]}
      >
        <InputNumber min={1} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Tổng điểm"
        name="totalScore"
        rules={[{ required: true, message: "Nhập tổng điểm" }]}
        initialValue={300}
      >
        <InputNumber min={1} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Điểm đạt"
        name="passingScore"
        rules={[{ required: true, message: "Nhập điểm đạt" }]}
        initialValue={180}
      >
        <InputNumber min={1} style={{ width: "100%" }} />
      </Form.Item>
    </Form>
  );
};

export default HSKExamForm;
