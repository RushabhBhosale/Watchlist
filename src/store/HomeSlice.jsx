import { createSlice } from '@reduxjs/toolkit'

export const homeSlice = createSlice({
  name: 'home',
  initialState : {
   url: {},
   genres: {},
   recommendations: {},
   search: {},
  },
  reducers: {
    getApiConfiguration: (state, action) => {
      state.url = action.payload
    },
    getGenres: (state, action) => {
      state.genres = (action.payload)
    },
    getRecommendations: (state, action) => {
      state.recommendations = (action.payload)
    },
    getSearchTerm: (state, action) => {
      state.search = (action.payload)
    },
  },
})

export const { getApiConfiguration, getGenres, getRecommendations, getSearchTerm} = homeSlice.actions

export default homeSlice.reducer