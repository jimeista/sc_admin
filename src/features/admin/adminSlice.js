import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getCurrentUser = createAsyncThunk(
  'admin/getCurrentUser',
  async (data) => {
    const url = '/sc-api-gateway/acl/users/current'
    const res = await axios
      .get(url)
      .then((res) => res.data)
      .catch((err) => console.log(err))

    return res
  }
)

export const getOrganisationList = createAsyncThunk(
  'admin/getOrganisationList',
  async (data) => {
    const url = '/sc-api-gateway/acl/organisations'
    const res = await axios
      .get(url)
      .then((res) => res.data)
      .catch((err) => console.log(err))

    return res
  }
)

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
    auth: {
      data: {},
      status: 'idle',
      error: '',
    },
    organisationList: {
      data: [],
      status: 'idle',
      error: null,
    },
  },
  reducers: {},
  extraReducers: {
    //fetch current user info
    [getCurrentUser.pending]: (state, action) => {
      state.auth.status = 'loading'
    },
    [getCurrentUser.fulfilled]: (state, action) => {
      state.auth.status = 'success'
      state.auth.data = action.payload
    },
    [getCurrentUser.failed]: (state, action) => {
      state.auth.status = 'failed'
      state.auth.error = action.payload
    },

    //fetch organisation list
    [getOrganisationList.pending]: (state, action) => {
      state.organisationList.status = 'loading'
    },
    [getOrganisationList.fulfilled]: (state, action) => {
      state.organisationList.status = 'success'
      state.organisationList.data = action.payload
    },
    [getOrganisationList.failed]: (state, action) => {
      state.organisationList.status = 'failed'
      state.organisationList.error = action.payload
    },
  },
})

// export const {} = adminSlice.actions

export default adminSlice.reducer
