import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit'
import { DB } from '../../../main'
import { databases_storage } from '..'
import { invoke } from '@tauri-apps/api/core'

export let sheet_data = createAsyncThunk(
  'sheet/data',
  async (name: string) => {
    let info  = {}
    invoke("sheets_control")
    return info
  }
)

export let retrieve_table_thunk_builder = (
  builder: ActionReducerMapBuilder<databases_storage>
) => {
  builder.addAsyncThunk(sheet_data, {
    pending: (state, _) => {
      ;(state.loading = true), (state.status = 'pending')
    },
    fulfilled: (state, action) => {
      state.loading = false
      state.status = 'fulfilled'
    },
    rejected: _ => {}
  })
}
