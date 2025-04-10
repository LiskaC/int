import { createSlice } from '@reduxjs/toolkit'

/**
 * The form of the whole application state
 */
type GlobalState = {}

/**
 * The starting state for the application
 */
const initialState: GlobalState = {}

/**
 * A redux slice for the whole application
 */
export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {},
})

export const {} = globalSlice.actions

export default globalSlice.reducer
