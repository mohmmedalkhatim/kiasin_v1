import { createSlice } from '@reduxjs/toolkit'
import { create_table_thunk_builder } from './functions/create'
import { tableInfo } from '../../pages/Databases/table_screen/objects'
import { retrieve_table_thunk_builder } from './functions/retiveve'

export interface databases_storage {
  active: {
    tableInfo: tableInfo
    tableName:string
  }
  err: string
  status: string
  loading: boolean
}
let init: databases_storage = {
  active: {
    tableInfo: {} as tableInfo,
    tableName:""
  },
  err: '',
  status: 'idle',
  loading: false,
}

let databases = createSlice({
  name: 'databases',
  initialState: init,
  reducers: {},
  extraReducers: builder => {
    create_table_thunk_builder(builder)
    retrieve_table_thunk_builder(builder)
  }
})

export default databases.reducer
