import { createAsyncThunk } from '@reduxjs/toolkit'
import { Channel, invoke } from '@tauri-apps/api/core'
import { Area } from '..';

export let delete_area = createAsyncThunk(
  'area/delete',
  async (payload: Area) => {
    try {
      let res: Area | null = null;
      let channel = new Channel<Area[]>(state => {
        res = state[0]
      })
      invoke('areas_control', {
        payload: { command: 'delete', item: payload },
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
  }
)
