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

export const getAuthorities = createAsyncThunk(
  'admin/getAuthorities',
  async (data) => {
    const url = `/sc-api-gateway/acl/roles/${data.id}/authorities`
    let res = await axios.get(url, data.config).then((res) => res.data)

    return { role: data.repr, data: res, id: data.id }
  }
)

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
    authorities: {
      data: [],
      status: 'idle',
      error: null,
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
      state.authorities.status = 'idle'
      state.authorities.data = []
    },
    setAuth: (state, action) => {
      state.auth.status = 'success'
      state.auth.data = action.payload.auth
      state.config = action.payload.config
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
    [getAuth.rejected]: (state, action) => {
      state.auth.status = 'failed'
      state.auth.error = action.payload
    },

    //get authorities
    [getAuthorities.pending]: (state) => {
      state.authorities.status = 'loading'
    },
    [getAuthorities.fulfilled]: (state, action) => {
      state.authorities.status = 'success'
      state.authorities.data = [action.payload, ...state.authorities.data]
    },
    [getAuthorities.rejected]: (state, action) => {
      state.authorities.status = 'failed'
      state.authorities.error = action.payload
    },

    //get organisation list
    [getOrganisationList.pending]: (state) => {
      state.organisationList.status = 'loading'
    },
    [getOrganisationList.fulfilled]: (state, action) => {
      state.organisationList.status = 'success'
      state.organisationList.data = action.payload
    },
    [getOrganisationList.rejected]: (state, action) => {
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
    [putOrganisationList.rejected]: (state, action) => {
      state.organisationList.status = 'failed'
      state.organisationList.error = action.payload
    },
  },
})

export const { logout, setAuth } = adminSlice.actions

export default adminSlice.reducer
