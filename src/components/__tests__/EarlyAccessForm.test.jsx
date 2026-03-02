import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EarlyAccessForm from '../EarlyAccessForm'

// Helper to render with a simple formRef
const renderForm = (props = {}) => render(<EarlyAccessForm {...props} />)

describe('EarlyAccessForm', () => {
  describe('initial state', () => {
    it('renders email label and input', () => {
      renderForm()
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    })

    it('renders the submit button with correct label', () => {
      renderForm()
      expect(screen.getByRole('button', { name: /join early access/i })).toBeInTheDocument()
    })

    it('email input is empty by default', () => {
      renderForm()
      expect(screen.getByLabelText(/email address/i)).toHaveValue('')
    })

    it('submit button is enabled on idle', () => {
      renderForm()
      expect(screen.getByRole('button', { name: /join early access/i })).not.toBeDisabled()
    })
  })

  describe('email validation', () => {
    it('shows error when submitted with empty email', async () => {
      renderForm()
      fireEvent.click(screen.getByRole('button', { name: /join early access/i }))
      expect(await screen.findByRole('alert')).toHaveTextContent(
        /please enter your email address/i
      )
    })

    it('shows error when submitted with invalid email format', async () => {
      const user = userEvent.setup()
      renderForm()
      await user.type(screen.getByLabelText(/email address/i), 'notanemail')
      fireEvent.click(screen.getByRole('button', { name: /join early access/i }))
      expect(await screen.findByRole('alert')).toHaveTextContent(
        /please enter a valid email address/i
      )
    })

    it('marks input as aria-invalid when there is an error', async () => {
      renderForm()
      fireEvent.click(screen.getByRole('button', { name: /join early access/i }))
      await screen.findByRole('alert')
      expect(screen.getByLabelText(/email address/i)).toHaveAttribute('aria-invalid', 'true')
    })

    it('clears error message when user starts typing after an error', async () => {
      const user = userEvent.setup()
      renderForm()
      // Trigger error
      fireEvent.click(screen.getByRole('button', { name: /join early access/i }))
      await screen.findByRole('alert')
      // Start typing — error should clear
      await user.type(screen.getByLabelText(/email address/i), 'a')
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it('accepts a valid email without validation error', async () => {
      const user = userEvent.setup()
      global.fetch = jest.fn().mockResolvedValue({
        json: async () => ({ success: true }),
      })
      renderForm()
      await user.type(screen.getByLabelText(/email address/i), 'user@example.com')
      fireEvent.click(screen.getByRole('button', { name: /join early access/i }))
      // No validation error should appear
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      delete global.fetch
    })
  })

  describe('submission states', () => {
    it('shows submitting state while fetch is in progress', async () => {
      const user = userEvent.setup()
      // Never resolve — keep in submitting state
      global.fetch = jest.fn(() => new Promise(() => {}))
      renderForm()
      await user.type(screen.getByLabelText(/email address/i), 'user@example.com')
      fireEvent.click(screen.getByRole('button', { name: /join early access/i }))
      expect(await screen.findByText(/submitting/i)).toBeInTheDocument()
      expect(screen.getByRole('button')).toBeDisabled()
      delete global.fetch
    })

    it('input is disabled while submitting', async () => {
      const user = userEvent.setup()
      global.fetch = jest.fn(() => new Promise(() => {}))
      renderForm()
      await user.type(screen.getByLabelText(/email address/i), 'user@example.com')
      fireEvent.click(screen.getByRole('button', { name: /join early access/i }))
      await screen.findByText(/submitting/i)
      expect(screen.getByLabelText(/email address/i)).toBeDisabled()
      delete global.fetch
    })

    it('shows success message after successful submission', async () => {
      const user = userEvent.setup()
      global.fetch = jest.fn().mockResolvedValue({
        json: async () => ({ success: true }),
      })
      renderForm()
      await user.type(screen.getByLabelText(/email address/i), 'user@example.com')
      fireEvent.click(screen.getByRole('button', { name: /join early access/i }))
      expect(await screen.findByText(/you're on the priority list/i)).toBeInTheDocument()
      expect(screen.getByText(/we'll be in touch soon/i)).toBeInTheDocument()
      delete global.fetch
    })

    it('clears email input after successful submission', async () => {
      const user = userEvent.setup()
      global.fetch = jest.fn().mockResolvedValue({
        json: async () => ({ success: true }),
      })
      renderForm()
      await user.type(screen.getByLabelText(/email address/i), 'user@example.com')
      fireEvent.click(screen.getByRole('button', { name: /join early access/i }))
      await screen.findByText(/you're on the priority list/i)
      // Form is gone — email input should not be visible
      expect(screen.queryByLabelText(/email address/i)).not.toBeInTheDocument()
      delete global.fetch
    })

    it('shows error message when server returns success: false', async () => {
      const user = userEvent.setup()
      global.fetch = jest.fn().mockResolvedValue({
        json: async () => ({ success: false, message: 'Email already registered.' }),
      })
      renderForm()
      await user.type(screen.getByLabelText(/email address/i), 'user@example.com')
      fireEvent.click(screen.getByRole('button', { name: /join early access/i }))
      expect(await screen.findByRole('alert')).toHaveTextContent(/email already registered/i)
      delete global.fetch
    })

    it('shows fallback error message when server returns no message', async () => {
      const user = userEvent.setup()
      global.fetch = jest.fn().mockResolvedValue({
        json: async () => ({ success: false }),
      })
      renderForm()
      await user.type(screen.getByLabelText(/email address/i), 'user@example.com')
      fireEvent.click(screen.getByRole('button', { name: /join early access/i }))
      expect(await screen.findByRole('alert')).toHaveTextContent(
        /submission failed. please try again/i
      )
      delete global.fetch
    })

    it('shows error message when fetch throws (network error)', async () => {
      const user = userEvent.setup()
      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'))
      renderForm()
      await user.type(screen.getByLabelText(/email address/i), 'user@example.com')
      fireEvent.click(screen.getByRole('button', { name: /join early access/i }))
      expect(await screen.findByRole('alert')).toHaveTextContent(
        /submission failed. please try again/i
      )
      delete global.fetch
    })
  })

  describe('accessibility', () => {
    it('email input has type="email"', () => {
      renderForm()
      expect(screen.getByLabelText(/email address/i)).toHaveAttribute('type', 'email')
    })

    it('error message has role="alert"', async () => {
      renderForm()
      fireEvent.click(screen.getByRole('button', { name: /join early access/i }))
      expect(await screen.findByRole('alert')).toBeInTheDocument()
    })

    it('input is linked to error via aria-describedby when error is shown', async () => {
      renderForm()
      fireEvent.click(screen.getByRole('button', { name: /join early access/i }))
      await screen.findByRole('alert')
      const input = screen.getByLabelText(/email address/i)
      expect(input).toHaveAttribute('aria-describedby', 'email-error')
    })
  })
})
