import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import chatReducer from './slice';

const persistConfig = {
  key: 'root',
  whitelist: ['authReducer'],
  storage,
};

const persistedReducer = persistReducer(persistConfig, chatReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

let persistor = persistStore(store);

export { store, persistor };
