import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import taskService from './taskService'

const initialState = {
  tasks: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};


//add new task
export const addTask = createAsyncThunk('tasks/create', async (taskData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await taskService.addTask(taskData, token)
  } catch (error) {
      const message= (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      
      return thunkAPI.rejectWithValue(message)
  }
})
export const getTasks = createAsyncThunk('tasks/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await taskService.getTasks(token)
  } catch (error) {
      const message= (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      
      return thunkAPI.rejectWithValue(message)
  }
})
export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addTask.fulfilled, (state, action)=>{
        state.isLoading = false
        state.isSuccess = true
        state.tasks.push(action.payload)
      })
      .addCase(addTask.rejected, (state, action)=>{
        state.isLoading = false
        state.isError= true
        state.message = action.payload
      })
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTasks.fulfilled, (state, action)=>{
        state.isLoading = false
        state.isSuccess = true
        state.tasks = action.payload
      })
      .addCase(getTasks.rejected, (state, action)=>{
        state.isLoading = false
        state.isError= true
        state.message = action.payload
      })
  },
});

export const { reset } = taskSlice.actions;
export default taskSlice.reducer;
