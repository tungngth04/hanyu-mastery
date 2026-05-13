/* eslint-disable @typescript-eslint/no-explicit-any */
import apiConstant from "@/src/constants/api.constant";
import { RequestMethod } from "@/src/hooks/useHookReducers";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Lấy danh sách flashcard deck
export const getAllFlashcardDeck = createAsyncThunk(
  "flashcardDeck/getAll",
  async (params: any, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.get(apiConstant.flashcardDeck.getAll, {
        params,
      });
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);


// Tạo deck
export const createFlashcardDeck = createAsyncThunk(
  "flashcardDeck/create",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.post(
        apiConstant.flashcardDeck.create,
        data,
      );
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);

// Update deck
export const updateFlashcardDeck = createAsyncThunk(
  "flashcardDeck/update",
  async (params: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.patch(
        apiConstant.flashcardDeck.update(params.id),
        params.data,
      );
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);

// Delete deck
export const deleteFlashcardDeck = createAsyncThunk(
  "flashcardDeck/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.delete(
        apiConstant.flashcardDeck.delete(id),
      );
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);
