/* eslint-disable @typescript-eslint/no-explicit-any */
import apiConstant from "@/src/constants/api.constant";
import { RequestMethod } from "@/src/hooks/useHookReducers";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllTopics = createAsyncThunk(
  "topic/getAll",
  async (params: any, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.get(apiConstant.vocabularyTopic.getAll, {
        params,
      });

      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const createTopic = createAsyncThunk(
  "topic/create",
  async (data: { name: string; description?: string }, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.post(
        apiConstant.vocabularyTopic.create,
        data,
      );
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const updateTopic = createAsyncThunk(
  "topic/update",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.patch(
        apiConstant.vocabularyTopic.update(id),
        data,
      );
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const deleteTopic = createAsyncThunk(
  "topic/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await RequestMethod.delete(apiConstant.vocabularyTopic.delete(id));
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);
