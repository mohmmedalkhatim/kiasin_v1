import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit'
import { DB } from '../../../main'
import { tableInfo } from '../../../pages/Databases/table_screen/objects'
import { databases_storage } from '..'

export let retrieve_table = createAsyncThunk(
  'database/retrieve',
  async (table: string) => {
    let tables = await DB.select<string[]>(`select * from ${table}`)
    console.log(tables)
    return tables[0]
  }
)

export let database_info = createAsyncThunk(
  'database/info',
  async (name: string) => {
    let info = await DB.select<tableInfo>(`pragma table_info('${name}')`)
    return info
  }
)

export let retrieve_table_thunk_builder = (
  builder: ActionReducerMapBuilder<databases_storage>
) => {
  builder.addAsyncThunk(database_info, {
    pending: (state, action) => {
      ;(state.loading = true), (state.status = 'pending')
    },
    fulfilled: (state, action) => {
      ;(state.loading = false), (state.status = 'fulfilled')
    },
    rejected: state => {}
  })
  builder.addAsyncThunk(retrieve_table, {
    pending: (state, action) => {
      ;(state.loading = true), (state.status = 'pending')
    },
    fulfilled: (state, action) => {
      ;(state.loading = false), (state.status = 'fulfilled')
      state.active.tableInfo = action.payload as unknown as tableInfo
    },
    rejected: state => {}
  })
}
