import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getAuth = createAsyncThunk('admin/getAuth', async (data) => {
  const url = '/sc-api-gateway/acl/users/current'
  let res = await axios.get(url, data.config).then((res) => {
    if (res.status === 200) {
      localStorage.setItem(
        'user',
        JSON.stringify({ config: data.user, auth: res.data })
      )
      return res.data
    }
  })
  return { data: res, config: data.config }
})

export const getOrganisationList = createAsyncThunk(
  'admin/getOrganisationList',
  async (config) => {
    const url = '/sc-api-gateway/acl/organisations'
    const data = await axios
      .get(url, config)
      .then((res) => res.data)
      .catch((err) => console.log(err))

    return data
  }
)

export const putOrganisationList = createAsyncThunk(
  'admin/putOrganisationList',
  async (data) => {
    await axios.put(`/sc-api-gateway/acl/organisations/${data.id}`, data)
    return data
  }
)

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
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
  reducers: {
    logout: (state) => {
      state.auth.status = 'idle'
      state.auth.data = {}
    },
  },
  extraReducers: {
    //get current user info
    [getAuth.pending]: (state) => {
      state.auth.status = 'loading'
    },
    [getAuth.fulfilled]: (state, action) => {
      state.auth.status = 'success'
      state.auth.data = action.payload.data
      state.config = action.payload.config
    },
    [getAuth.failed]: (state, action) => {
      state.auth.status = 'failed'
      state.auth.error = action.payload
    },

    //get organisation list
    [getOrganisationList.pending]: (state) => {
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

    // //put organisation list
    [putOrganisationList.pending]: (state) => {
      state.organisationList.status = 'loading'
    },
    [putOrganisationList.fulfilled]: (state, action) => {
      state.organisationList.status = 'success'
      state.organisationList.data = state.organisationList.data.map((i) =>
        i.id === action.payload.id ? { ...action.payload } : i
      )
    },
    [putOrganisationList.failed]: (state, action) => {
      state.organisationList.status = 'failed'
      state.organisationList.error = action.payload
    },
  },
})

export const { logout } = adminSlice.actions

export default adminSlice.reducer
