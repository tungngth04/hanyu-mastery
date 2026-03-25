import apiConstant from "@/src/constants/api.constant";
import { RequestMethod } from "@/src/hooks/useHookReducers";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateProgress = createAsyncThunk(
  "video/updateProgress",
  async (
    data: {
      videoId: string;
      currentTime: number;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await RequestMethod.post(
        apiConstant.videoProgress.saveProgress,
        data,
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
