import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit'
import { DB } from '../../../main'
import { databases_storage } from '..'
import { invoke } from '@tauri-apps/api/core';

export let create_sheet = createAsyncThunk(
  'sheets/create',
  async (table: { name: string; values: string[][] }, api) => {
    invoke("sheets_control",{payload:"create",item:{name:table.name}})
  }
)

export let create_table_thunk_builder = (
  builder: ActionReducerMapBuilder<databases_storage>
) => {
  builder.addAsyncThunk(create_sheet, {
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
