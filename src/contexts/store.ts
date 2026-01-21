import { configureStore, createActionCreatorInvariantMiddleware, Tuple } from '@reduxjs/toolkit'
import AreaSlice from '../contexts/area'

export let store = configureStore({
  reducer: {
    area: AreaSlice
  },

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
