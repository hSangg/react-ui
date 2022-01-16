import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import userApi from 'api/userApi';
import storageKey from 'Constant/storage-key';

export const register = createAsyncThunk('users/register', async (payload) => {
  const data = await userApi.register(payload);
  const infor = data.data;

  //save to localstorage
  localStorage.setItem(storageKey.TOKEN, infor.jwt);
  localStorage.setItem(storageKey.USER, JSON.stringify(infor.user));

  return infor.user;
});

export const login = createAsyncThunk('users/login', async (payload) => {
  const data = await userApi.login(payload);
  const infor = data.data;

  //save to localstorage
  localStorage.setItem(storageKey.TOKEN, infor.jwt);
  localStorage.setItem(storageKey.USER, JSON.stringify(infor.user));

  return infor.user;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(storageKey.USER)) || {},
    settings: {},
  },
  reducers: {},
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const {reducer} = userSlice;
export default reducer;
