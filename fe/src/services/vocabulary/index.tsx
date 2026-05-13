/* eslint-disable @typescript-eslint/no-explicit-any */
import apiConstant from "@/src/constants/api.constant";
import { RequestMethod } from "@/src/hooks/useHookReducers";
import {
  IVocabulary,
  IVocabularyResponse,
  IVocabularyTopic,
} from "@/src/types/interface";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTopic = createAsyncThunk<
  IVocabularyTopic[],
  { pageSize?: number }
>("vocabulary-topic/getTopic", async (params, { rejectWithValue }) => {
  try {
    const result = await RequestMethod.get(apiConstant.vocabularyTopic.getAll, {
      params,
    });
    return result.data.data.topics;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const getVocabulary = createAsyncThunk<
  IVocabularyResponse,
  {
    topicId?: string;
    page?: number;
    pageSize?: number;
    level?: number;
    keyword?: string;
  }
>(
  "vocabulary/getAll",
  async (
    { topicId, page = 1, pageSize = 10, level, keyword },
    { rejectWithValue },
  ) => {
    try {
      const result = await RequestMethod.get("/vocabulary", {
        params: {
          topicId,
          page,
          pageSize,
          level,
          keyword,
        },
      });

      return result.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getDaily = createAsyncThunk<IVocabulary[], void>(
  "vocabulary/getDaily",
  async (_, { rejectWithValue }) => {
    try {
      const result = await RequestMethod.get(apiConstant.vocabulary.getDaily);
      return result.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const addVocabularyToFlashcard = createAsyncThunk<
  any,
  { deckId: string; vocabularyId: string }
>(
  "flashcard/addVocabulary",
  async ({ deckId, vocabularyId }, { rejectWithValue }) => {
    try {
      const result = await RequestMethod.post(
        apiConstant.vocabulary.addToDeck,
        {
          deckId,
          vocabularyId,
        },
      );

      return result.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
