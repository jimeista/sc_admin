import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getHeads = createAsyncThunk('admin/getHeads', async (data) => {
  const url = '/sc-api-gateway/acl/supervisors'
  const res = await axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => console.log(err))

  return res
})

const headsSlice = createSlice({
  name: 'heads',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: {
    //fetch current user info
    [getHeads.pending]: (state, action) => {
      state.status = 'loading'
    },
    [getHeads.fulfilled]: (state, action) => {
      state.status = 'success'
      state.data = action.payload
    },
    [getHeads.failed]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
  },
})

// export const {} = headsSlice.actions

export default headsSlice.reducer
