import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AsyncThunkOptions } from '../../store'
import {
  CreateProcessPayload,
  CreateProcessResponse,
  TrackProcessResponse,
} from './types'
import api from './api'

type AsyncState<T> = {
  data: T
  loading: boolean
  error: string | null
}

export type HashState = {
  create: AsyncState<{
    payload: string
    id: string
  }>
  track: AsyncState<TrackProcessResponse | null>
}

const initialState: HashState = {
  create: {
    data: {
      payload: '',
      id: '',
    },
    loading: false,
    error: null,
  },
  track: {
    data: null,
    loading: false,
    error: null,
  },
}

const hashSlice = createSlice({
  name: 'hash',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProcess.pending, (state, action) => {
        state.create.loading = true
        state.create.error = null
        state.create.data.id = ''
        state.create.data.payload = action.meta.arg.payload
        // reset track too
        state.track = { data: null, loading: false, error: null }
      })
      .addCase(createProcess.fulfilled, (state, action) => {
        state.create.loading = false
        state.create.error = null
        state.create.data.id = action.payload.id
      })
      .addCase(createProcess.rejected, (state, action) => {
        state.create.loading = false
        state.create.error =
          action.error.message ||
          `Failed to create process for hashing string: ${action.meta.arg.payload}`
      })
      .addCase(trackProcess.pending, (state) => {
        state.track.loading = true
        state.track.error = null
      })
      .addCase(trackProcess.fulfilled, (state, action) => {
        state.track.loading = false
        state.track.error = null
        state.track.data = action.payload
      })
      .addCase(trackProcess.rejected, (state, action) => {
        state.track.loading = false
        state.track.error =
          action.error.message ||
          `'Failed to track status for process with id: ${state.create.data.id}`
      })
  },
})

export const createProcess = createAsyncThunk<
  CreateProcessResponse,
  CreateProcessPayload
>('hash/createProcess', async (args) => {
  return api.createProcess(args)
})

const trackProcess = createAsyncThunk<
  TrackProcessResponse,
  void,
  AsyncThunkOptions
>('hash/trackProcess', async (_, thunkApi) => {
  const id = thunkApi.getState().hash.create.data.id

  if (!id) {
    throw new Error('Cannot track process: missing process ID')
  }

  return api.trackProcess({ id })
})

export const pollProcess = createAsyncThunk<void, void, AsyncThunkOptions>(
  'hash/pollProcess',
  async (_, thunkApi) => {
    let status = 'pending'

    while (status === 'pending') {
      try {
        const res = await thunkApi.dispatch(trackProcess()).unwrap()
        status = res.status

        if (status === 'pending') {
          await new Promise((resolve) => setTimeout(resolve, 2000))
        }
      } catch (err) {
        console.error('Polling failed:', err)
        break
      }
    }
  }
)

export default hashSlice.reducer
