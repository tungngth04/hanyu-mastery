import apiConstant from "@/src/constants/api.constant";
import { RequestMethod } from "@/src/hooks/useHookReducers";
import { createAsyncThunk } from "@reduxjs/toolkit";

// 👉 Lấy sidebar (topic + lesson + progress)
export const getGrammarSidebar = createAsyncThunk(
  "grammar/getSidebar",
  async (_, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.get(apiConstant.grammar.getSidebar);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// 👉 Lấy chi tiết lesson
export const getLessonDetail = createAsyncThunk(
  "grammar/getLessonDetail",
  async (lessonId: string, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.get(
        apiConstant.grammar.getLessonDetail(lessonId),
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

// 👉 Update progress
export const updateGrammarProgress = createAsyncThunk(
  "grammar/updateProgress",
  async (
    data: { lessonId: string; progressPercent: number },
    { rejectWithValue },
  ) => {
    try {
      const res = await RequestMethod.post(
        apiConstant.grammar.updateProgress,
        data,
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
