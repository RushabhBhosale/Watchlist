import { createSlice } from '@reduxjs/toolkit'

export const homeSlice = createSlice({
  name: 'home',
  initialState : {
   url: {},
   genres: {},
   recommendations: {},
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
    }
  },
})

export const { getApiConfiguration, getGenres, getRecommendations} = homeSlice.actions

export default homeSlice.reducer