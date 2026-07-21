import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit'
import { Channel, invoke } from '@tauri-apps/api/core'
import { Area, areas_storage } from '..'

export let create_area_async_function = createAsyncThunk(
  'area/create',
  async _ => {
    let res: Area | null = {} as Area
    try {
      let channel = new Channel<Area[]>(state => {
        res = state[0]
      })
      await invoke('areas_control', {
        payload: { command: 'create' },
        channel
      }).catch(err => {
        console.error('there is a problem invoking create_area: ', err)
      })

    } catch (err) {
      console.error('there is a problem creating an area: ', err)
    }
    return res
  }
)

export let create_thunk_builder = (
  builder: ActionReducerMapBuilder<areas_storage>
) => {
  builder.addAsyncThunk(create_area_async_function, {
    pending: state => {
      state.status = 'loading'
      state.loading = true
    },
    fulfilled: (state, action) => {
      state.status = 'succeeded'
      state.loading = false
      state.list.push(action.payload)
    },
    rejected: state => {
      state.status = 'failed'
      state.loading = false
      state.error = 'There was an error creating the area.'
    }
  })
}
