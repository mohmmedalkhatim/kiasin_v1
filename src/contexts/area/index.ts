import { createSlice } from '@reduxjs/toolkit'

export interface Area {
  items: any[]
}
let init: Area = {
  items: []
}

let areas = createSlice({
  name: 'area',
  initialState: init,
  reducers: {},
  extraReducers: builder => {}
});

export default areas.reducer;
