import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { ProcessCreateStatus } from '../../src/state/features/hash/create/ProcessCreateStatus'
import { renderWithProviders } from '../../src/utils/test-utils'
import { HashState } from '../../src/state/features/hash/slice'
import { setupStore } from '../../src/state/store'
import { Hash } from 'react-router-dom'

function createInitialHashState(): HashState {
  return {
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
}

describe('ProcessCreateStatus', () => {
  it('renders nothing when hash payload is missing or loading', () => {
    const store = setupStore({ hash: createInitialHashState() })
    renderWithProviders(<ProcessCreateStatus />, { store })

    expect(
      screen.queryByTestId('process-create-status')
    ).not.toBeInTheDocument()
  })

  it('renders error view when there is a create error', () => {
    const errorState: HashState = {
      ...createInitialHashState(),
    }
    errorState.create.error = 'An error occurred'
    errorState.create.data.payload = 'Some payload'
    const store = setupStore({ hash: errorState })

    renderWithProviders(<ProcessCreateStatus />, { store })

    expect(screen.getByText('An error occurred')).toBeInTheDocument()
    expect(screen.getByAltText('error-icon')).toBeInTheDocument()
  })

  it('renders success view when create process is successful', () => {
    const successState: HashState = {
      ...createInitialHashState(),
    }
    successState.create.data.payload = 'Some payload'
    successState.create.data.id = '12345'
    const mockStore = setupStore({ hash: successState })

    renderWithProviders(<ProcessCreateStatus />, { store: mockStore })

    expect(
      screen.getByText('Successfully started process to hash your payload')
    ).toBeInTheDocument()
    expect(screen.getByAltText('success-icon')).toBeInTheDocument()
  })
})
