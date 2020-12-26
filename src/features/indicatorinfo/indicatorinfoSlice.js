import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

//асинхронный get запрос индикаторов
export const getIndicatorInfo = createAsyncThunk(
  'admin/getIndicatorInfo',
  async () => {
    const url = '/sc-analytic-indicators/api/indicators'
    let res = await axios.get(url).then((res) => res.data)
    return res
  }
)

//асинхронный get запрос показателей индикаторов
export const getIndicatorInfoPopUp = createAsyncThunk(
  'admin/getIndicatorInfoPopUp',
  async (id) => {
    const url = `/sc-analytic-indicators/api/indicators/${id}/indexes`
    let res = await axios.get(url).then((res) => res.data)
    return res
  }
)

//асинхронный post запрос показателей индикаторов
export const postIndicatorInfoPopUp = createAsyncThunk(
  'admin/postIndicatorInfoPopUp',
  async (ob) => {
    const url = `/sc-analytic-indicators/api/indicators/${ob.id}/indexes`
    let res = await axios.post(url, ob.data)

    return res.data
  }
)

//асинхронный put запрос показателей индикаторов
export const putIndicatorInfoPopUp = createAsyncThunk(
  'admin/putIndicatorInfoPopUp',
  async (ob) => {
    const url = `/sc-analytic-indicators/api/indexes/${ob.id}`
    let res = await axios.put(url, ob.data)

    return { id: ob.id, ...res.data }
  }
)

//асинхронный delete запрос показателей индикаторов
export const deleteIndicatorInfoPopUp = createAsyncThunk(
  'admin/deleteIndicatorInfoPopUp',
  async (id) => {
    const url = `/sc-analytic-indicators/api/indexes/${id}`
    await axios.delete(url)
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

const indicatorinfoSlice = createSlice({
  name: 'indicator',
  initialState: {
    //индикаторы
    data: [],
    status: 'idle',
    error: null,

    //показатели индикаторов
    popup: {
      data: [],
      status: 'idle',
      error: null,
    },

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

    //get запрос показателей индикаторов
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

    //post запрос показателей индикаторов
    [postIndicatorInfoPopUp.pending]: (state) => {
      state.popup.status = 'loading'
    },
    [postIndicatorInfoPopUp.fulfilled]: (state, action) => {
      state.popup.status = 'success'

      let index = state.popup.data.findIndex((i) => i.id === action.payload.id)

      //данное условие необходимо для добавления план|факта к уже существующему объекту
      if (index !== -1) {
        state.popup.data[index] = {
          ...state.popup.data[index],
          ...action.payload,
        }
      } else {
        state.popup.data = [action.payload, ...state.popup.data]
      }
    },
    [postIndicatorInfoPopUp.rejected]: (state, action) => {
      state.popup.status = 'failed'
      state.popup.error = action.payload
    },

    //put запрос показателей индикаторов
    [putIndicatorInfoPopUp.pending]: (state) => {
      state.popup.status = 'loading'
    },
    [putIndicatorInfoPopUp.fulfilled]: (state, action) => {
      state.popup.status = 'success'

      //редактируем показатель индикатора
      let index = state.popup.data.findIndex((i) => i.id === action.payload.id)

      state.popup.data[index] = {
        ...state.popup.data[index],
        ...action.payload,
      }
    },
    [putIndicatorInfoPopUp.rejected]: (state, action) => {
      state.popup.status = 'failed'
      state.popup.error = action.payload
    },

    //delete запрос показателей индикаторов
    [deleteIndicatorInfoPopUp.pending]: (state) => {
      state.popup.status = 'loading'
    },
    [deleteIndicatorInfoPopUp.fulfilled]: (state, action) => {
      //удаляем показатель индикатора
      state.popup.status = 'success'
      let index = state.popup.data.findIndex((i) => i.id === action.payload)
      state.popup.data.splice(index, 1)
    },
    [deleteIndicatorInfoPopUp.rejected]: (state, action) => {
      state.popup.status = 'failed'
      state.popup.error = action.payload
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

export default indicatorinfoSlice.reducer
