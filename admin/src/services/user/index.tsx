import apiConstant from "@/src/constants/api.constant";
import { RequestMethod } from "@/src/hooks/useHookReducers";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllUsers = createAsyncThunk(
  "users/getAll",
  async (
    { page, limit }: { page: number; limit: number },
    { rejectWithValue },
  ) => {
    try {
      const res = await RequestMethod.get(
        `${apiConstant.users.getAll}?page=${page}&limit=${limit}`,
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const getUserDetail = createAsyncThunk(
  "users/detail",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.get(apiConstant.users.getDetail(id));
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const deleteUser = createAsyncThunk(
  "users/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.delete(`/users/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const toggleUserStatus = createAsyncThunk(
  "users/toggleStatus",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await RequestMethod.patch(
        apiConstant.users.toggleStatus(id),
        {},
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const updateProfile = createAsyncThunk(
  "users/updateProfile",
  async (values: object, { rejectWithValue }) => {
    try {
      const response = await RequestMethod.patch(
        apiConstant.users.updateProfile,
        values,
        true,
      );

      return response.data.data.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const changePassword = createAsyncThunk(
  "users/changePassword",
  async (
    values: {
      oldPassword: string;
      newPassword: string;
      confirmPassword: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await RequestMethod.patch(
        apiConstant.users.changePassword,
        values,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
