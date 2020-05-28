import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {
  createSlice,
  combineReducers,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import authAPI from '../api/authAPI';
// import fetch from '../api/chatAPI';
import { setAuthToken } from '../utils/setAuthToken';

// Thunks
export const registerUser = createAsyncThunk(
  'register',
  async (data, { rejectWithValue }) => {
    try {
      const res = await authAPI.register(data);
      const { token } = res;
      // Set token to local storage
      localStorage.setItem('token', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      return decoded.user;
    } catch (error) {
      return rejectWithValue(error.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'login',
  async (data, { rejectWithValue }) => {
    try {
      const res = await authAPI.login(data);

      const { token } = res;
      // Set token to local storage
      localStorage.setItem('token', token);
      // Set token to API call header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      return decoded.user;
    } catch (err) {
      return rejectWithValue(err.data);
    }
  }
);

// export const fetchChats = createAsyncThunk(
//   'fetch',
//   async (dispatch, { rejectWithValue }) => {
//     try {
//       const res = await fetch();
//       dispatch(getChats(res));
//     } catch (err) {
//       return rejectWithValue(err.data);
//     }
//   }
// );

export const fetchChats = () => async (dispatch) => {
  try {
    const { data } = await axios.get('http://localhost:5000/chat/chats');
    dispatch(setFetching(true));
    console.log(data);
    dispatch(getChats(data));
  } catch (e) {
    return console.log(e);
  }
};

// Slices
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    isAuthenticated: false,
    isLoading: 'idle',
    errors: {},
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    authFailed: (state, action) => {
      state.isAuthenticated = false;
      state.errors = action.payload;
    },
    logoutUser: (state) => {
      //remove token from localStorage
      localStorage.removeItem('token');
      //remove auth header for future requests
      setAuthToken(false);
      state.isAuthenticated = false;
      state.user = {};
      state.errors = {};
    },
  },
  extraReducers: {
    [registerUser.pending]: (state, action) => {
      if (state.isLoading === 'idle') {
        state.isLoading = 'pending';
      }
    },
    [loginUser.pending]: (state, action) => {
      if (state.isLoading === 'idle') {
        state.isLoading = 'pending';
      }
    },
    [registerUser.fulfilled]: (state, action) => {
      if (state.isLoading === 'pending') {
        state.isLoading = 'idle';
        state.isAuthenticated = true;
        state.user = action.payload;
      }
    },
    [registerUser.rejected]: (state, action) => {
      if (state.isLoading === 'pending') {
        state.isLoading = 'idle';
        state.errors = action.payload;
      }
    },
    [loginUser.fulfilled]: (state, action) => {
      if (state.isLoading === 'pending') {
        state.isLoading = 'idle';
        state.isAuthenticated = true;
        state.user = action.payload;
      }
    },
    [loginUser.rejected]: (state, action) => {
      if (state.isLoading === 'pending') {
        state.isLoading = 'idle';
        state.errors = action.payload;
      }
    },
  },
});

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: [],
    isFetching: false,
  },
  reducers: {
    getChats: (state, action) => {
      state.chats = action.payload;
    },
    addChats: (state, action) => {
      state.chats = state.chats.concat(action.payload);
    },
    setFetching: (state, action) => {
      state.isFetching = action.payload;
    },
  },
});

export const {
  setCurrentUser,
  logoutUser,
  authFailed,
  setMessage,
} = authSlice.actions;

export const { getChats, addChats, setFetching } = chatSlice.actions;

// Selectors
export const selectUsername = (state) => state.auth.user.name;
export const selectUserId = (state) => state.auth.user.id;
export const selectError = (state) => state.auth.errors.msg;
export const selectAuthenticated = (state) => state.auth.isAuthenticated;
export const selectChat = (state) => state.chat.chats;

const chatReducer = combineReducers({
  auth: authSlice.reducer,
  chat: chatSlice.reducer,
});

export default chatReducer;
