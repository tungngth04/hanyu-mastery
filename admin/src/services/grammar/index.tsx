/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RequestMethod } from "@/src/hooks/useHookReducers";
import apiConstant from "@/src/constants/api.constant";

export const getAllLessons = createAsyncThunk(
  "grammar/getAllLessons",
  async (params: any, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.get(apiConstant.grammar.getAllLessons, {
        params,
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const createLesson = createAsyncThunk(
  "grammar/createLesson",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.post(
        apiConstant.grammar.createLesson,
        data,
      );
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const updateLesson = createAsyncThunk(
  "grammar/updateLesson",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.patch(
        apiConstant.grammar.updateLesson(id),
        data,
      );
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const deleteLesson = createAsyncThunk(
  "grammar/deleteLesson",
  async (id: string, { rejectWithValue }) => {
    try {
      await RequestMethod.delete(apiConstant.grammar.deleteLesson(id));
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const getAllGrammarTopics = createAsyncThunk(
  "grammar/getAllGrammarTopics",
  async (params: any, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.get(apiConstant.grammar.getAllTopics, {
        params,
      });
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);
