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

export const putHeads = createAsyncThunk('admin/putHeads', async (data) => {
  await axios.put(`/sc-api-gateway/acl/supervisors/${data.id}`, data.server)
  return { id: data.id, record: data.client }
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
    //get current user info
    [getHeads.pending]: (state) => {
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

    //put current user info
    [putHeads.pending]: (state) => {
      state.status = 'loading'
    },
    [putHeads.fulfilled]: (state, action) => {
      state.status = 'success'
      state.data = state.data.map((i) => {
        if (i['supervisor-id'] === action.payload.id) {
          return { ...i, ...action.payload.record }
        }

        return i
      })
    },
    [putHeads.failed]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
  },
})

// export const {} = headsSlice.actions

export default headsSlice.reducer
