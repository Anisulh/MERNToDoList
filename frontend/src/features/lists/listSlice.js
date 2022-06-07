import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import listService from './listService'

const initialState = {
  lists:[],
  list:{},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers:{
    reset: (state) => initialState
  },
  extraReducers: (builder) =>{

  }
})

export const {reset} = listSlice.actions
export default listSlice.reducer