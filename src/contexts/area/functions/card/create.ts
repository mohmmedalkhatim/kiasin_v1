import {
  createAsyncThunk,
} from '@reduxjs/toolkit'
import { retrieve } from '../retrieve'
import { RootState } from '../../../store'

export let create_card = createAsyncThunk(
  'area/create_card',
  (payload: { type: string; area_id: number }, api) => {
    let { area_id, type } = payload
    api.dispatch(retrieve(area_id))
    let { area } = api.getState() as RootState
    let { structure } = area.active
    structure.cards.push({ id: structure.cards.length, type, store: {} })
  }
)
