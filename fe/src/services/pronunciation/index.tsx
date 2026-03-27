import apiConstant from "@/src/constants/api.constant";
import { RequestMethod } from "@/src/hooks/useHookReducers";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const uploadPronunciation = createAsyncThunk(
  "pronunciation/upload",
  async (
    data: {
      audio: Blob;
      text: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const formData = new FormData();
      formData.append("audio", data.audio, "record.webm");
      formData.append("text", data.text);

      const response = await RequestMethod.post(
        apiConstant.pronunciation.upRecord,
        formData,
        true,
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
