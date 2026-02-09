import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit'
import { Area, areas_storage } from '..'
import { Channel, invoke } from '@tauri-apps/api/core'

export let delete_area = createAsyncThunk('area/delete', async (id:number,api) => {
  let res = {} as Area
  try {
    let channel = new Channel<Area[]>(state => {
      res = state[0]
    })
    await invoke('areas_control', {
      payload: { payload: { command: 'delete',id } },
      channel
    }).catch(err => {
      console.error('there is a problem invoking create_area: ', err)
    })
  } catch (err) {
    api.rejectWithValue('there is a problem retrieving an area: ' + err)
  }
  return res as Area
})


export let delete_thunk_builder = (builder: ActionReducerMapBuilder<areas_storage>) => {
  builder.addAsyncThunk(delete_area, {
    pending: state => {
      state.status = 'loading'
      state.loading = true
    },
    fulfilled: (state) => {
      state.status = 'succeeded'
      state.loading = false
    },
    rejected: state => {
      state.status = 'failed'
      state.loading = false
      state.error = 'There was an error creating the area.'
    }
  })
}
