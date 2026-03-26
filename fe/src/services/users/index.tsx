import apiConstant from "@/src/constants/api.constant";
import { RequestMethod } from "@/src/hooks/useHookReducers";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateNotification = createAsyncThunk(
  "users/updateNotification",
  async (notification: boolean, { rejectWithValue }) => {
    try {
      const response = await RequestMethod.patch(
        apiConstant.users.updateNotification,
        { notification },
      );

      return response.data.data.user;
    } catch (error) {
      return rejectWithValue(error);
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
