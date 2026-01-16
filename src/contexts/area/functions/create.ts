import { createAsyncThunk } from '@reduxjs/toolkit'
import { Area } from '..'
import { Channel, invoke } from '@tauri-apps/api/core'

let create_area = createAsyncThunk('area', async () => {
  try {
    let channel = new Channel<Area[]>((state)=>{
        return state[0]
    })
     await invoke('areas_control', { command: 'create',channel })
  } catch (err) {
    console.log('there is a problem creating an area: ', err)
  }
})
