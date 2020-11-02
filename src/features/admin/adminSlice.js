import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import axios from 'axios'
// import moment from 'moment'

const adminSlice = createSlice({
  name: 'exchange',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: {},
})

// export const {

// } = adminSlice.actions

export default adminSlice.reducer
