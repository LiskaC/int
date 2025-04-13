import '@testing-library/jest-dom'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '../../src/utils/test-utils'
import { createProcessResponse, server, serverConfig } from '../mocks/server'
import { PayloadInput } from '../../src/state/features/hash/PayloadInput'
import { setupStore } from '../../src/state/store'

describe('PayloadInput', () => {
  it('renders the initial UI correctly', () => {
    renderWithProviders(<PayloadInput />)

    expect(screen.getByRole('region')).toBeInTheDocument()
    expect(screen.getByText('Get your hash')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('your payload')).toHaveValue('')
    expect(
      screen.getByRole('button', { name: /create hash/i })
    ).toBeInTheDocument()
  })

  it('updates form values when input is changed', () => {
    renderWithProviders(<PayloadInput />)

    const input = screen.getByPlaceholderText('your payload')
    fireEvent.change(input, { target: { value: 'test-payload' } })
    expect(input).toHaveValue('test-payload')
  })

  it('triggers a creation process on form submit and shows loading state', async () => {
    const store = setupStore()
    renderWithProviders(<PayloadInput />, { store })

    const input = screen.getByPlaceholderText('your payload')
    fireEvent.change(input, { target: { value: 'test-input' } })

    const button = screen.getByRole('button', { name: /create hash/i })
    fireEvent.click(button)

    expect(store.getState().hash.payload).toBe('test-input')
    await waitFor(() => {
      expect(screen.getByText(/creating.../i)).toBeInTheDocument()
    })
  })

  it('does not allow form submission with empty input', async () => {
    const store = setupStore()
    renderWithProviders(<PayloadInput />, { store })

    const button = screen.getByRole('button', { name: /create hash/i })
    fireEvent.click(button)

    expect(store.getState().hash.payload).toBe('')
    expect(button).toHaveTextContent(/create hash/i)
  })

  it('disables button during submission', async () => {
    const store = setupStore()
    renderWithProviders(<PayloadInput />, { store })

    const input = screen.getByPlaceholderText('your payload')
    const button = screen.getByRole('button', { name: /create hash/i })

    fireEvent.change(input, { target: { value: 'waiting...' } })
    fireEvent.click(button)

    expect(button).toBeDisabled()

    await screen.findByRole('button', { name: /create hash/i })
  })

  describe('with mocked server', () => {
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())

    it('submits the form and shows loading state and resets on success', async () => {
      const store = setupStore()
      renderWithProviders(<PayloadInput />, { store })

      const input = screen.getByPlaceholderText('your payload')
      fireEvent.change(input, { target: { value: 'some string' } })

      const button = screen.getByRole('button', { name: /create hash/i })
      fireEvent.click(button)

      // check that the loading state is set
      expect(button).toHaveTextContent(/creating/i)

      // check that the UI reset after the API call
      await screen.findByRole('button', { name: /create hash/i })

      expect(store.getState().hash.id).toBe(createProcessResponse.id)
    })

    it('resets on failure', async () => {
      serverConfig.shouldFail = true
      const store = setupStore()
      renderWithProviders(<PayloadInput />, { store })

      const input = screen.getByPlaceholderText('your payload')
      fireEvent.change(input, { target: { value: 4 } })

      const button = screen.getByRole('button', { name: /create hash/i })
      fireEvent.click(button)

      // check that the loading state is set
      expect(button).toHaveTextContent(/creating/i)

      // check that the UI reset after the API call
      await screen.findByRole('button', { name: /create hash/i })

      // check that the call failed
      expect(store.getState().hash.id).toBe('')
      expect(store.getState().hash.error).toMatch(/internal server error/i)
    })
  })
})
