import { createAsyncThunk } from '@reduxjs/toolkit'
import { retrieve } from '../retrieve'
import { RootState } from '../../../store'
import { Card } from '../..'

let create_card_state = (id: number, type: string): Card => ({
  id,
  type,
  store: {},
  size: {
    columns: 1,
    rows: 1
  }
})
export let create_card = createAsyncThunk(
  'area/create_card',
  (payload: { type: string; area_id: number }, api) => {
    let { area_id, type } = payload
    api.dispatch(retrieve(area_id))
    let { area } = api.getState() as RootState
    let { structure } = area.active.area
    structure.cards.push(create_card_state(structure.cards.length, type))
  }
)
