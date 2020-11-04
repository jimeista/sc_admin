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

export const getRoles = createAsyncThunk('admin/getRoles', async (data) => {
  const url = '/sc-api-gateway/acl/roles'
  const res = await axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => console.log(err))

  return res
})

export const getModules = createAsyncThunk('admin/getModules', async (data) => {
  const url = '/sc-api-gateway/acl/modules'
  const res = await axios
    .get(url)
    .then((res) => res.data)
    .catch((err) => console.log(err))

  return res
})

export const getRoleModules = createAsyncThunk(
  'admin/getRoleModules',
  async (roles) => {
    let modules = []
    for (const role of roles) {
      const url = `/sc-api-gateway/acl/roles/${role.id}/authorities`
      let data = await axios
        .get(url)
        .then((res) => {
          return {
            role: role.repr,
            modules: res.data.map((i) => i['module-name']),
          }
        })
        .catch((err) => console.log(err))

      modules = [...modules, data]
    }

    return modules
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
    roles: {
      data: [],
      status: 'idle',
      error: '',
    },
    modules: {
      data: [],
      status: 'idle',
      error: '',
    },
    role_modules: {
      data: [],
      status: 'idle',
      error: '',
    },
  },
  reducers: {
    resetRoles: (state) => {
      state.roles.status = 'idle'
      state.roles.data = []
    },
    resetModules: (state) => {
      state.modules.status = 'idle'
      state.modules.data = []
    },
    resetRoleModules: (state) => {
      state.role_modules.status = 'idle'
      state.role_modules.data = []
    },
  },
  extraReducers: {
    [getRoles.pending]: (state, action) => {
      state.roles.status = 'loading'
    },
    [getRoles.fulfilled]: (state, action) => {
      state.roles.status = 'success'
      state.roles.data = action.payload
    },
    [getRoles.failed]: (state, action) => {
      state.roles.status = 'failed'
      state.roles.error = action.payload
    },
    [getCurrentUser.pending]: (state, action) => {
      state.auth.status = 'loading'
    },
    [getCurrentUser.fulfilled]: (state, action) => {
      state.auth.status = 'success'
      state.auth.data = action.payload
    },
    [getCurrentUser.failed]: (state, action) => {
      state.modules.status = 'failed'
      state.modules.error = action.payload
    },
    [getModules.pending]: (state, action) => {
      state.modules.status = 'loading'
    },
    [getModules.fulfilled]: (state, action) => {
      state.modules.status = 'success'
      state.modules.data = action.payload
    },
    [getModules.failed]: (state, action) => {
      state.modules.status = 'failed'
      state.modules.error = action.payload
    },
    [getRoleModules.pending]: (state, action) => {
      state.role_modules.status = 'loading'
    },
    [getRoleModules.fulfilled]: (state, action) => {
      state.role_modules.status = 'success'
      state.role_modules.data = action.payload
    },
    [getRoleModules.failed]: (state, action) => {
      state.role_modules.status = 'failed'
      state.role_modules.error = action.payload
    },
  },
})

export const { resetRoles, resetModules, resetRoleModules } = adminSlice.actions

export default adminSlice.reducer
