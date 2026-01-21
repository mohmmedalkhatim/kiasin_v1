import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit'
import { Area, areas_storage } from '..'
import { Channel, invoke } from '@tauri-apps/api/core'

export let list = createAsyncThunk('area/list', async () => {
  let res = [] as Area[]
  try {
    let channel = new Channel<Area[]>(state => {
      res = state
      console.log(state)
    })
    await invoke('areas_control', {
      payload: { command:"list" },
      channel
    }).catch(err => {
      console.error('there is a problem invoking create_area: ', err)
    })
  } catch (err) {
    console.error("there an error with the code: ",err)
  }
  return res as Area[]
})


export let list_thunk_builder = (builder: ActionReducerMapBuilder<areas_storage>) => {
  builder.addAsyncThunk(list, {
    pending: state => {
      state.status = 'loading'
      state.loading = true
    },
    fulfilled: (state, action) => {
      state.status = 'succeeded'
      state.loading = false
      state.list = action.payload
    },
    rejected: state => {
      state.status = 'failed'
      state.loading = false
      state.error = 'There was an error creating the area.'
    }
  })
}
