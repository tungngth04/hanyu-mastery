/* eslint-disable @typescript-eslint/no-explicit-any */
import apiConstant from "@/src/constants/api.constant";
import { RequestMethod } from "@/src/hooks/useHookReducers";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllVideos = createAsyncThunk(
  "video/getAll",
  async (params: any, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.get(apiConstant.videos.getAll, {
        params,
      });
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const getVideoDetail = createAsyncThunk(
  "video/detail",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.get(apiConstant.videos.getVideoById(id));
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const createYoutubeVideo = createAsyncThunk(
  "video/createYoutube",
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.post(
        apiConstant.videos.createYoutube,
        data,
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const createUploadVideo = createAsyncThunk(
  "video/createUpload",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.post(
        apiConstant.videos.createUpload,
        formData,
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const updateVideo = createAsyncThunk(
  "video/update",
  async ({ id, data }: { id: string; data: any }, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.patch(
        apiConstant.videos.update(id),
        data,
      );
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);

export const deleteVideo = createAsyncThunk(
  "video/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.delete(apiConstant.videos.delete(id));
      return { id, ...res.data };
    } catch (err: any) {
      return rejectWithValue(err.response?.data);
    }
  },
);
