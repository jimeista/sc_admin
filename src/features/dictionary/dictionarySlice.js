import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

//асинхронный get запрос по справочникам
export const getDictionaries = createAsyncThunk(
  'admin/getDictionaries',
  async () => {
    const url = '/sc-analytic-indicators/api/dictionaries'
    let res = await axios.get(url).then((res) => res.data)
    return res
  }
)

//асинхронный post запрос по справочникам
export const postDictionary = createAsyncThunk(
  'admin/postDictionary',
  async (data) => {
    const url = '/sc-analytic-indicators/api/dictionaries'
    await axios.post(url, data)

    let res = await axios.get(url).then((res) => res.data)
    return res
  }
)

//асинхронный put запрос по справочникам
export const putDictionary = createAsyncThunk(
  'admin/putDictionary',
  async (data) => {
    const url = `/sc-analytic-indicators/api/dictionaries`
    await axios.put(`${url}/${data.id}`, data.data)

    let res = await axios.get(url).then((res) => res.data)
    return res
  }
)

//асинхронный delete запрос по справочникам
export const deleteDictionary = createAsyncThunk(
  'admin/deleteDictionary',
  async (id) => {
    const url = `/sc-analytic-indicators/api/dictionaries`
    await axios.delete(`${url}/${id}`)

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
    selected: 'Все справочники',
  },
  reducers: {
    //меняем наименование выбранного справочника
    setSelected: (state, action) => {
      state.selected = action.payload
    },
  },
  extraReducers: {
    //get запрос справочников
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

    //post запрос справочников
    [postDictionary.pending]: (state) => {
      state.status = 'loading'
    },
    [postDictionary.fulfilled]: (state, action) => {
      state.status = 'success'
      state.data = action.payload
    },
    [postDictionary.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },

    //put запрос справочников
    [putDictionary.pending]: (state) => {
      state.status = 'loading'
    },
    [putDictionary.fulfilled]: (state, action) => {
      state.status = 'success'
      state.data = action.payload
    },
    [putDictionary.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },

    //delete запрос справочников
    [deleteDictionary.pending]: (state) => {
      state.status = 'loading'
    },
    [deleteDictionary.fulfilled]: (state, action) => {
      state.status = 'success'
      state.data = action.payload
    },
    [deleteDictionary.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
  },
})

export const { setSelected } = dictionarySlice.actions

export default dictionarySlice.reducer
