import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slice';

const store = configureStore({
  reducer: chatReducer,
});

export default store;
