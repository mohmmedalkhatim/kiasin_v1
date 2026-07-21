import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from '../../../store'
import { areas_storage } from '../..'

export let delete_card = createAsyncThunk(
  'area/delete_card',
  (payload: { id: number }, api) => {
    let { id } = payload
    let state = api.getState() as RootState
    let { structure } = state.area.active.area
    let filtered_cards = structure.cards.filter((_, index) => index !== id)
    console.log(structure)
    console.log(filtered_cards)
    let area = structuredClone(state.area.active.area)
    area.structure = { cards: filtered_cards, dense: structure.dense }
    return area
  }
)

export let delete_card_builder = (
  builder: ActionReducerMapBuilder<areas_storage>
) => {
  builder.addAsyncThunk(delete_card, {
    pending: state => {
      state.status = 'loading'
    },
    fulfilled: (state, action) => {
      state.active = {
        edit: false,
        area: action.payload
      }
      state.status = 'idle'
    },
    rejected: state => {
      state.error = 'failed to update the card'
    }
  })
}
