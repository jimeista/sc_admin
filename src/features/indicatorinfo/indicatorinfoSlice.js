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

export const postIndicatorInfoPopUp = createAsyncThunk(
  'admin/postIndicatorInfoPopUp',
  async (ob) => {
    const url = `/sc-analytic-indicators/api/indicators/${ob.id}/indexes`
    let res = await axios.post(url, ob.data)

    return res.data
  }
)

export const putIndicatorInfoPopUp = createAsyncThunk(
  'admin/putIndicatorInfoPopUp',
  async (ob) => {
    const url = `/sc-analytic-indicators/api/indexes/${ob.id}`
    let res = await axios.put(url, ob.data)

    return { id: ob.id, ...res.data }
  }
)

export const deleteIndicatorInfoPopUp = createAsyncThunk(
  'admin/deleteIndicatorInfoPopUp',
  async (id) => {
    const url = `/sc-analytic-indicators/api/indexes/${id}`
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

    //get indicatorinfo
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

    //post indicatorinfo
    [postIndicatorInfoPopUp.pending]: (state) => {
      state.popup.status = 'loading'
    },
    [postIndicatorInfoPopUp.fulfilled]: (state, action) => {
      state.popup.status = 'success'

      let index = state.popup.data.findIndex((i) => i.id === action.payload.id)

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

    //put indicatorinfo
    [putIndicatorInfoPopUp.pending]: (state) => {
      state.popup.status = 'loading'
    },
    [putIndicatorInfoPopUp.fulfilled]: (state, action) => {
      state.popup.status = 'success'

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

    //delete indicatorinfo
    [deleteIndicatorInfoPopUp.pending]: (state) => {
      state.popup.status = 'loading'
    },
    [deleteIndicatorInfoPopUp.fulfilled]: (state, action) => {
      state.popup.status = 'success'
      let index = state.popup.data.findIndex((i) => i.id === action.payload)
      state.popup.data.splice(index, 1)
    },
    [deleteIndicatorInfoPopUp.rejected]: (state, action) => {
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
