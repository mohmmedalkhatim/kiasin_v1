import { createSlice } from "@reduxjs/toolkit";

export interface databases_storage {

}
let init:databases_storage = {}

let databases = createSlice({
    name:"databases",
    initialState:init,
    reducers:{}
})