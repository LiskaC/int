import '@testing-library/jest-dom'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '../../../../../__specs__/renderWithProviders'
import { setupStore } from '../../../../store'
import { initialiseRootState } from '../../../../../__specs__/mocks/rootState'
import { TrackCta } from '../../components/TrackCta'

let initialState: ReturnType<typeof initialiseRootState>
let store: ReturnType<typeof setupStore>

describe(TrackCta, () => {
  beforeEach(() => {
    initialState = initialiseRootState()
    initialState.hash.create.data.id = '123'
  })

  it('renders nothing if no process ID is available', () => {
    initialState.hash.create.data.id = ''
    store = setupStore(initialState)

    const { container } = renderWithProviders(<TrackCta />, { store })
    expect(container).toBeEmptyDOMElement()
  })

  it('renders the CTA initially with enabled and with "fetch" text', () => {
    initialState.hash.track.loading = false
    store = setupStore(initialState)

    renderWithProviders(<TrackCta />, { store })

    expect(screen.getByRole('region')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /fetch/i })).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeEnabled()
  })

  it('disables the CTA when polling', async () => {
    initialState.hash.track.loading = true
    store = setupStore(initialState)

    renderWithProviders(<TrackCta />, { store })

    const button = screen.getByRole('button', { name: /fetch/i })
    fireEvent.click(button)

    await waitFor(() => {
      expect(store.getState().hash.polling).toBeTruthy()
    })
    expect(button).toBeDisabled()
  })

  it('disables the CTA when hashing is completed', () => {
    initialState.hash.track.data = {
      status: 'completed',
      processingTime: 1234,
      hash: '234234sss',
      error: null,
    }
    store = setupStore(initialState)

    renderWithProviders(<TrackCta />, { store })

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('disables the CTA when hashing has failed', () => {
    initialState.hash.track.data = {
      status: 'failed',
      processingTime: 1234,
      hash: null,
      error: 'Failed for reason',
    }
    store = setupStore(initialState)

    renderWithProviders(<TrackCta />, { store })

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  // TODO - I would also test that the api has been called multiple times, to
  // really test the polling process, but need to think about how to set it up
  it('fetches data from the api when clicked', async () => {
    initialState.hash.create.data.id = '123'
    initialState.hash.track.loading = false
    initialState.hash.track.data = {
      status: 'pending',
      processingTime: 1234,
      hash: null,
      error: null,
    }
    store = setupStore(initialState)

    renderWithProviders(<TrackCta />, { store })

    const button = screen.getByRole('button', { name: /fetch/i })
    fireEvent.click(button)

    await waitFor(() => {
      expect(store.getState().hash.track.data?.status).toBe('completed')
    })
  })
})
