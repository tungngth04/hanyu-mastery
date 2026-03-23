import apiConstant from "@/src/constants/api.constant";
import { RequestMethod } from "@/src/hooks/useHookReducers";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createSupport = createAsyncThunk(
  "support/createSupport",
  async (values: object, { rejectWithValue }) => {
    try {
      const response = await RequestMethod.post(
        apiConstant.supports.createSupport,
        values,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
