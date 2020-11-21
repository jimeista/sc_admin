import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const BASE_ORGANIZATIONS_URL = '/sc-roadworks/api/organisations'
const BASE_REGIONS_URL = '/sc-roadworks/api/regions'
const BASE_CATEGORIES_URL = '/sc-roadworks/api/categories'
const BASE_ROADMAP_URL = '/sc-roadworks/api/roadworks'
const BASE_INTERSECTIONS_URL = '/sc-roadworks/api/intersections'

export const fecthOrganizations = createAsyncThunk(
  'roadmap/fetchOrganizations',
  async () => {
    const res = await axios.get(BASE_ORGANIZATIONS_URL)
    return res.data
  }
)

export const fecthRegions = createAsyncThunk(
  'roadmap/fetchRegions',
  async () => {
    const res = await axios.get(BASE_REGIONS_URL)
    return res.data
  }
)

export const fetchCategories = createAsyncThunk(
  'roadmap/fetchCategories',
  async () => {
    const res = await axios.get(BASE_CATEGORIES_URL)
    return res.data
  }
)

export const fetchRoadMap = createAsyncThunk(
  'roadmap/fetchRoadMap',
  async () => {
    const res = await axios.get(BASE_ROADMAP_URL)
    return res.data
  }
)

export const fetchIntersections = createAsyncThunk(
  'roadmap/fetchIntersections',
  async () => {
    const res = await axios.get(BASE_INTERSECTIONS_URL)
    return res.data
  }
)

export const postRoadMap = createAsyncThunk(
  'roadmap/postRoadMap',
  async (ob) => {
    const res = await axios.post(BASE_ROADMAP_URL, ob.data)
    console.log(res)
    await axios.post(`/sc-roadworks/api/roadworks/${res.data}/geometries`, {
      geometries: ob.geometries,
    })

    return {
      data: JSON.parse(res.config.data),
      id: res.data,
      geometries: {
        type: 'polygon',
        coordinates: ob.mapData.map((i) => i.coordinates),
      },
    }
  }
)

export const postIntersections = createAsyncThunk(
  'roadmap/postIntersections',
  async (initialPost) => {
    const res = await axios.post(
      '/sc-roadworks/api/custom-intersections',
      initialPost
    )
    console.log(res)
    return JSON.parse(res.config.data)
  }
)

export const putRoadMap = createAsyncThunk(
  'roadmap/putRoadMap',
  async (post) => {
    let ob = post.reedit
      ? { ...post.data.data, 'status-form': post.data.data.status }
      : {
          'status-form': post.data,
        }

    await axios.put(`${BASE_ROADMAP_URL}/${post.id}`, ob)

    console.log(ob)

    return post
  }
)

export const deleteRoadMap = createAsyncThunk(
  'roadmap/deleteRoadMap',
  async (dataId) => {
    await axios.delete(`${BASE_ROADMAP_URL}/${dataId}`)
    return { id: dataId }
  }
)

