import { createAsyncThunk } from '@reduxjs/toolkit'
import { Area } from '..'
import { Channel, invoke } from '@tauri-apps/api/core'

export let retrieve = createAsyncThunk('area/retrieve', async () => {
  try {
    let res: Area | null = null
    let channel = new Channel<Area[]>(state => {
      res = state[0]
    })
    invoke('areas_control', {
      payload: { payload: { command: 'retrieve' } },
      channel
    }).catch(err => {
      console.error('there is a problem invoking create_area: ', err)
    })
    if (res) {
      return res
    }
  } catch (err) {
    console.error('there is a problem creating an area: ', err)
  }
})
