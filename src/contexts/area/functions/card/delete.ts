import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../../store'

export let create_card = createAsyncThunk(
  'area/delete_card',
  (payload: { id: number; area_id: number }, api) => {
    let { id } = payload
    let state = api.getState() as RootState
    let { structure } = state.area.active
    let filtered_structure = structure
      .filter(v => v.id != id)
      .map((item, i) => {
        item.id = i - 1
        return item
      })
    state.area.active.structure = filtered_structure
  }
)
