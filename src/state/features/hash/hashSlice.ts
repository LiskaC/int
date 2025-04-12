import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { HashResponse } from './types'
import api from './api'

type HashState = {
  input: string
  id: string
  loading: boolean
  error: string | null
}

const initialState: HashState = {
  input: '',
  id: '',
  loading: false,
  error: null,
}

const hashSlice = createSlice({
  name: 'hash',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(hashValue.pending, (state, action) => {
        state.loading = true
        state.error = null
        state.id = ''
        state.input = action.meta.arg
      })
      .addCase(hashValue.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.id = action.payload.id
      })
      .addCase(hashValue.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.error.message || `Failed to hash ${action.meta.arg}`
      })
  },
})

export const hashValue = createAsyncThunk<HashResponse, string>(
  'hash/hashValue',
  async (arg) => {
    // TODO - transform stuff here
    return await api.hash(arg)
  }
)

export default hashSlice.reducer
