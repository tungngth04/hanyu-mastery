/* eslint-disable @typescript-eslint/no-explicit-any */
import apiConstant from "@/src/constants/api.constant";
import { RequestMethod } from "@/src/hooks/useHookReducers";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllSupport = createAsyncThunk(
  "support/getAll",
  async (params: any, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.get(apiConstant.supports.getAll, {
        params,
      });

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getSupportDetail = createAsyncThunk(
  "support/detail",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.get(apiConstant.supports.getDetail(id));
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const updateSupportStatus = createAsyncThunk(
  "support/updateStatus",
  async (
    { id, status }: { id: string; status: string },
    { rejectWithValue },
  ) => {
    try {
      const res = await RequestMethod.patch(
        apiConstant.supports.updateStatus(id),
        { status },
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
