import { createAsyncThunk } from '@reduxjs/toolkit'
import { Area } from '..'
import { Channel, invoke } from '@tauri-apps/api/core'

export let update_area = createAsyncThunk('area/update', async (id:number, api) => {
  try {
    let res: Area | null = null
    let channel = new Channel<Area[]>(state => {
      res = state[0]
    })
    invoke('areas_control', {
      payload: { payload: { command: 'retrieve',id  } },
      channel
    }).catch(err => {
      api.rejectWithValue('there is a problem invoking create_area: ' + err)
    })
    if (res) {
      return res
    }
  } catch (err) {
    api.rejectWithValue('there is a problem updating an area' + err)
  }
})
