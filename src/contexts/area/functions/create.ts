import { createAsyncThunk } from '@reduxjs/toolkit'
import { Channel, invoke } from '@tauri-apps/api/core'
import { Area } from '..';

export let create_area = createAsyncThunk(
  'area/create',
  async (payload: Area) => {
    let res: Area | null = {} as Area;
    try {
      let channel = new Channel<Area[]>(state => {
        res = state[0]
      })
      invoke('areas_control', {
        payload: { command: 'create', item: payload },
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
