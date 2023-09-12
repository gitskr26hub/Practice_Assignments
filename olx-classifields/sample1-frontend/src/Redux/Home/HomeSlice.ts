import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchWholeData } from "./HomeApi";

const initialState = {
  loading: false,
  error: false,
  data: {},
};

export const fetchUsersData = createAsyncThunk(
  "users/fetchWholeData",
  async ({ page, category, token }) => {
    // console.log(props.page, props.category, props.token);
    const response = await fetchWholeData(page, category, token);

    //  console.log(response.data)
    return response.data;
  }
);

const HomeSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersData.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchUsersData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        // console.log(action.payload)
        state.error = false;
      })
      .addCase(fetchUsersData.rejected, (state) => {
        state.loading = false;
        state.data = {};
        state.error = true;
      });
  },
});

export default HomeSlice.reducer;
