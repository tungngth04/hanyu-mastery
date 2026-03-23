import apiConstant from "@/src/constants/api.constant";
import { RequestMethod } from "@/src/hooks/useHookReducers";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllFlashCardDeck = createAsyncThunk(
  "flashcardDeck/getAll",
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
      const response = await RequestMethod.get(
        apiConstant.flashCardDeck.getAll,
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

export const getFlashcardStats = createAsyncThunk(
  "flashcardDeck/getStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await RequestMethod.get(
        apiConstant.flashCardDeck.getStats
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
