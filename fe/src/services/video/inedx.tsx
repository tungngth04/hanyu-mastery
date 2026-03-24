import apiConstant from "@/src/constants/api.constant";
import { RequestMethod } from "@/src/hooks/useHookReducers";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllVideo = createAsyncThunk(
  "video/getAll",
  async (
    params: {
      page?: number;
      pageSize?: number;
      search?: string;
      level?: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await RequestMethod.get(apiConstant.videos.getAll, {
        params,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getVideoById = createAsyncThunk(
  "video/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await RequestMethod.get(
        apiConstant.videos.getVideoById(id),
      );
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
