import apiConstant from "@/src/constants/api.constant";
import { RequestMethod } from "@/src/hooks/useHookReducers";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const saveVideo = createAsyncThunk(
  "video/saveVideo",
  async (
    data: {
      videoId: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await RequestMethod.post(
        apiConstant.videoSave.saveVideo,
        data,
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getAllVideoSave = createAsyncThunk(
  "video/getAllVideoSave",
  async (
    params: {
      page?: number;
      pageSize?: number;
      level?: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await RequestMethod.get(
        apiConstant.videoSave.getAllVideoSave,
        {
          params,
        },
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
