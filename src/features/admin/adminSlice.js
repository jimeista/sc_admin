import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

//данные запросы требуют хэшкод для обхода авторизации
//асинхронный get запрос по авторизованному пользователю
export const getAuth = createAsyncThunk('admin/getAuth', async (data) => {
  const url = '/sc-api-gateway/acl/users/current'
  let res = await axios.get(url, data.config).then((res) => {
    if (res.status === 200) {
      //записываем данные в локалку
      localStorage.setItem(
        'user',
        JSON.stringify({ config: data.user, auth: res.data })
      )
      return res.data
    }
  })
  return { data: res, config: data.config }
})

//асинхронный get запрос по cписок модулей, которые доступны определенной роли
export const getAuthorities = createAsyncThunk(
  'admin/getAuthorities',
  async (data) => {
    const url = `/sc-api-gateway/acl/roles/${data.id}/authorities`
    let res = await axios.get(url, data.config).then((res) => res.data)

    return { role: data.repr, data: res, id: data.id }
  }
)

//асинхронный get запрос по cписок организации
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

//асинхронный put запрос по организации
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
    //данные авторизованного пользователя
    auth: {
      data: {},
      status: 'idle',
      error: '',
    },
    //список модулей авторизованного пользователя для бокового роутинга
    authorities: {
      data: [],
      status: 'idle',
      error: null,
    },
    //список организации
    organisationList: {
      data: [],
      status: 'idle',
      error: null,
    },
  },
  reducers: {
    //выход из системы
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
    //get запрос по авторизованному пользователю
    [getAuth.pending]: (state) => {
      state.auth.status = 'loading'
    },
    [getAuth.fulfilled]: (state, action) => {
      state.auth.status = 'success'
      state.auth.data = action.payload.data
      state.config = action.payload.config //данные по хэшкоду base64
    },
    [getAuth.rejected]: (state, action) => {
      state.auth.status = 'failed'
      state.auth.error = action.payload
    },

    //get запрос по списку модулей пользователя
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

    //get запрос по списку организации
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

    //put запрос по списку организации
    [putOrganisationList.pending]: (state) => {
      state.organisationList.status = 'loading'
    },
    [putOrganisationList.fulfilled]: (state, action) => {
      state.organisationList.status = 'success'
      //заменяем редактируемую организацию
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
