import { createAsyncThunk } from '@reduxjs/toolkit'
import { DB } from '../../../main'

export let retrieve_table = createAsyncThunk('database/retrieve', async () => {})

export let database_info = createAsyncThunk('database/info', async () => {
    let info = await DB.select("SELECT * FROM sqlite_master WHERE type='table'")
    console.log(info)
})
