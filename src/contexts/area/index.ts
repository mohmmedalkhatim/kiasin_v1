import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { create_area } from './functions/create'

export interface Area {
  id: number
  name: string
  description: string
  structure: string
}
export interface areas_storage {
  loading: boolean  
  areas: Area[]
}

let init: areas_storage = {
  loading: false,
  areas: []
}

let areas = createSlice({
  name: 'area',
  initialState: init,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(create_area.fulfilled, (state,action) => {
    })
    builder.addCase(create_area.pending, (state) => {})
  }
})

export default areas.reducer
