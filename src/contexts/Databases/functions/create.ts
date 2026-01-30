import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit'
import { DB } from '../../../main'
import { databases_storage } from '..'

export let create_table = createAsyncThunk(
  'database/create',
  async (table: { name: string; values: string[][] }) => {
    let values = ''
    table.values.map(items => {
      values += items[0] + ' ' + items[1] + ','
    })
   return await DB.execute(`CREATE TABLE ${table.name}(${values}) `)
  }
)

export let create_table_thunk_builder = (
  builder: ActionReducerMapBuilder<databases_storage>
) => {
  builder.addAsyncThunk(create_table, {
    pending: state => {},
    fulfilled: (state, action) => {
      console.log("creating")
      console.log(action.payload)
    },
    rejected: state => {}
  })
}
