import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CreateProcessPayload, CreateProcessResponse } from './types'
import api from './api'

export type HashState = {
  payload: string
  id: string
  loading: boolean
  error: string | null
}

const initialState: HashState = {
  payload: '',
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
      .addCase(createProcess.pending, (state, action) => {
        state.loading = true
        state.error = null
        state.id = ''
        state.payload = action.meta.arg.payload
      })
      .addCase(createProcess.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.id = action.payload.id
      })
      .addCase(createProcess.rejected, (state, action) => {
        state.loading = false
        state.error =
          action.error.message ||
          `Failed to create process for hashing string: ${action.meta.arg.payload}`
      })
  },
})

export const createProcess = createAsyncThunk<
  CreateProcessResponse,
  CreateProcessPayload
>('hash/createProcess', async (args) => {
  return await api.createProcess(args)
})

export default hashSlice.reducer
