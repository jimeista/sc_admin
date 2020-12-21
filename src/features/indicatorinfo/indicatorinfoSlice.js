import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getIndicatorInfo = createAsyncThunk(
  'admin/getIndicatorInfo',
  async () => {
    const url = '/sc-analytic-indicators/api/indicators'
    let res = await axios.get(url).then((res) => res.data)
    return res
  }
)

export const getIndicatorInfoPopUp = createAsyncThunk(
  'admin/getIndicatorInfoPopUp',
  async (id) => {
    const url = `/sc-analytic-indicators/api/indicators/${id}/indexes`
    let res = await axios.get(url).then((res) => res.data)
    return res
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

const indicatorinfoSlice = createSlice({
  name: 'indicator',
  initialState: {
    data: [],
    status: 'idle',
    error: null,

    popup: {
      data: [],
      status: 'idle',
      error: null,
    },

    dictionaries: {
      data: [],
      status: 'idle',
      error: null,
    },
  },
  reducers: {},
  extraReducers: {
    //get indicator
    [getIndicatorInfo.pending]: (state) => {
      state.status = 'loading'
    },
    [getIndicatorInfo.fulfilled]: (state, action) => {
      state.status = 'success'
      state.data = action.payload
    },
    [getIndicatorInfo.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },

    //get indicator
    [getIndicatorInfoPopUp.pending]: (state) => {
      state.popup.status = 'loading'
    },
    [getIndicatorInfoPopUp.fulfilled]: (state, action) => {
      state.popup.status = 'success'
      state.popup.data = action.payload
    },
    [getIndicatorInfoPopUp.rejected]: (state, action) => {
      state.popup.status = 'failed'
      state.popup.error = action.payload
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

export default indicatorinfoSlice.reducer
