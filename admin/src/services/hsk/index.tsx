/* eslint-disable @typescript-eslint/no-explicit-any */
import apiConstant from "@/src/constants/api.constant";
import { RequestMethod } from "@/src/hooks/useHookReducers";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllHSKExams = createAsyncThunk(
  "hsk/getAll",
  async (params: any, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.get(apiConstant.hskExam.getAll, {
        params,
      });
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const createHSKExam = createAsyncThunk(
  "hsk/create",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.post(apiConstant.hskExam.create, data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const updateHSKExam = createAsyncThunk(
  "hsk/update",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.patch(
        apiConstant.hskExam.update(id),
        data,
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const deleteHSKExam = createAsyncThunk(
  "hsk/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.delete(apiConstant.hskExam.delete(id));
      return { id, ...res.data };
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);
