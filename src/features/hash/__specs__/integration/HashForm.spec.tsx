import '@testing-library/jest-dom'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '../../../../../__specs__/renderWithProviders'
import {
  createProcessResponse,
  serverConfig,
} from '../../../../../__specs__/mocks/server'
import { setupStore } from '../../../../store'
import { HashForm } from '../../components/HashForm'

const validInput = 'Abc123456789'
const invalidInput = ' *-/'

describe(HashForm, () => {
  it('renders the initial UI correctly', () => {
    renderWithProviders(<HashForm />)

    expect(screen.getByRole('region')).toBeInTheDocument()
    expect(screen.getByText('Get your hash')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('your payload')).toHaveValue('')
    expect(
      screen.getByRole('button', { name: /create hash/i })
    ).toBeInTheDocument()
  })

  it('updates form values when input is changed', () => {
    renderWithProviders(<HashForm />)

    const input = screen.getByPlaceholderText('your payload')
    fireEvent.change(input, { target: { value: 'test-payload' } })
    expect(input).toHaveValue('test-payload')
  })

  it('triggers a creation process on form submit and shows loading state', async () => {
    const store = setupStore()
    renderWithProviders(<HashForm />, { store })

    const input = screen.getByPlaceholderText('your payload')
    fireEvent.change(input, { target: { value: validInput } })

    const button = screen.getByRole('button', { name: /create hash/i })
    fireEvent.click(button)
    expect(store.getState().hash.create.data.payload).toBe(validInput)
    await waitFor(() => {
      expect(screen.getByText(/creating.../i)).toBeInTheDocument()
    })
  })

  it('shows error message when input is invalid', () => {
    renderWithProviders(<HashForm />)
    const input = screen.getByPlaceholderText('your payload')
    fireEvent.change(input, { target: { value: invalidInput } })
    const button = screen.getByRole('button', { name: /create hash/i })
    fireEvent.click(button)
    expect(screen.getByTestId(/payload-input-error/)).toBeInTheDocument()
  })

  it('does not allow form submission with empty input', async () => {
    const store = setupStore()
    renderWithProviders(<HashForm />, { store })

    const button = screen.getByRole('button', { name: /create hash/i })
    fireEvent.click(button)

    expect(store.getState().hash.create.data.payload).toBe('')
    expect(button).toHaveTextContent(/create hash/i)
  })

  it('disables button during submission', async () => {
    const store = setupStore()
    renderWithProviders(<HashForm />, { store })

    const input = screen.getByPlaceholderText('your payload')
    const button = screen.getByRole('button', { name: /create hash/i })

    fireEvent.change(input, { target: { value: validInput } })
    fireEvent.click(button)

    fireEvent.click(button)

    await waitFor(() => {
      expect(button).toBeDisabled()
    })

    await screen.findByRole('button', { name: /create hash/i })
  })

  it('submits the form and shows loading state and resets on success', async () => {
    const store = setupStore()
    renderWithProviders(<HashForm />, { store })

    const input = screen.getByPlaceholderText('your payload')
    fireEvent.change(input, { target: { value: validInput } })

    const button = screen.getByRole('button', { name: /create hash/i })
    fireEvent.click(button)

    // check that the loading state is set
    expect(button).toHaveTextContent(/creating/i)

    // check that the UI reset after the API call
    await screen.findByRole('button', { name: /create hash/i })

    expect(store.getState().hash.create.data.id).toBe(createProcessResponse.id)
  })

  it('resets on failure', async () => {
    serverConfig.shouldFail = true
    const store = setupStore()
    renderWithProviders(<HashForm />, { store })

    const input = screen.getByPlaceholderText('your payload')
    fireEvent.change(input, { target: { value: 4 } })

    const button = screen.getByRole('button', { name: /create hash/i })
    fireEvent.click(button)

    // check that the loading state is set
    expect(button).toHaveTextContent(/creating/i)

    // check that the UI reset after the API call
    await screen.findByRole('button', { name: /create hash/i })

    // check that the call failed
    expect(store.getState().hash.create.data.id).toBe('')
    expect(store.getState().hash.create.error).toMatch(/internal server error/i)
  })
})
