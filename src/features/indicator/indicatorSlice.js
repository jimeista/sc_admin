import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getIndicator = createAsyncThunk('admin/getIndicator', async () => {
  const url = '/sc-analytic-indicators/api/indicators'
  let res = await axios.get(url).then((res) => res.data)
  return res
})

export const postIndicator = createAsyncThunk(
  'admin/postIndicator',
  async (data) => {
    const url = '/sc-analytic-indicators/api/indicators'
    let id = await axios.post(url, data.server).then((res) => {
      return res.data
    })
    return { id, 'contains-current-year-values': false, ...data.client }
  }
)

export const deleteIndicator = createAsyncThunk(
  'admin/deleteIndicator',
  async (id) => {
    const url = `/sc-analytic-indicators/api/indicators/${id}`
    await axios.delete(url)

    return id
  }
)

export const getDictionaries = createAsyncThunk(
  'admin/getDictionaries',
  async () => {
    const url = '/sc-analytic-indicators/api/dictionaries'
    let res = await axios.get(url).then((res) => res.data)
    return res
  }
)

const indicatorSlice = createSlice({
  name: 'indicator',
  initialState: {
    data: [],
    status: 'idle',
    error: '',

    dictionaries: {
      data: [],
      status: 'idle',
      error: null,
    },
  },
  reducers: {},
  extraReducers: {
    //get indicator
    [getIndicator.pending]: (state) => {
      state.status = 'loading'
    },
    [getIndicator.fulfilled]: (state, action) => {
      state.status = 'success'
      state.data = action.payload
    },
    [getIndicator.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },

    //post indicator
    [postIndicator.pending]: (state) => {
      state.status = 'loading'
    },
    [postIndicator.fulfilled]: (state, action) => {
      state.status = 'success'
      state.data = [action.payload, ...state.data]
    },
    [postIndicator.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },

    //delete user
    [deleteIndicator.pending]: (state) => {
      state.status = 'loading'
    },
    [deleteIndicator.fulfilled]: (state, action) => {
      state.status = 'success'
      let index = state.data.findIndex((i) => i.id === action.payload)
      state.data.splice(index, 1)
      state.id = action.payload
    },
    [deleteIndicator.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },

    //get dictionary
    [getDictionaries.pending]: (state) => {
      state.dictionaries.status = 'loading'
    },
    [getDictionaries.fulfilled]: (state, action) => {
      state.dictionaries.status = 'success'
      state.dictionaries.data = action.payload
    },
    [getDictionaries.rejected]: (state, action) => {
      state.dictionaries.status = 'failed'
      state.dictionaries.error = action.payload
    },
  },
})

// export const {} = indicatorSlice.actions

export default indicatorSlice.reducer
