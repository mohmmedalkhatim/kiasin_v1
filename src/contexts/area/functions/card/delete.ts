import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../../store'

export let create_card = createAsyncThunk(
  'area/delete_card',
  (payload: { id: number; area_id: number }, api) => {
    let { id } = payload
    let state = api.getState() as RootState
    let { structure } = state.area.active.area
    let filtered_structure = structure.cards
      .filter(v => v.id != id)
      .map((item, i) => {
        item.id = i - 1
        return item
      })
    state.area.active.area.structure = { cards: filtered_structure }
  }
)
