import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { ProcessCreateStatus } from '../../src/state/features/hash/ProcessCreateStatus'
import { renderWithProviders } from '../../src/utils/test-utils'
import { HashState } from '../../src/state/features/hash/hashSlice'
import { setupStore } from '../../src/state/store'

function createInitialHashState(): HashState {
  return {
    payload: '',
    id: '',
    loading: false,
    error: null,
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

  it('renders error view when there is an error', () => {
    const errorState = {
      ...createInitialHashState(),
      error: 'An error occurred',
      payload: 'Some payload',
    }
    const store = setupStore({ hash: errorState })

    renderWithProviders(<ProcessCreateStatus />, { store })

    expect(screen.getByText('An error occurred')).toBeInTheDocument()
    expect(screen.getByAltText('error-icon')).toBeInTheDocument()
  })

  it('renders success view when process is successful', () => {
    const successState = {
      ...createInitialHashState(),
      id: '12345',
      payload: 'Some payload',
    }
    const mockStore = setupStore({ hash: successState })

    renderWithProviders(<ProcessCreateStatus />, { store: mockStore })

    expect(
      screen.getByText('Successfully started process to hash your payload')
    ).toBeInTheDocument()
    expect(screen.getByAltText('success-icon')).toBeInTheDocument()
  })
})
