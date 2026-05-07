/* eslint-disable @typescript-eslint/no-explicit-any */
import apiConstant from "@/src/constants/api.constant";
import { RequestMethod } from "@/src/hooks/useHookReducers";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllVocabularies = createAsyncThunk(
  "vocabulary/getAll",
  async (params: any, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.get(apiConstant.vocabulary.getAll, {
        params,
      });

      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const createVocabulary = createAsyncThunk(
  "vocabulary/create",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.post(apiConstant.vocabulary.create, data);
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const updateVocabulary = createAsyncThunk(
  "vocabulary/update",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.patch(
        apiConstant.vocabulary.update(id),
        data,
      );
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const deleteVocabulary = createAsyncThunk(
  "vocabulary/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await RequestMethod.delete(apiConstant.vocabulary.delete(id));
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const getTopicById = createAsyncThunk(
  "vocabularyTopic/getById",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.get(
        apiConstant.vocabularyTopic.getById(id),
      );

      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const getAllTopics = createAsyncThunk(
  "topic/getAll",
  async (params: any, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.get(apiConstant.vocabularyTopic.getAll, {
        params,
      });

      return res.data.data.topics;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);
