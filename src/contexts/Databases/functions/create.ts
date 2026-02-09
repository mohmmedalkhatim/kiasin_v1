import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit'
import { DB } from '../../../main'
import { databases_storage } from '..'

export let create_table = createAsyncThunk(
  'database/create',
  async (table: { name: string; values: string[][] }, api) => {
    let values = ''
    table.values.map(items => {
      values += items[0] + ' ' + items[1] + ','
    })
    return DB.execute(`CREATE TABLE ${table.name}(${values}) `).catch(e => {
      api.rejectWithValue(e)
    })
  }
)

export let create_table_thunk_builder = (
  builder: ActionReducerMapBuilder<databases_storage>
) => {
  builder.addAsyncThunk(create_table, {
    pending: (state) => {
      state.loading = true,
      state.status = "pending"
    },
    fulfilled: (state) => {
      state.loading = false
      state.status = "fullfilled"
    },
    rejected: (_) => {}
  })
}
