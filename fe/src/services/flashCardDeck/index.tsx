/* eslint-disable @typescript-eslint/no-explicit-any */
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
        apiConstant.flashCardDeck.getStats,
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const createFlashcardDeck = createAsyncThunk(
  "flashcardDeck/create",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.post(
        apiConstant.flashCardDeck.create,
        data,
      );

      return res.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);
