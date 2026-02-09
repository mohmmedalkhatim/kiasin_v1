import {
  ActionReducerMapBuilder,
  createAsyncThunk
} from '@reduxjs/toolkit'
import { RootState } from '../../../store'
import { areas_storage, Card } from '../..'

export let update_card = createAsyncThunk(
  'area/update_card',
  (payload: { index: number; card: Card }, api) => {
    let list:Card[] = [];
    try {
      let { index, card } = payload
      let state = api.getState() as RootState
      let cards = structuredClone(state.area.active.area.structure.cards)
      let area = state.area.active.area
      cards[index] = card
      list = cards
      area.structure.cards = list
      return list
    } catch (err) {
      console.error(err)
    }
    return list as Card[]
  }
)

export let update_card_builder = (
  builder: ActionReducerMapBuilder<areas_storage>
) => {
  builder.addAsyncThunk(update_card, {
    pending: state => {
      state.loading = true
      state.status = 'loading'
    },
    fulfilled: (state, action) => {
      state.active.area.structure.cards = action.payload
      state.loading = false
      state.status = 'idle'
    },
    rejected: state => {
      state.error = 'failed to update the card'
    }
  })
}
