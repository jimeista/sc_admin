import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const BASE_ORGANIZATIONS_URL = '/sc-roadworks/api/organisations'
const BASE_REGIONS_URL = '/sc-roadworks/api/regions'
const BASE_CATEGORIES_URL = '/sc-roadworks/api/categories'
const BASE_ROADMAP_URL = '/sc-roadworks/api/roadworks'
const BASE_INTERSECTIONS_URL = '/sc-roadworks/api/intersections'

//асинхронный get запрос по списку организации
export const getRoadmapOrganisations = createAsyncThunk(
  'roadmap/getRoadmapOrganisations',
  async () => await axios.get(BASE_ORGANIZATIONS_URL).then((r) => r.data)
)

//асинхронный get запрос по списку районов
export const getRoadmapRegions = createAsyncThunk(
  'roadmap/getRoadmapRegions',
  async () => await axios.get(BASE_REGIONS_URL).then((r) => r.data)
)

//асинхронный get запрос по списку категории
export const getRoadmapCategories = createAsyncThunk(
  'roadmap/getRoadmapCategories',
  async () => await axios.get(BASE_CATEGORIES_URL).then((r) => r.data)
)

//асинхронный get запрос по списку ремонта дорог
export const getRoadmap = createAsyncThunk(
  'roadmap/getRoadmap',
  async () => await axios.get(BASE_ROADMAP_URL).then((r) => r.data)
)

//асинхронный get запрос по списку пересечения дорог
export const getIntersections = createAsyncThunk(
  'roadmap/getIntersections',
  async () => await axios.get(BASE_INTERSECTIONS_URL).then((r) => r.data)
)

