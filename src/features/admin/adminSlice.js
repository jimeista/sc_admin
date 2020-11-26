import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

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
    auth: {
      data: {},
      status: 'idle',
      error: '',
    },
  },
  reducers: {},
  extraReducers: {
    //fetch current user info
    [getCurrentUser.pending]: (state, action) => {
      state.auth.status = 'loading'
    },
    [getCurrentUser.fulfilled]: (state, action) => {
      state.auth.status = 'success'
      state.auth.data = action.payload
    },
    [getCurrentUser.failed]: (state, action) => {
      state.modules.status = 'failed'
      state.modules.error = action.payload
    },
  },
})

// export const {} = adminSlice.actions

export default adminSlice.reducer
