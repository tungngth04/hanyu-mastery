import apiConstant from "@/src/constants/api.constant";
import { RequestMethod } from "@/src/hooks/useHookReducers";
import {
  IVocabularyResponse,
  IVocabularyTopic,
} from "@/src/types/interface";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTopic = createAsyncThunk<IVocabularyTopic[], void>(
  "vocabulary-topic/getTopic",
  async (_, { rejectWithValue }) => {
    try {
      const result = await RequestMethod.get(
        apiConstant.vocabularyTopic.getAll,
      );
      return result.data.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getVocabulary = createAsyncThunk<
  IVocabularyResponse,
  { topicId?: string; page?: number; pageSize?: number }
>(
  "vocabulary/getAll",
  async ({ topicId, page = 1, pageSize = 10 }, { rejectWithValue }) => {
    try {
      const result = await RequestMethod.get("/vocabulary", {
        params: {
          topicId,
          page,
          pageSize,
        },
      });

      return result.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
