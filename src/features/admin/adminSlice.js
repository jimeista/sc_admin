import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getRoles = createAsyncThunk('admin/getRoles', async (data) => {
  const url = '/sc-api-gateway/acl/roles'
  const res = await axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => console.log(err))

  return res
})

export const getCurrentUser = createAsyncThunk(
  'admin/getCurrentUser',
  async (data) => {
    const url = '/sc-api-gateway/acl/users/current'
    const res = await axios
      .get(url)
      .then((res) => res.data)
      .catch((err) => console.log(err))

    return res
  }
)

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
    roles: {
      data: [],
      status: 'idle',
      error: '',
    },
    auth: {
      data: {},
      status: 'idle',
      error: '',
    },
  },
  reducers: {},
  extraReducers: {
    [getRoles.pending]: (state, action) => {
      state.roles.status = 'loading'
    },
    [getRoles.fulfilled]: (state, action) => {
      state.roles.status = 'success'
      state.roles.data = action.payload
    },
    [getRoles.failed]: (state, action) => {
      state.roles.status = 'failed'
      state.roles.error = action.payload
    },
    [getCurrentUser.pending]: (state, action) => {
      state.auth.status = 'loading'
    },
    [getCurrentUser.fulfilled]: (state, action) => {
      state.auth.status = 'success'
      state.auth.data = action.payload
    },
    [getCurrentUser.failed]: (state, action) => {
      state.auth.status = 'failed'
      state.auth.error = action.payload
    },
  },
})

// export const {

// } = adminSlice.actions

export default adminSlice.reducer
