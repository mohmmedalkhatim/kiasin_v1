import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit'
import { DB } from '../../../main'
import { databases_storage } from '..'
import { Channel, invoke } from '@tauri-apps/api/core'
import { Sheet } from '../objects'

export let sheet_data = createAsyncThunk(
  'sheet/data',
  async (id: number,) => {
    let channel = new Channel<Sheet>((res)=>{

    })
    invoke("sheets_control",{payload:{command:"retrieve",id}})
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
