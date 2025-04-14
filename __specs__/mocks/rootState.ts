import { RootState } from '../../src/store'

export function initialiseRootState(): RootState {
  return {
    hash: {
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
      polling: false,
    },
  }
}
