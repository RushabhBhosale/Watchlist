import { configureStore } from '@reduxjs/toolkit'
import homeSlice from './HomeSLice'

export const store = configureStore({
  reducer: {
   home: homeSlice,
  },
})