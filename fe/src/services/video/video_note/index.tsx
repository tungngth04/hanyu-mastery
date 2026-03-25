import apiConstant from "@/src/constants/api.constant";
import { RequestMethod } from "@/src/hooks/useHookReducers";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createNote = createAsyncThunk(
  "video/createNote",
  async (
    data: {
      videoId: string;
      time: number;
      content: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await RequestMethod.post(
        apiConstant.videoNote.createNote,
        data,
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
