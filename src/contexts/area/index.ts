import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { create_area } from './functions/create'

export interface Area {
  id: number
  name: string
  description: string
  structure: string
}
export interface areas_storage {
  loading: boolean;
  error: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  areas: Area[]
}

let init: areas_storage = {
  error: null,
  status: 'idle',
  loading: false,
  areas: []
}

let areas = createSlice({
  name: 'area',
  initialState: init,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(create_area.pending, (state,action) => {
      state.status = 'loading'
      state.loading = true

    })
    builder.addCase(create_area.fulfilled, (state,action) => {
      state.status = 'succeeded'
      state.loading = false
      state.areas.push(action.payload)
    })
    builder.addCase(create_area.rejected, (state) => {
      state.status = 'failed'
      state.loading = false
      state.error = 'There was an error creating the area.'
    })
  }
})

export default areas.reducer
