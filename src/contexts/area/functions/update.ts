import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit'
import { Area, areas_storage } from '..'
import { Channel, invoke } from '@tauri-apps/api/core'

export let update = createAsyncThunk('area/update', async (area: Area, api) => {
  let res = {} as Area
  try {
    let channel = new Channel<Area[]>(state => {
      res = state[0]
    })
    await invoke('areas_control', {
      payload: { command: 'update', item: area },
      channel
    })
  } catch (err) {
    api.rejectWithValue('there is a problem retrieving an area: ' + err)
  }
  return res
})

export let update_thunk_builder = (
  builder: ActionReducerMapBuilder<areas_storage>
) => {
  builder.addAsyncThunk(update, {
    pending: state => {
      state.status = 'loading'
    },
    fulfilled: (state, action) => {
      state.status = 'succeeded'
      state.active.area = action.meta.arg
    },
    rejected: state => {
      state.status = 'failed'
      state.error = 'There was an error creating the area.'
    }
  })
}
