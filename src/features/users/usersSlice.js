import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const getUsers = createAsyncThunk('admin/getUsers', async (config) => {
  const url = '/sc-api-gateway/acl/users'
  let res = await axios.get(url, config).then((res) => res.data)
  return res
})

export const postNewUser = createAsyncThunk(
  'admin/postNewUser',
  async (data) => {
    const url = '/sc-api-gateway/acl/users'
    let id = await axios.post(url, data.post).then((res) => res.data)

    return { 'account-id': id, ...data.record }
  }
)

export const putUser = createAsyncThunk('admin/putUser', async (data) => {
  const url = `/sc-api-gateway/acl/users/${data.record['account-id']}`
  await axios.put(url, data.post)

  return data.record
})

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
    //fetch users
    [getUsers.pending]: (state) => {
      state.status = 'loading'
    },
    [getUsers.fulfilled]: (state, action) => {
      state.status = 'success'
      state.data = action.payload
    },
    [getUsers.failed]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },

    //post user
    [postNewUser.pending]: (state) => {
      state.status = 'loading'
    },
    [postNewUser.fulfilled]: (state, action) => {
      state.status = 'success'
      state.data = [action.payload, ...state.data]
    },
    [postNewUser.failed]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },

    //edit user
    [putUser.pending]: (state) => {
      state.status = 'loading'
    },
    [putUser.fulfilled]: (state, action) => {
      console.log(action.payload)
      state.status = 'success'
      state.data = state.data.map((i) =>
        i['account-id'] === action.payload['account-id'] ? action.payload : i
      )
    },
    [putUser.failed]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },

    //delete user
    [deleteUser.pending]: (state) => {
      state.status = 'loading'
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.status = 'success'
      let index = state.data.findIndex((i) => i.id === action.payload)
      state.data.splice(index, 1)
    },
    [deleteUser.failed]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
  },
})

export const {} = adminSlice.actions

export default adminSlice.reducer
