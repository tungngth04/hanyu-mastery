import apiConstant from "@/src/constants/api.constant";
import { RequestMethod } from "@/src/hooks/useHookReducers";
import { createAsyncThunk } from "@reduxjs/toolkit";

// tạo comment
export const createComment = createAsyncThunk(
  "video/createComment",
  async (
    data: {
      videoId: string;
      content: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const res = await RequestMethod.post(
        apiConstant.videoComment.create,
        data,
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// lấy danh sách comment
export const getCommentsByVideo = createAsyncThunk(
  "video/getComments",
  async (videoId: string, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.get(
        apiConstant.videoComment.getByVideoId(videoId),
      );
      return res.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
