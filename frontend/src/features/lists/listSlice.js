import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import listService from "./listService";

const initialState = {
  lists: [],
  list: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//create new lisr
export const register = createAsyncThunk('list/create', async (listData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await listService.createList(listData, token)
  } catch (error) {
      const message= (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      
      return thunkAPI.rejectWithValue(message)
  }
})
export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {},
});

export const { reset } = listSlice.actions;
export default listSlice.reducer;
