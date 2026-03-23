import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EmailForm from '../EmailForm'

const renderForm = (props = {}) => render(<EmailForm {...props} />)

describe('EmailForm', () => {
  describe('initial state', () => {
    it('renders email label and input', () => {
      renderForm()
      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument()
    })

    it('renders the submit button with correct label', () => {
      renderForm()
      expect(screen.getByRole('button', { name: /request early access/i })).toBeInTheDocument()
    })

    it('email input is empty by default', () => {
      renderForm()
      expect(screen.getByLabelText(/email address/i)).toHaveValue('')
    })

    it('submit button is disabled until the email is valid', () => {
      renderForm()
      expect(screen.getByRole('button', { name: /request early access/i })).toBeDisabled()
    })
  })

  describe('email validation', () => {
    it('shows guidance when the email format is invalid', async () => {
      const user = userEvent.setup()
      renderForm()
      await user.type(screen.getByLabelText(/email address/i), 'notanemail')
      expect(await screen.findByRole('alert')).toHaveTextContent(
        /enter a valid email address to continue/i
      )
      expect(screen.getByRole('button', { name: /request early access/i })).toBeDisabled()
    })

    it('marks input as aria-invalid when there is a format error', async () => {
      const user = userEvent.setup()
      renderForm()
      await user.type(screen.getByLabelText(/email address/i), 'bad-email')
      await screen.findByRole('alert')
      expect(screen.getByLabelText(/email address/i)).toHaveAttribute('aria-invalid', 'true')
    })

    it('clears error message when user starts typing after an error', async () => {
      const user = userEvent.setup()
      renderForm()
      await user.type(screen.getByLabelText(/email address/i), 'bad-email')
      await screen.findByRole('alert')
      await user.clear(screen.getByLabelText(/email address/i))
      await user.type(screen.getByLabelText(/email address/i), 'person@example.com')
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it('accepts a valid email without validation error', async () => {
      const user = userEvent.setup()
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      })
      renderForm()
      await user.type(screen.getByLabelText(/email address/i), 'user@example.com')
      expect(screen.getByRole('button', { name: /request early access/i })).not.toBeDisabled()
      await user.click(screen.getByRole('button', { name: /request early access/i }))
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      delete global.fetch
    })
  })

  describe('submission states', () => {
    it('shows submitting state while fetch is in progress', async () => {
      const user = userEvent.setup()
      global.fetch = jest.fn(() => new Promise(() => {}))
      renderForm()
      await user.type(screen.getByLabelText(/email address/i), 'user@example.com')
      await user.click(screen.getByRole('button', { name: /request early access/i }))
      expect(await screen.findByText(/submitting/i)).toBeInTheDocument()
      expect(screen.getByRole('button')).toBeDisabled()
      delete global.fetch
    })

    it('input is disabled while submitting', async () => {
      const user = userEvent.setup()
      global.fetch = jest.fn(() => new Promise(() => {}))
      renderForm()
      await user.type(screen.getByLabelText(/email address/i), 'user@example.com')
      await user.click(screen.getByRole('button', { name: /request early access/i }))
      await screen.findByText(/submitting/i)
      expect(screen.getByLabelText(/email address/i)).toBeDisabled()
      delete global.fetch
    })

    it('shows success message after successful submission', async () => {
      const user = userEvent.setup()
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      })
      renderForm()
      await user.type(screen.getByLabelText(/email address/i), 'user@example.com')
      await user.click(screen.getByRole('button', { name: /request early access/i }))
      expect(await screen.findByText(/you are on the list/i)).toBeInTheDocument()
      expect(screen.getByText(/we will reach out for onboarding/i)).toBeInTheDocument()
      delete global.fetch
    })

    it('clears email input after successful submission', async () => {
      const user = userEvent.setup()
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ success: true }),
      })
      renderForm()
      await user.type(screen.getByLabelText(/email address/i), 'user@example.com')
      await user.click(screen.getByRole('button', { name: /request early access/i }))
      await screen.findByText(/you are on the list/i)
      expect(screen.queryByLabelText(/email address/i)).not.toBeInTheDocument()
      delete global.fetch
    })

    it('shows error message when server returns success: false', async () => {
      const user = userEvent.setup()
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ success: false, message: 'Email already registered.' }),
      })
      renderForm()
      await user.type(screen.getByLabelText(/email address/i), 'user@example.com')
      await user.click(screen.getByRole('button', { name: /request early access/i }))
      expect(await screen.findByRole('alert')).toHaveTextContent(/email already registered/i)
      delete global.fetch
    })

    it('shows fallback error message when server returns no message', async () => {
      const user = userEvent.setup()
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ success: false }),
      })
      renderForm()
      await user.type(screen.getByLabelText(/email address/i), 'user@example.com')
      await user.click(screen.getByRole('button', { name: /request early access/i }))
      expect(await screen.findByRole('alert')).toHaveTextContent(
        /we could not submit your request. please try again/i
      )
      delete global.fetch
    })

    it('shows error message when fetch throws (network error)', async () => {
      const user = userEvent.setup()
      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'))
      renderForm()
      await user.type(screen.getByLabelText(/email address/i), 'user@example.com')
      await user.click(screen.getByRole('button', { name: /request early access/i }))
      expect(await screen.findByRole('alert')).toHaveTextContent(
        /we could not submit your request. please try again/i
      )
      delete global.fetch
    })

    it('falls back to the legacy api endpoint when the root endpoint is missing', async () => {
      const user = userEvent.setup()
      global.fetch = jest
        .fn()
        .mockResolvedValueOnce({ status: 404, ok: false, json: async () => ({ success: false }) })
        .mockResolvedValueOnce({ ok: true, json: async () => ({ success: true }) })
      renderForm()
      await user.type(screen.getByLabelText(/email address/i), 'user@example.com')
      await user.click(screen.getByRole('button', { name: /request early access/i }))

      await waitFor(() => {
        expect(global.fetch).toHaveBeenNthCalledWith(
          1,
          '/early-access.php',
          expect.objectContaining({ method: 'POST' })
        )
        expect(global.fetch).toHaveBeenNthCalledWith(
          2,
          '/email/early-access.php',
          expect.objectContaining({ method: 'POST' })
        )
      })

      delete global.fetch
    })
  })

  describe('accessibility', () => {
    it('email input has type="email"', () => {
      renderForm()
      expect(screen.getByLabelText(/email address/i)).toHaveAttribute('type', 'email')
    })

    it('error message has role="alert"', async () => {
      const user = userEvent.setup()
      renderForm()
      await user.type(screen.getByLabelText(/email address/i), 'invalid')
      expect(await screen.findByRole('alert')).toBeInTheDocument()
    })

    it('input is linked to error via aria-describedby when error is shown', async () => {
      const user = userEvent.setup()
      renderForm()
      await user.type(screen.getByLabelText(/email address/i), 'invalid')
      await screen.findByRole('alert')
      const input = screen.getByLabelText(/email address/i)
      expect(input).toHaveAttribute('aria-describedby', 'email-feedback')
    })
  })
})
