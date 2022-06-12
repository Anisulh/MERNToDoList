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

//create new list
export const createList = createAsyncThunk('lists/create', async (listData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await listService.createList(listData, token)
  } catch (error) {
      const message= (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      
      return thunkAPI.rejectWithValue(message)
  }
})
//getting lists
export const getLists = createAsyncThunk('lists/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await listService.getLists(token)
  } catch (error) {
      const message= (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      
      return thunkAPI.rejectWithValue(message)
  }
})
//delete task
export const deleteList = createAsyncThunk('lists/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await listService.deleteList(id, token)
  } catch (error) {
      const message= (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      
      return thunkAPI.rejectWithValue(message)
  }
})
//updating lists
export const updateList = createAsyncThunk('lists/update', async (listData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await listService.updateList(listData.id, {name: listData.name}, token)
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
  extraReducers: (builder) => {
    builder
      .addCase(createList.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createList.fulfilled, (state, action)=>{
        state.isLoading = false
        state.isSuccess = true
        state.lists.push(action.payload)
      })
      .addCase(createList.rejected, (state, action)=>{
        state.isLoading = false
        state.isError= true
        state.message = action.payload
      })
      .addCase(getLists.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getLists.fulfilled, (state, action)=>{
        state.isLoading = false
        state.isSuccess = true
        state.lists = action.payload
      })
      .addCase(getLists.rejected, (state, action)=>{
        state.isLoading = false
        state.isError= true
        state.message = action.payload
      })
      .addCase(deleteList.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteList.fulfilled, (state, action)=>{
        state.isLoading = false
        state.isSuccess = true
        state.lists = state.lists.filter((list) => list._id !== action.payload.id)
      })
      .addCase(deleteList.rejected, (state, action)=>{
        state.isLoading = false
        state.isError= true
        state.message = action.payload
      })
      .addCase(updateList.fulfilled, (state, action)=>{
        state.isLoading = false
        state.isSuccess = true
        state.lists = state.lists.map(task => {
          return task._id === action.payload._id ? action.payload : task 
        })})
      .addCase(updateList.rejected, (state, action)=>{
        state.isLoading = false
        state.isError= true
        state.message = action.payload
      })
  },
});

export const { reset } = listSlice.actions;
export default listSlice.reducer;
