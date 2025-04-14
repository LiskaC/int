import '@testing-library/jest-dom'
import { screen } from '@testing-library/react'
import { setupStore } from '../../../../store'
import { renderWithProviders } from '../../../../../__specs__/renderWithProviders'
import { CreateResult } from '../../components/CreateResult'
import { initialiseRootState } from '../../../../../__specs__/mocks/rootState'

describe(CreateResult, () => {
  it('renders nothing when hash payload is missing or loading', () => {
    const store = setupStore(initialiseRootState())
    renderWithProviders(<CreateResult />, { store })

    expect(
      screen.queryByTestId('process-create-status')
    ).not.toBeInTheDocument()
  })

  it('renders success view when create process is successful', () => {
    const successState = {
      ...initialiseRootState(),
    }
    successState.hash.create.data.payload = 'Some payload'
    successState.hash.create.data.id = '12345'
    const mockStore = setupStore(successState)

    renderWithProviders(<CreateResult />, { store: mockStore })

    expect(
      screen.getByText('Successfully started process to hash your payload')
    ).toBeInTheDocument()
    expect(screen.getByAltText('success-icon')).toBeInTheDocument()
  })

  it('renders error view when there is a create error', () => {
    const errorState = initialiseRootState()
    errorState.hash.create.error = 'An error occurred'
    errorState.hash.create.data.payload = 'Some payload'
    const store = setupStore(errorState)

    renderWithProviders(<CreateResult />, { store })

    expect(screen.getByText('An error occurred')).toBeInTheDocument()
    expect(screen.getByAltText('error-icon')).toBeInTheDocument()
  })
})
