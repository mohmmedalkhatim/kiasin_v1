import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit'
import { Area, areas_storage } from '..'
import { Channel, invoke } from '@tauri-apps/api/core'

export let update = createAsyncThunk('area/update', async (area:Area,api) => {
  let res = {} as Area
  try {
    let channel = new Channel<Area[]>(state => {
      res = state[0]
    })
    await invoke('areas_control', {
      payload: { payload: { command: 'update',area } },
      channel
    }).catch(err => {
      console.error('there is a problem invoking create_area: ', err)
    })
  } catch (err) {
    api.rejectWithValue('there is a problem retrieving an area: ' + err)
  }
  return res as Area
})


export let update_thunk_builder = (builder: ActionReducerMapBuilder<areas_storage>) => {
  builder.addAsyncThunk(update, {
    pending: state => {
      state.status = 'loading'
      state.loading = true
    },
    fulfilled: (state, action) => {
      state.status = 'succeeded'
      state.loading = false
      state.list.push(action.payload)
      state.active.area = action.payload
    },
    rejected: state => {
      state.status = 'failed'
      state.loading = false
      state.error = 'There was an error creating the area.'
    }
  })
}
