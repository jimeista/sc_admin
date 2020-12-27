import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

//данные запросы требуют хэшкод для обхода авторизации
//асинхронный get запрос по списку пользователей
export const getUsers = createAsyncThunk('admin/getUsers', async (config) => {
  const url = '/sc-api-gateway/acl/users'
  let res = await axios.get(url, config).then((res) => res.data)
  return res
})

//асинхронный post запрос по списку пользователей
export const postNewUser = createAsyncThunk(
  'admin/postNewUser',
  async (data) => {
    const url = '/sc-api-gateway/acl/users'
    let id = await axios.post(url, data.post).then((res) => {
      return res.data
    })

    return { 'account-id': id, ...data.record }
  }
)

//асинхронный put запрос по списку пользователей
export const putUser = createAsyncThunk('admin/putUser', async (data) => {
  const url = `/sc-api-gateway/acl/users/${data.record['account-id']}`
  await axios.put(url, data.post)

  return data.record
})

//асинхронный delete запрос по списку пользователей
export const deleteUser = createAsyncThunk('admin/deleteUser', async (id) => {
  const url = `/sc-api-gateway/acl/users/${id}`
  await axios.delete(url)

  return id
})

const adminSlice = createSlice({
  name: 'roles',
  initialState: {
    data: [],
    status: 'idle',
    error: '',
  },
  reducers: {},
  extraReducers: {
    //get запрос по пользователям
    [getUsers.pending]: (state) => {
      state.status = 'loading'
    },
    [getUsers.fulfilled]: (state, action) => {
      state.status = 'success'
      state.data = action.payload
    },
    [getUsers.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },

    //post запрос по пользователям
    [postNewUser.pending]: (state) => {
      state.status = 'loading'
    },
    [postNewUser.fulfilled]: (state, action) => {
      state.status = 'success'
      //добавляем в массив нового пользователя для обновления клиента
      state.data = [action.payload, ...state.data]
    },
    [postNewUser.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },

    //put запрос по пользователям
    [putUser.pending]: (state) => {
      state.status = 'loading'
    },
    [putUser.fulfilled]: (state, action) => {
      state.status = 'success'
      //заменяем измененные данные пользователя
      state.data = state.data.map((i) =>
        i['account-id'] === action.payload['account-id'] ? action.payload : i
      )
    },
    [putUser.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },

    //delete запрос по пользователям
    [deleteUser.pending]: (state) => {
      state.status = 'loading'
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.status = 'success'
      //находим id и удаляем пользователя
      let index = state.data.findIndex((i) => i.id === action.payload)
      state.data.splice(index, 1)
    },
    [deleteUser.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
  },
})

// export const {} = adminSlice.actions

export default adminSlice.reducer
