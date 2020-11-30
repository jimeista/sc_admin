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
  async () => {
    const url = '/sc-api-gateway/acl/organisations'
    const res = await axios
      .get(url)
      .then((res) => res.data)
      .catch((err) => console.log(err))

    return res
  }
)

// export const putOrganisationList = createAsyncThunk(
//   'admin/putOrganisationList',
//   async (data) => {
//     await axios.put(`/sc-api-gateway/acl/supervisors/${data.id}`, data.server)
//     return data.client
//   }
// )

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
    //get current user info
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

    //get organisation list
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

    // //put organisation list
    // [putOrganisationList.pending]: (state, action) => {
    //   state.organisationList.status = 'loading'
    // },
    // [putOrganisationList.fulfilled]: (state, action) => {
    //   state.organisationList.status = 'success'
    //   state.organisationList.data = state.organisationList.data.map((i) =>
    //     i.id === action.payload.id ? { ...action.payload } : i
    //   )
    // },
    // [putOrganisationList.failed]: (state, action) => {
    //   state.organisationList.status = 'failed'
    //   state.organisationList.error = action.payload
    // },
  },
})

// export const {} = adminSlice.actions

export default adminSlice.reducer
