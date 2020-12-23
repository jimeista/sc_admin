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

export const postDictionary = createAsyncThunk(
  'admin/postDictionary',
  async (data) => {
    const url = '/sc-analytic-indicators/api/dictionaries'
    let res = await axios.post(url, data)

    console.log(res)
    return { ...data, id: res.id }
  }
)

export const putDictionary = createAsyncThunk(
  'admin/putDictionary',
  async (data) => {
    const url = `/sc-analytic-indicators/api/dictionaries/${data.id}`
    let res = await axios.put(url, data.server)

    console.log(res)
    return { ...data.client, id: data.id }
  }
)

export const deleteDictionary = createAsyncThunk(
  'admin/deleteDictionary',
  async (id) => {
    const url = `/sc-analytic-indicators/api/dictionaries/${id}`
    let res = await axios.delete(url)

    console.log(res)
    return id
  }
)

const dictionarySlice = createSlice({
  name: 'indicator',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
    selected: 'Все справочники',
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

    //post dictionary
    [postDictionary.pending]: (state) => {
      state.status = 'loading'
    },
    [postDictionary.fulfilled]: (state, action) => {
      state.status = 'success'
      // state.data = [action.payload, ...state.data]
    },
    [postDictionary.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },

    //put dictionary
    [putDictionary.pending]: (state) => {
      state.status = 'loading'
    },
    [putDictionary.fulfilled]: (state, action) => {
      state.status = 'success'
      // state.data = [action.payload, ...state.data]
    },
    [putDictionary.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },

    //delete dictionary
    [deleteDictionary.pending]: (state) => {
      state.status = 'loading'
    },
    [deleteDictionary.fulfilled]: (state, action) => {
      state.status = 'success'
      // let index = state.data.findIndex((i) => i.id === action.payload)
      // state.data.splice(index, 1)
    },
    [deleteDictionary.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
  },
})

export const { setSelected } = dictionarySlice.actions

export default dictionarySlice.reducer
