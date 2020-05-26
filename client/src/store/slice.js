import axios from 'axios';
import jwt_decode from 'jwt-decode';
import {
  createSlice,
  combineReducers,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import authAPI from '../api/authAPI';
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
      const res = await await authAPI.login(data);

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
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
    [loginUser.pending]: (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
    [registerUser.fulfilled]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.isAuthenticated = true;
        state.user = action.payload;
      }
    },
    [registerUser.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.errors = action.payload;
      }
    },
    [loginUser.fulfilled]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.isAuthenticated = true;
        state.user = action.payload;
      }
    },
    [loginUser.rejected]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.errors = action.payload;
      }
    },
  },
});

export const {
  setCurrentUser,
  logoutUser,
  authFailed,
  setMessage,
} = authSlice.actions;

// export const { chat } = chatSlice.actions;

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const result = await axios.get('/api/user');

    // load user into state
    dispatch(setCurrentUser(result.data));
  } catch (error) {
    // removes user object from state
    // dispatch({ type: AUTH_ERROR });
  }
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
// export const selectCount = (state) => state.counter.value;

const chatReducer = combineReducers({
  auth: authSlice.reducer,
});

export default chatReducer;