//асинхронный post запрос по списку ремонта дорог
export const postRoadmap = createAsyncThunk(
  'roadmap/postRoadmap',
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

//асинхронный put запрос по списку пересечения дорог
export const postIntersections = createAsyncThunk(
  'roadmap/postIntersections',
  async (initialPost) => {
    const res = await axios.post(BASE_INTERSECTIONS_URL, initialPost)
    return {
      id: res.data,
      ...initialPost,
      intersection: { coordinates: [], type: 'Point' },
    }
  }
)

//асинхронный put запрос по списку пересечения дорог
export const putRoadmap = createAsyncThunk(
  'roadmap/putRoadmap',
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

//асинхронный delete запрос по списку ремонта дорог
export const deleteRoadmap = createAsyncThunk(
  'roadmap/deleteRoadmap',
  async (id) => {
    await axios.delete(`${BASE_ROADMAP_URL}/${id}`)
    return id
  }
)
//асинхронный delete запрос по списку пересечения дорог
export const deleteIntersection = createAsyncThunk(
  'roadmap/deleteIntersection',
  async (id) => {
    await axios.delete(`${BASE_INTERSECTIONS_URL}/${id}`)
    return id
  }
)

export const roadmapSlice = createSlice({
  name: 'roadmap',
  initialState: {
    // организации работ
    organisations: {
      status: 'idle',
      data: [],
      error: null,
    },
    // районы работ
    regions: {
      status: 'idle',
      data: [],
      error: null,
    },
    // категории работ
    categories: {
      status: 'idle',
      data: [],
      error: null,
    },
    // ремонт дорог
    data: [],
    status: 'idle',
    error: null,

    formData: {}, //состояние данных формы модального окна
    current: 0, //этап формы модального окна

    mapData: [], //состояние координат яндекс карты ремонта дорог
    intersectionsMapData: [], //состояние координат яндекс карты пересечению работ

    editedId: null, //id редактируемой данной ремонта дорог
    deletedId: null, //id удаляемой данной ремонта дорог
    deletedIntersectionId: null, //id редактируемой данной пересечению работ
    // пересечение работ
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
    setIntersectionsMapData: (state, action) => {
      state.intersectionsMapData = action.payload
    },
    resetMapData: (state) => {
      state.mapData = []
    },
    resetIntersectionsMapData: (state) => {
      state.intersectionsMapData = []
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
    setDeletedIntersectionId: (state) => {
      state.deletedIntersectionId = null
    },
  },
  extraReducers: {
    //get запрос по организации
    [getRoadmapOrganisations.fulfilled]: (state, action) => {
      state.organisations.status = 'success'
      state.organisations.data = action.payload
    },
    [getRoadmapOrganisations.pending]: (state) => {
      state.organisations.status = 'loading'
    },
    [getRoadmapOrganisations.rejected]: (state, action) => {
      state.organisations.status = 'failed'
      state.organisations.error = action.payload
    },

    //get запрос по районам
    [getRoadmapRegions.fulfilled]: (state, action) => {
      state.regions.status = 'success'
      state.regions.data = action.payload
    },
    [getRoadmapRegions.pending]: (state) => {
      state.regions.status = 'loading'
    },
    [getRoadmapRegions.rejected]: (state, action) => {
      state.regions.status = 'failed'
      state.regions.error = action.payload
    },

    //get запрос по категории работ
    [getRoadmapCategories.fulfilled]: (state, action) => {
      state.categories.status = 'success'
      state.categories.data = action.payload
    },
    [getRoadmapCategories.pending]: (state) => {
      state.categories.status = 'loading'
    },
    [getRoadmapCategories.rejected]: (state, action) => {
      state.categories.status = 'failed'
      state.categories.error = action.payload
    },

    //get запрос по ремонту дорог
    [getRoadmap.fulfilled]: (state, action) => {
      state.status = 'success'
      state.data = action.payload
    },
    [getRoadmap.pending]: (state) => {
      state.status = 'loading'
    },
    [getRoadmap.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },

    //post запрос по ремонту дорог
    [postRoadmap.pending]: (state) => {
      state.status = 'loading'
    },
    [postRoadmap.fulfilled]: (state, action) => {
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

    //put запрос по ремонту дорог
    [putRoadmap.pending]: (state) => {
      state.status = 'loading'
    },
    [putRoadmap.fulfilled]: (state, action) => {
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

    //delete запрос по ремонту дорог
    [deleteRoadmap.pending]: (state) => {
      state.status = 'loading'
    },
    [deleteRoadmap.fulfilled]: (state, action) => {
      state.status = 'success'
      let index = state.data.findIndex((i) => i.id === action.payload)
      state.data.splice(index, 1)
      state.deletedId = action.payload
    },

    //get запрос по пересечению работ
    [getIntersections.fulfilled]: (state, action) => {
      state.intersections.status = 'success'
      state.intersections.data = action.payload
    },
    [getIntersections.pending]: (state) => {
      state.intersections.status = 'loading'
    },
    [getIntersections.rejected]: (state, action) => {
      state.intersections.status = 'failed'
      state.intersections.error = action.payload
    },

    //post запрос по пересечению работ
    [postIntersections.pending]: (state) => {
      state.intersections.status = 'loading'
    },
    [postIntersections.fulfilled]: (state, action) => {
      state.intersections.status = 'success'
      state.intersections.data = [action.payload, ...state.intersections.data]
    },

    //delete запрос по пересечению работ
    [deleteIntersection.pending]: (state) => {
      state.intersections.status = 'loading'
    },
    [deleteIntersection.fulfilled]: (state, action) => {
      state.intersections.status = 'success'
      let index = state.intersections.data.findIndex(
        (i) => i.id === action.payload
      )
      state.intersections.data.splice(index, 1)
      state.deletedIntersectionId = action.payload
      console.log(action.payload, index)
    },
  },
})

export const {
  formValidate,
  setCurrent,
  setMapData,
  setIntersectionsMapData,
  setIntersection,
  resetFormData,
  setEditedId,
  setDeletedId,
  setDeletedIntersectionId,
  resetIntersectionsMapData,
  resetMapData,
  resetData,
  resetIntersectionsData,
} = roadmapSlice.actions

export default roadmapSlice.reducer
