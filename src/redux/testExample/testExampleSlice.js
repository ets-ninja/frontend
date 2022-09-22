import { createSlice } from "@reduxjs/toolkit";

const testExampleSlice = createSlice({
  name: "testExample",
  initialState: { id: null, data: null },
  reducers: {
    addItem: (state, { payload }) => ({ ...state, ...payload }),
  },
});

export default testExampleSlice;
