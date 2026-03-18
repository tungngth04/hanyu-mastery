import apiConstant from "@/src/constants/api.constant";
import { RequestMethod } from "@/src/hooks/useHookReducers";
import { IUser } from "@/src/types/interface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (parmas: object, { rejectWithValue }) => {
    try {
      const response = await RequestMethod.get(
        apiConstant.auth.getProfile,
        parmas,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

export const postLogin = createAsyncThunk(
  "auth/postLogin",
  async (values: object, { rejectWithValue }) => {
    try {
      const response = await RequestMethod.post(apiConstant.auth.login, values);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export interface UserInfoState {
  isFetching: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
  userInfor: IUser | null;
}
const initialState: UserInfoState = {
  isFetching: false,
  error: {},
  userInfor: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserInfor: (state, action) => {
      state.userInfor = action.payload;
    },

    clearAuth: (state) => {
      state.userInfor = null;
      state.error = {};

      localStorage.removeItem("access-token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.isFetching = false;
      state.userInfor = action.payload?.data?.user;
      state.error = {};
    });
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.isFetching = true;
      state.error = action.error;
      state.userInfor = null;
    });
  },
});

const authReducer = authSlice.reducer;
export const { updateUserInfor, clearAuth } = authSlice.actions;

export default authReducer;
