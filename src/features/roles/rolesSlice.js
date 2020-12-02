import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getRoles = createAsyncThunk('admin/getRoles', async (data) => {
  const url = '/sc-api-gateway/acl/roles'
  let isAdmin = false

  //check if SUPER-ADMIN is loged to show super-admin role
  // data.auth.roles.forEach((name) => {
  //   if (name === 'SUPER-ADMIN') {
  //     isAdmin = true
  //   }
  // })

  //validate SUPER-ADMIN privileges
  const res = await axios
    .get(url, data.config)
    .then((res) => {
      // if (!isAdmin) {
      //   return res.data.filter((i) => i.repr !== 'Супер-Администратор')
      // }
      return res.data
    })
    .catch((err) => console.log(err))

  return res
})

export const getModules = createAsyncThunk(
  'admin/getModules',
  async (config) => {
    const url = '/sc-api-gateway/acl/modules'
    const res = await axios
      .get(url, config)
      .then((res) => res.data)
      .catch((err) => console.log(err))

    return res
  }
)

export const getRoleModules = createAsyncThunk(
  'admin/getRoleModules',
  async (data) => {
    let modules = []
    for (const role of data.roles) {
      const url = `/sc-api-gateway/acl/roles/${role.id}/authorities`
      let data_ = await axios
        .get(url, data.config)
        .then((res) => {
          // console.log(res.data)
          return {
            id: role.id,
            repr: role.repr,
            'permitted-modules': res.data,
          }
        })
        .catch((err) => console.log(err))

      modules = [...modules, data_]
    }

    return modules
  }
)

export const postRoleModules = createAsyncThunk(
  'admin/postRoleModules',
  async (data) => {
    let id = await axios
      .post('/sc-api-gateway/acl/roles', data.post_new_role_module)
      .then((res) => res.data)

    let permitted_modules = await axios
      .get(`/sc-api-gateway/acl/roles/${id}/authorities`)
      .then((res) => res.data)

    return {
      ...data.record_new_role_module,
      id,
      'permitted-modules': permitted_modules,
    }
  }
)

export const putRoleModule = createAsyncThunk(
  'admin/putRoleModule',
  async (data) => {
    //delete module authority
    if (data.removed.length > 0) {
      for (const id of data.removed) {
        await axios.delete(`/sc-api-gateway/acl/authorities/${id}`)
        // .then((res) => console.log('removed module authority', res))
      }
    }

    //add new authority
    if (data.added.length > 0) {
      for (const id of data.added) {
        await axios.post(`/sc-api-gateway/acl/roles/${data.id}/authorities`, {
          'module-id': id,
        })
        // .then((res) => console.log('added', res))
      }
    }

    //change role name
    await axios.put(`/sc-api-gateway/acl/roles/${data.id}`, { repr: data.repr })

    let permitted_modules = await axios
      .get(`/sc-api-gateway/acl/roles/${data.id}/authorities`)
      .then((res) => res.data)

    return {
      id: data.id,
      repr: data.repr,
      'permitted-modules': permitted_modules,
    }
  }
)

export const deleteRoleModule = createAsyncThunk(
  'admin/deleteRoleModule',
  async (id) => {
    axios.delete(`/sc-api-gateway/acl/roles/${id}`)
    return id
  }
)

const adminSlice = createSlice({
  name: 'roles',
  initialState: {
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
    //get roles
    [getRoles.pending]: (state) => {
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

    //get all available modules
    [getModules.pending]: (state) => {
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

    //get all roles' modules
    [getRoleModules.pending]: (state) => {
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

    //post new role
    [postRoleModules.pending]: (state) => {
      state.role_modules.status = 'loading'
    },
    [postRoleModules.fulfilled]: (state, action) => {
      state.role_modules.status = 'success'
      state.role_modules.data = [action.payload, ...state.role_modules.data]
      state.roles.data = [
        { repr: action.payload.repr, id: action.payload.id },
        ...state.roles.data,
      ]
    },
    [postRoleModules.failed]: (state, action) => {
      state.role_modules.status = 'failed'
      state.role_modules.error = action.payload
    },

    //update role module
    [putRoleModule.pending]: (state) => {
      state.role_modules.status = 'loading'
    },
    [putRoleModule.fulfilled]: (state, action) => {
      let record = action.payload
      state.role_modules.status = 'success'
      state.role_modules.data = state.role_modules.data.map((i) =>
        i.id === record.id ? record : i
      )
      state.roles.data = state.roles.data.map((i) => {
        return i.id === record.id ? { id: record.id, repr: record.repr } : i
      })
    },
    [putRoleModule.failed]: (state, action) => {
      state.role_modules.status = 'failed'
      state.role_modules.error = action.payload
    },

    //delete role module
    [deleteRoleModule.pending]: (state) => {
      state.role_modules.status = 'loading'
    },
    [deleteRoleModule.fulfilled]: (state, action) => {
      state.role_modules.status = 'success'
      let index = state.role_modules.data.findIndex(
        (i) => i.id === action.payload
      )
      state.role_modules.data.splice(index, 1)
      let indx = state.roles.data.findIndex((i) => i.id === action.payload)
      state.roles.data.splice(indx, 1)
    },
    [deleteRoleModule.failed]: (state, action) => {
      state.role_modules.status = 'failed'
      state.role_modules.error = action.payload
    },
  },
})

export const { resetRoles, resetModules, resetRoleModules } = adminSlice.actions

export default adminSlice.reducer
