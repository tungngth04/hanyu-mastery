/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Form, Input, Select, Upload } from "antd";
import Button from "../../atoms/button";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const VideoForm = ({ form, mode = "add" }: { form: any; mode?: "add" | "edit" }) => {
  const type = Form.useWatch("type", form);

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label="Loại video"
        name="type"
        rules={[{ required: true, message: "Chọn loại video" }]}
      >
        <Select
         disabled={mode === "edit"}
          placeholder="Chọn loại"
          options={[
            { label: "YouTube", value: "youtube" },
            { label: "Upload (S3)", value: "s3" },
          ]}
        />
      </Form.Item>

      <Form.Item
        label="Tiêu đề video"
        name="title"
        rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
      >
        <Input placeholder="Nhập tiêu đề..." />
      </Form.Item>

      <Form.Item label="Mô tả" name="description">
        <TextArea rows={3} placeholder="Nhập mô tả..." />
      </Form.Item>

      {type === "youtube" && (
        <Form.Item
          label="URL YouTube"
          name="url"
          rules={[{ required: true, message: "Nhập link YouTube" }]}
        >
          <Input placeholder="https://youtube.com/..." />
        </Form.Item>
      )}

      {type === "s3" && (
        <Form.Item
          label="Upload video"
          name="file"
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
          rules={[{ required: true, message: "Chọn video" }]}
        >
          <Upload beforeUpload={() => false} maxCount={1}>
            <Button>
              <UploadOutlined /> Chọn video
            </Button>
          </Upload>
        </Form.Item>
      )}

      <Form.Item label="Thumbnail" name="thumbnail">
        <Input placeholder="https://..." />
      </Form.Item>

      <Form.Item
        label="Level"
        name="level"
        rules={[{ required: true, message: "Nhập level" }]}
      >
        <Input placeholder="VD: 1,2,3..." />
      </Form.Item>
    </Form>
  );
};

export default VideoForm;
