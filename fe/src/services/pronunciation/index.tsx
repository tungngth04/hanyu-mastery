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

// phát âm text bất kỳ
export const speakText = createAsyncThunk(
  "pronunciation/speakText",
  async (text: string, { rejectWithValue }) => {
    try {
      const response = await RequestMethod.post(
        apiConstant.pronunciation.speak,
        { text },
      );

      return response.data.audio;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// phát âm thanh mẫu
export const speakInitial = createAsyncThunk(
  "pronunciation/speakInitial",
  async (initial: string, { rejectWithValue }) => {
    try {
      const response = await RequestMethod.post(
        apiConstant.pronunciation.speakInitial,
        { initial },
      );

      return response.data.audio;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// phát âm vận mẫu
export const speakFinal = createAsyncThunk(
  "pronunciation/speakFinal",
  async (final: string, { rejectWithValue }) => {
    try {
      const response = await RequestMethod.post(
        apiConstant.pronunciation.speakFinal,
        { final },
      );

      return response.data.audio;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
export const getPinyin = createAsyncThunk(
  "pinyin/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.get(apiConstant.pronunciation.getPinyin);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const combinePinyin = createAsyncThunk(
  "pinyin/combine",
  async (
    data: { initial?: string; final: string; tone?: number },
    { rejectWithValue },
  ) => {
    try {
      const res = await RequestMethod.post(
        apiConstant.pronunciation.combine,
        data,
      );

      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
