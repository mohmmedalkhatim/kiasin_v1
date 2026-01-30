import { createSlice } from '@reduxjs/toolkit'
import { create_table_thunk_builder } from './functions/create'

type TableInfo = {
  columns: string[]
}
export interface databases_storage {
  tablesInfo: TableInfo[]
}
let init: databases_storage = {
  tablesInfo: []
}

let databases = createSlice({
  name: 'databases',
  initialState: init,
  reducers: {},
  extraReducers:(builder)=>{
    create_table_thunk_builder(builder)
  }
})

export default databases.reducer
