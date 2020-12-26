import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

//асинхронный get запрос индикаторов
export const getIndicator = createAsyncThunk('admin/getIndicator', async () => {
  const url = '/sc-analytic-indicators/api/indicators'
  let res = await axios.get(url).then((res) => res.data)
  return res
})

//асинхронный post запрос индикаторов
export const postIndicator = createAsyncThunk(
  'admin/postIndicator',
  async (data) => {
    const url = '/sc-analytic-indicators/api/indicators'
    let id = await axios.post(url, data.server).then((res) => {
      return res.data
    })

    //отправка объекта для обновления клиентской части
    return { id, 'contains-current-year-values': false, ...data.client }
  }
)

//асинхронный put запрос индикаторов
export const putIndicator = createAsyncThunk(
  'admin/putIndicator',
  async (data) => {
    const url = `/sc-analytic-indicators/api/indicators/${data.id}`
    await axios.put(url, data.server)

    //отправка объекта для обновления клиентской части
    return { 'contains-current-year-values': false, ...data.client }
  }
)

//асинхронный delete запрос индикаторов
export const deleteIndicator = createAsyncThunk(
  'admin/deleteIndicator',
  async (id) => {
    const url = `/sc-analytic-indicators/api/indicators/${id}`
    await axios.delete(url)

    //отправка id для обновления клиентской части
    return id
  }
)

//асинхронный get запрос справочников
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

    //справочники
    dictionaries: {
      data: [],
      status: 'idle',
      error: null,
    },
  },
  reducers: {},
  extraReducers: {
    //get запрос индикаторов
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

    //post запрос индикаторов
    [postIndicator.pending]: (state) => {
      state.status = 'loading'
    },
    [postIndicator.fulfilled]: (state, action) => {
      state.status = 'success'
      state.data = [action.payload, ...state.data] //добавляем новый объект
    },
    [postIndicator.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },

    //put запрос индикаторов
    [putIndicator.pending]: (state) => {
      state.status = 'loading'
    },
    [putIndicator.fulfilled]: (state, action) => {
      state.status = 'success'
      //редактируем объект
      state.data = state.data.map((i) =>
        i.id === action.payload.id ? action.payload : i
      )
      //записываем id редактируемого объекта
      state.putId = { id: action.payload.id, value: action.payload }
    },
    [putIndicator.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },

    //delete запрос индикаторов
    [deleteIndicator.pending]: (state) => {
      state.status = 'loading'
    },
    [deleteIndicator.fulfilled]: (state, action) => {
      state.status = 'success'
      //удаляем объект
      let index = state.data.findIndex((i) => i.id === action.payload)
      state.data.splice(index, 1)
      state.deletedId = action.payload
    },
    [deleteIndicator.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },

    //get запрос справочников
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
