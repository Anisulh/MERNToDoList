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
//getting tasks
export const getTasks = createAsyncThunk('tasks/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await taskService.getTasks(token)
  } catch (error) {
      const message= (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      
      return thunkAPI.rejectWithValue(message)
  }
})
//delete task
export const deleteTask = createAsyncThunk('tasks/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await taskService.deleteTask(id, token)
  } catch (error) {
      const message= (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      
      return thunkAPI.rejectWithValue(message)
  }
})
//updating tasks
export const updateTask = createAsyncThunk('tasks/update', async (taskData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await taskService.updateTask(taskData.id, {priority: taskData.priority, name: taskData.name, completed: taskData.completed }, token)
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
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteTask.fulfilled, (state, action)=>{
        state.isLoading = false
        state.isSuccess = true
        state.tasks = state.tasks.filter((task) => task._id !== action.payload.id)
      })
      .addCase(deleteTask.rejected, (state, action)=>{
        state.isLoading = false
        state.isError= true
        state.message = action.payload
      })
      .addCase(updateTask.fulfilled, (state, action)=>{
        state.isLoading = false
        state.isSuccess = true
        state.tasks = state.tasks.map(task => {
          return task._id === action.payload._id ? action.payload : task 
        })})
      .addCase(updateTask.rejected, (state, action)=>{
        state.isLoading = false
        state.isError= true
        state.message = action.payload
      })
  },
});

export const { reset } = taskSlice.actions;
export default taskSlice.reducer;
