import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchWholeBySingleUserData,
  fetchDeleteDataByUser,
} from "./PersonalApi";

const initialState = {
  loading: false,
  error: false,
  isDeleted: false,
  user: [],
};

export const fetchUserDataSingle = createAsyncThunk(
  "user/fetchWholeData",
  async (token: String) => {
    const response = await fetchWholeBySingleUserData(token);
    //  console.log(response.data)
    return response.data;
  }
);

export const DeleteDataUser = createAsyncThunk(
  "users/fetchDeleteData",
  async ({ token, id }) => {
    const response = await fetchDeleteDataByUser(token, id);

    if (response.msg === "successfully deleted") {
      return id;
    }
    //   return response.data
  }
);

const PersonalSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDataSingle.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchUserDataSingle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action?.payload?.data?.rows;
        //  console.log(action.payload)
        state.error = false;
      })
      .addCase(fetchUserDataSingle.rejected, (state) => {
        state.loading = false;
        // state.user = []
        state.error = true;
      })
      .addCase(DeleteDataUser.pending, (state) => {
        state.isDeleted = false;
      })
      .addCase(DeleteDataUser.fulfilled, (state) => {
        state.isDeleted = true;
      });
  },
});

export default PersonalSlice.reducer;
