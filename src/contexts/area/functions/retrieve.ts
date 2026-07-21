import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit'
import { Area, areas_storage } from '..'
import { Channel, invoke } from '@tauri-apps/api/core'

export let retrieve = createAsyncThunk(
  'area/retrieve',
  async (id: number, api) => {
    let res = {} as Area
    try {
      let channel = new Channel<Area[]>(state => {
        res = state[0]
      })
      await invoke('areas_control', {
        payload: { command: 'retrieve',id },
        channel
      }).catch(err => {
        console.error('there is a problem invoking retrieve_area: ', err)
      })
    } catch (err) {
      api.rejectWithValue('there is a problem retrieving an area: ' + err)
    }
    return res as Area
  }
)

export let retrieve_thunk_builder = (
  builder: ActionReducerMapBuilder<areas_storage>
) => {
  builder.addAsyncThunk(retrieve, {
    pending: state => {
      state.status = 'loading'
      state.loading = true
    },
    fulfilled: (state, action) => {
      state.status = 'succeeded'
      state.loading = false
      state.active.area = action.payload
    },
    rejected: state => {
      state.status = 'failed'
      state.loading = false
      state.error = 'There was an error creating the area.'
    }
  })
}
