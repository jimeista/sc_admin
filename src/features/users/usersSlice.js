import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getUsers = createAsyncThunk('admin/getUsers', async () => {
  const url = '/sc-api-gateway/acl/users'
  let res = axios.get(url).then((res) => res.data)
  return res
})

const adminSlice = createSlice({
  name: 'roles',
  initialState: {
    data: [],
    status: 'idle',
    error: '',
  },
  reducers: {},
  extraReducers: {
    //fetch roles
    [getUsers.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getUsers.fulfilled]: (state, action) => {
      state.status = 'success'
      state.data = action.payload
    },
    [getUsers.failed]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
  },
})

export const {} = adminSlice.actions

export default adminSlice.reducer
