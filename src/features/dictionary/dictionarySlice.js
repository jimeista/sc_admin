import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getDictionaries = createAsyncThunk(
  'admin/getDictionaries',
  async () => {
    const url = '/sc-analytic-indicators/api/dictionaries'
    let res = await axios.get(url).then((res) => res.data)
    return res
  }
)

const dictionarySlice = createSlice({
  name: 'indicator',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setSelected: (state, action) => {
      state.selected = action.payload
    },
  },
  extraReducers: {
    //get dictionary
    [getDictionaries.pending]: (state) => {
      state.status = 'loading'
    },
    [getDictionaries.fulfilled]: (state, action) => {
      state.status = 'success'
      state.data = action.payload
    },
    [getDictionaries.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
  },
})

export const { setSelected } = dictionarySlice.actions

export default dictionarySlice.reducer
