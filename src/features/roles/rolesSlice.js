import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

//данные запросы требуют хэшкод для обхода авторизации
//асинхронный get запрос по списку ролей
export const getRoles = createAsyncThunk('admin/getRoles', async (data) => {
  const url = '/sc-api-gateway/acl/roles'

  return await axios.get(url, data.config).then((res) => {
    return res.data
  })
})

//асинхронный get запрос по списку модулей
export const getModules = createAsyncThunk(
  'admin/getModules',
  async (config) => {
    const url = '/sc-api-gateway/acl/modules'
    const res = await axios.get(url, config).then((res) => res.data)

    return res
  }
)

//асинхронный get запрос по списку модулей указанной роли
export const getRoleModules = createAsyncThunk(
  'admin/getRoleModules',
  async (data) => {
    let modules = [] //переменная списка модулей для каждой роли

    //
    for (const role of data.roles) {
      const url = `/sc-api-gateway/acl/roles/${role.id}/authorities`
      let data_ = await axios
        .get(url, data.config)
        .then((res) => {
          return {
            id: role.id,
            repr: role.repr,
            'permitted-modules': res.data,
          }
        })
        .catch((err) => console.log(err))

      modules = [...modules, data_] //запись модулей по ролям
    }

    return modules
  }
)

//асинхронный post запрос по списку модулей указанной роли
export const postRoleModules = createAsyncThunk(
  'admin/postRoleModules',
  async (data) => {
    //добавляем новую роль с массивом id модулей на сервер, получаем id новой роли
    let id = await axios
      .post('/sc-api-gateway/acl/roles', data.post_new_role_module)
      .then((res) => res.data)

    //запрашиваем наименования модулей
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

//асинхронный put запрос по списку модулей указанной роли
export const putRoleModule = createAsyncThunk(
  'admin/putRoleModule',
  async (data) => {
    //удаляем модули по условии документации API
    if (data.removed.length > 0) {
      for (const id of data.removed) {
        await axios.delete(`/sc-api-gateway/acl/authorities/${id}`)
        // .then((res) => console.log('removed module authority', res))
      }
    }

    //добавляем модули по условии документации API
    if (data.added.length > 0) {
      for (const id of data.added) {
        await axios.post(`/sc-api-gateway/acl/roles/${data.id}/authorities`, {
          'module-id': id,
        })
        // .then((res) => console.log('added', res))
      }
    }

    //изменяем наименование роли по условии документации API
    await axios.put(`/sc-api-gateway/acl/roles/${data.id}`, { repr: data.repr })

    //запрашиваем модули роли
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

//асинхронный delete запрос по списку модулей указанной роли
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
    //роль модули для таблицы
    role_modules: {
      data: [],
      status: 'idle',
      error: '',
    },
  },
  reducers: {
    //сбрасываем данные по роли
    resetRoles: (state) => {
      state.roles.status = 'idle'
      state.roles.data = []
    },
    //сбрасываем данные по модулям
    resetModules: (state) => {
      state.modules.status = 'idle'
      state.modules.data = []
    },
    //сбрасываем данные по роль модулям
    resetRoleModules: (state) => {
      state.role_modules.status = 'idle'
      state.role_modules.data = []
    },
  },
  extraReducers: {
    //get запрос по ролям
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

    //get запрос по модулям
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

    //get запрос по роль модулям
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

    //post запрос по роль модулям
    [postRoleModules.pending]: (state) => {
      state.role_modules.status = 'loading'
    },
    [postRoleModules.fulfilled]: (state, action) => {
      state.role_modules.status = 'success'
      //добавляем новую роль с модулями
      state.role_modules.data = [action.payload, ...state.role_modules.data]
      //добавляем новую роль
      state.roles.data = [
        { repr: action.payload.repr, id: action.payload.id },
        ...state.roles.data,
      ]
    },
    [postRoleModules.failed]: (state, action) => {
      state.role_modules.status = 'failed'
      state.role_modules.error = action.payload
    },

    //put запрос по роль модулям
    [putRoleModule.pending]: (state) => {
      state.role_modules.status = 'loading'
    },
    [putRoleModule.fulfilled]: (state, action) => {
      let record = action.payload
      state.role_modules.status = 'success'

      //заменяем измененную роль с модулями
      state.role_modules.data = state.role_modules.data.map((i) =>
        i.id === record.id ? record : i
      )
      //заменяем измененную роль
      state.roles.data = state.roles.data.map((i) => {
        return i.id === record.id ? { id: record.id, repr: record.repr } : i
      })
    },
    [putRoleModule.failed]: (state, action) => {
      state.role_modules.status = 'failed'
      state.role_modules.error = action.payload
    },

    //delete запрос по роль модулям
    [deleteRoleModule.pending]: (state) => {
      state.role_modules.status = 'loading'
    },
    [deleteRoleModule.fulfilled]: (state, action) => {
      state.role_modules.status = 'success'
      //удаляем роль модули
      let index = state.role_modules.data.findIndex(
        (i) => i.id === action.payload
      )
      state.role_modules.data.splice(index, 1)

      //удаляем роль
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
