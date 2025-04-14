import { screen } from '@testing-library/react'
import { renderWithProviders } from '../../../../../__specs__/renderWithProviders'
import { setupStore } from '../../../../store'
import { initialiseRootState } from '../../../../../__specs__/mocks/rootState'
import { TrackResult } from '../../components/TrackResult'

const hash = '8d3238e92h8weuw'

describe(TrackResult, () => {
  it('should render null when hash data is not available', () => {
    const store = setupStore(initialiseRootState())

    const { container } = renderWithProviders(<TrackResult />, { store })

    expect(container).toBeEmptyDOMElement()
  })

  it('should render the hash value when hashing is completed successfully', () => {
    const mockStore = initialiseRootState()
    mockStore.hash.track.data = {
      status: 'completed',
      processingTime: 2500,
      hash,
      error: null,
    }
    const store = setupStore(mockStore)

    renderWithProviders(<TrackResult />, { store })

    expect(screen.getByText('Hash')).toBeInTheDocument()
    expect(screen.getByText(hash)).toBeInTheDocument()
    expect(screen.queryByText('Error')).not.toBeInTheDocument()
  })

  it('should render only an error when the hashing fails', () => {
    const mockStore = initialiseRootState()
    mockStore.hash.track.data = {
      status: 'failed',
      processingTime: 2500,
      hash: null,
      error: 'Could not hash for reason',
    }
    const store = setupStore(mockStore)

    renderWithProviders(<TrackResult />, { store })

    expect(screen.getByText('Error')).toBeInTheDocument()
    expect(screen.getByText(/Could not hash for reason/i)).toBeInTheDocument()
    expect(screen.queryByText('Hash')).not.toBeInTheDocument()
  })
})
