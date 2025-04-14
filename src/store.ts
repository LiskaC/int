import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import hashReducer from './features/hash/slice'

const rootReducer = combineReducers({
  hash: hashReducer,
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

/**
 * Type to use in createAsyncThunk<A, B, AsyncThunkOptions> to get correctly
 * typed access to the state and dispatch from thunkAPI.
 */
export type AsyncThunkOptions = { state: RootState; dispatch: AppDispatch }
