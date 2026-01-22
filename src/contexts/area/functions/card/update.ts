import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../../store'
import { Card } from '../..'



export let create_card = createAsyncThunk(
  'area/update_card',
  (payload: { id: number; card: Card }, api) => {
    let { id, card } = payload
    let state = api.getState() as RootState
    state.area.active.area.structure.cards[id] = card
  }
)
