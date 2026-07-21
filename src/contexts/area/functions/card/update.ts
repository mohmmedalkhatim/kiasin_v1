import {
  ActionReducerMapBuilder,
  createAsyncThunk
} from '@reduxjs/toolkit'
import { RootState } from '../../../store'
import { Area, areas_storage, Card } from '../..'
import { Channel, invoke } from '@tauri-apps/api/core';

export let update_card = createAsyncThunk(
  'area/update_card',
  (payload: { index: number; card: Card }, api) => {
    let list:Card[] = [];
    try {
      let { index, card } = payload
      let state = api.getState() as RootState
      let cards = structuredClone(state.area.active.area.structure.cards)
      cards[index] = card
      update_area({...state.area.active.area,structure:{...state.area.active.area.structure,cards:cards}}).then(res=>{console.log(res)}).catch(err=>console.log(err))
      return cards
    } catch (err) {
      console.error(err)
    }
    return list as Card[]
  }
)
let update_area = async (area:Area)=>{
 let res = {} as Area
  try {
    let channel = new Channel<Area[]>(state => {
      res = state[0]
    })
    await invoke('areas_control', {
      payload: { command: 'update', item: area },
      channel
    })
  } catch (err) {
    console.error("there is a problem with database")
  }
  return res
}
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

