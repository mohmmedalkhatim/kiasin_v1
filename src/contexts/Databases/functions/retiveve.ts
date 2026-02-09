import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit'
import { DB } from '../../../main'
import { rowInfo } from '../objects'
import { databases_storage } from '..'

export let database_info = createAsyncThunk(
  'database/info',
  async (name: string) => {
    let info = await DB.select<rowInfo[]>(`pragma table_info(${name})`)
    return info
  }
)

export let retrieve_table_thunk_builder = (
  builder: ActionReducerMapBuilder<databases_storage>
) => {
  builder.addAsyncThunk(database_info, {
    pending: (state, _) => {
      ;(state.loading = true), (state.status = 'pending')
    },
    fulfilled: (state, action) => {
      state.loading = false
      state.status = 'fulfilled'
      state.active.tableInfo = action.payload
      state.active.tableName = action.meta.arg
    },
    rejected: _ => {}
  })
}