export const roadmapSlice = createSlice({
  name: 'roadmap',
  initialState: {
    organisations: {
      status: 'idle',
      data: [],
      error: null,
    },
    regions: {
      status: 'idle',
      data: [],
      error: null,
    },
    categories: {
      status: 'idle',
      data: [],
      error: null,
    },
    data: [],
    status: 'idle',
    error: null,
    formData: {},
    current: 0,
    mapData: [],
    crossListMapData: [],
    editedId: null,
    deletedId: null,
    editedIntersectionId: null,
    deletedIntersectionId: null,
    intersections: {
      status: 'idle',
      error: null,
      data: [],
    },
  },
  reducers: {
    formValidate: (state, action) => {
      state.formData = { ...state.formData, ...action.payload }
    },
    setCurrent: (state, action) => {
      state.current = action.payload
    },
    setMapData: (state, action) => {
      state.mapData = [...state.mapData, ...action.payload]
    },
    setCrossListMapData: (state, action) => {
      state.crossListMapData = [...state.crossListMapData, action.payload]
    },
    resetMapData: (state) => {
      state.mapData = []
    },
    resetCrossListMapData: (state) => {
      state.crossListMapData = []
    },
    resetData: (state) => {
      state.data = []
      state.status = 'idle'
    },
    resetIntersectionsData: (state) => {
      state.intersections.data = []
      state.intersections.status = 'idle'
    },
    resetForm: (state) => {
      state.mapData = []
      state.formData = {}
    },
    setEditedId: (state, action) => {
      if (action.payload.just_id) {
        state.editedId = null
      } else {
        state.editedIntersectionId = null
      }
    },
    setDeletedId: (state, action) => {
      if (action.payload.just_id) {
        state.deletedId = null
      } else {
        state.deletedIntersectionId = null
      }
    },
  },
  extraReducers: {
    [fecthOrganizations.fulfilled]: (state, action) => {
      state.organisations.status = 'success'
      state.organisations.data = action.payload
    },
    [fecthOrganizations.pending]: (state, action) => {
      state.organisations.status = 'loading'
    },
    [fecthOrganizations.rejected]: (state, action) => {
      state.organisations.status = 'failed'
      state.organisations.error = action.payload
    },
    [fecthRegions.fulfilled]: (state, action) => {
      state.regions.status = 'success'
      state.regions.data = action.payload
    },
    [fecthRegions.pending]: (state, action) => {
      state.regions.status = 'loading'
    },
    [fecthRegions.rejected]: (state, action) => {
      state.regions.status = 'failed'
      state.regions.error = action.payload
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.categories.status = 'success'
      state.categories.data = action.payload
    },
    [fetchCategories.pending]: (state, action) => {
      state.categories.status = 'loading'
    },
    [fetchCategories.rejected]: (state, action) => {
      state.categories.status = 'failed'
      state.categories.error = action.payload
    },
    [fetchRoadMap.fulfilled]: (state, action) => {
      state.status = 'success'
      state.data = action.payload
    },
    [fetchRoadMap.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchRoadMap.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
    [fetchIntersections.fulfilled]: (state, action) => {
      state.intersections.status = 'success'
      state.intersections.data = action.payload
    },
    [fetchIntersections.pending]: (state, action) => {
      state.intersections.status = 'loading'
    },
    [fetchIntersections.rejected]: (state, action) => {
      state.intersections.status = 'failed'
      state.intersections.error = action.payload
    },
    [postRoadMap.pending]: (state) => {
      state.status = 'loading'
    },
    [postRoadMap.fulfilled]: (state, action) => {
      state.status = 'success'
      let ob = action.payload.data
      const id = action.payload.id
      const geometries = action.payload.geometries
      const category = state.categories.data.find(
        (i) => i.id === action.payload.data.category
      ).name
      const region = state.regions.data.find(
        (i) => i.id === action.payload.data.region
      ).name
      const organisation = state.organisations.data.find(
        (i) => i.id === action.payload.data.organisation
      ).name
      ob = { ...ob, category, region, organisation, id, geometries }
      state.data = [ob, ...state.data]
    },
    [postIntersections.pending]: (state, action) => {
      state.intersections.status = 'loading'
    },
    [postIntersections.succes]: (state, action) => {
      state.intersections.status = 'success'
      state.intersections.data = [action.payload, ...state.intersections.data]
    },
    [putRoadMap.pending]: (state, action) => {
      state.status = 'loading'
    },
    [putRoadMap.fulfilled]: (state, action) => {
      state.status = 'success'
      let data = state.data.find((i) => i.id === action.payload.id)
      state.editedId = action.payload.id
      if (action.payload.reedit) {
        console.log('editing full data', data)
        data = { ...data, ...action.payload.data }
        data.geometries = {
          ...data.geometries,
          coordinates: action.payload.data.geometries.coordinates,
        }
        console.log('after edit', data)
      } else {
        data.status = { ...data.status, ...action.payload.data.data }
      }
    },
    [deleteRoadMap.pending]: (state) => {
      state.status = 'loading'
    },
    [deleteRoadMap.fulfilled]: (state, action) => {
      state.status = 'success'
      state.data = state.data.filter((i) => i.id !== action.payload.id)
      state.deletedId = action.payload.id
    },
  },
})

export const {
  formValidate,
  setCurrent,
  setMapData,
  setCrossListMapData,
  setIntersection,
  resetForm,
  setEditedId,
  setDeletedId,
  resetCrossListMapData,
  resetMapData,
  resetData,
  resetIntersectionsData,
} = roadmapSlice.actions

export const selectRoadMap = (state) => state.roadmap

export default roadmapSlice.reducer
