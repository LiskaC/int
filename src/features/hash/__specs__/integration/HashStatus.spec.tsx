import { screen } from '@testing-library/react'
import { HashStatus } from '../../components/HashStatus'
import { renderWithProviders } from '../../../../../__specs__/renderWithProviders'
import { initialiseRootState } from '../../../../../__specs__/mocks/rootState'
import { setupStore } from '../../../../store'

describe(HashStatus, () => {
  it('should render null when hash data is not available', () => {
    const store = setupStore(initialiseRootState())

    const { container } = renderWithProviders(<HashStatus />, { store })

    expect(container).toBeEmptyDOMElement()
  })

  it('should render the correct status and processing time when data is available', () => {
    const mockStore = initialiseRootState()
    mockStore.hash.track.data = {
      status: 'pending',
      processingTime: 2500,
      hash: null,
      error: null,
    }
    const store = setupStore(mockStore)

    renderWithProviders(<HashStatus />, { store })

    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('pending since 2.5 seconds')).toBeInTheDocument()
  })
})
