import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import listReducer from '../features/lists/listSlice'
import taskReducer from '../features/task/taskSlice'



export const store = configureStore({
  reducer: {
    auth: authReducer,
    list: listReducer,
    tasks: taskReducer,
  },
});
