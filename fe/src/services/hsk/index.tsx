/* eslint-disable @typescript-eslint/no-explicit-any */
import apiConstant from "@/src/constants/api.constant";
import { RequestMethod } from "@/src/hooks/useHookReducers";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Lấy danh sách đề thi
export const getAllHSKExam = createAsyncThunk(
  "hskExam/getAll",
  async (params: any, { rejectWithValue }) => {
    try {
      const response = await RequestMethod.get(apiConstant.hskExam.getAll, {
        params,
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// Lấy chi tiết đề thi
export const getHSKExamDetail = createAsyncThunk(
  "hskExam/getDetail",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await RequestMethod.get(apiConstant.hskExam.getById(id));

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// Lưu đáp án tạm thời
export const saveAnswerHSK = createAsyncThunk(
  "hskExam/saveAnswer",
  async (
    values: {
      examId: string;
      questionId: string;
      answer: number | string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await RequestMethod.post(
        apiConstant.hskExam.saveAnswer,
        values,
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// Nộp bài thi
export const submitHSKExam = createAsyncThunk(
  "hskExam/submit",
  async (
    values: {
      examId: string;
      answers: {
        questionId?: string;
        questionNumber?: number;
        answer: number | string;
      }[];
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await RequestMethod.post(
        apiConstant.hskExam.submit,
        values,
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// Lấy kết quả bài thi
export const getHSKExamResult = createAsyncThunk(
  "hskExam/getResult",
  async (examId: string, { rejectWithValue }) => {
    try {
      const response = await RequestMethod.get(
        apiConstant.hskExam.getResult(examId),
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
