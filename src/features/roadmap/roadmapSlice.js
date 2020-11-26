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
    // console.log(res)
    await axios.post(`/sc-roadworks/api/roadworks/${res.data}/geometries`, {
      geometries: ob.geometries,
    })

    const coordinates = ob.mapData.map((i) => {
      if (i.type === 'polyline') {
        return i.coordinates
      } else {
        return i.coordinates[0]
      }
    })

    return {
      data: JSON.parse(res.config.data),
      id: res.data,
      geometries: {
        type: 'polygon',
        coordinates,
      },
    }
  }
)

export const postIntersections = createAsyncThunk(
  'roadmap/postIntersections',
  async (initialPost) => {
    const res = await axios.post('/sc-roadworks/api/intersections', initialPost)
    console.log(res)
    return JSON.parse(res.config.data)
  }
)

export const putRoadMap = createAsyncThunk(
  'roadmap/putRoadMap',
  async (post) => {
    if (post.reedit) {
      await axios.put(`${BASE_ROADMAP_URL}/${post.id}`, {
        ...post.data.data,
        'status-form': post.data.data.status,
      })

      //delete geometries and post new coordinates
      await axios.delete(`/sc-roadworks/api/roadworks/${post.id}/geometries`)
      await axios.post(`/sc-roadworks/api/roadworks/${post.id}/geometries`, {
        geometries: post.data.geometries,
      })

      const coordinates = post.mapData.map((i) => {
        if (i.type === 'polyline') {
          return i.coordinates
        } else {
          return i.coordinates[0]
        }
      })

      return {
        reedit: post.reedit,
        data: post.data.data,
        id: post.id,
        geometries: {
          type: 'polygon',
          coordinates,
        },
      }
    } else {
      await axios.put(`${BASE_ROADMAP_URL}/${post.id}`, {
        'status-form': post.data,
      })

      return post
    }
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
      state.crossListMapData = [...state.crossListMapData, ...action.payload]
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
    resetFormData: (state) => {
      state.formData = {}
    },
    resetIntersectionsData: (state) => {
      state.intersections.data = []
      state.intersections.status = 'idle'
    },
    setEditedId: (state) => {
      state.editedId = null
    },
    setDeletedId: (state) => {
      state.deletedId = null
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
      // let data = state.data.find((i) => i.id === action.payload.id)
      let index = state.data.findIndex((i) => i.id === action.payload.id)
      state.editedId = action.payload.id

      //ids to names
      if (action.payload.reedit) {
        console.log(action.payload, action.payload.data)
        const category = state.categories.data.find(
          (i) => i.id === action.payload.data.category
        ).name
        const region = state.regions.data.find(
          (i) => i.id === action.payload.data.region
        ).name
        const organisation = state.organisations.data.find(
          (i) => i.id === action.payload.data.organisation
        ).name
        state.data[index] = {
          ...action.payload.data,
          category,
          region,
          organisation,
          id: action.payload.id,
        }
        state.data[index].geometries = action.payload.geometries
      } else {
        state.data[index].status = {
          ...state.data[index].status,
          ...action.payload.data,
        }
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
  resetFormData,
  setEditedId,
  setDeletedId,
  resetCrossListMapData,
  resetMapData,
  resetData,
  resetIntersectionsData,
} = roadmapSlice.actions

export const selectRoadMap = (state) => state.roadmap

export default roadmapSlice.reducer
