'use client'

import { useId, useState } from 'react'

const ENDPOINTS = ['/early-access.php', '/email/early-access.php']
const FALLBACK_ERROR_MESSAGE = 'We could not submit your request. Please try again.'

function isValidEmailAddress(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

async function submitEarlyAccess(email) {
  for (let index = 0; index < ENDPOINTS.length; index += 1) {
    const endpoint = ENDPOINTS[index]

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.status === 404 && index < ENDPOINTS.length - 1) {
        continue
      }

      const payload = typeof response.json === 'function'
        ? await response.json()
        : null

      if (payload?.success) {
        return { ok: true }
      }

      return {
        ok: false,
        message: payload?.message || FALLBACK_ERROR_MESSAGE,
      }
    } catch {
      if (index < ENDPOINTS.length - 1) {
        continue
      }
    }
  }

  return {
    ok: false,
    message: FALLBACK_ERROR_MESSAGE,
  }
}

export default function EmailForm() {
  const inputId = useId()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  const trimmedEmail = email.trim()
  const hasTypedEmail = trimmedEmail.length > 0
  const emailIsValid = isValidEmailAddress(trimmedEmail)
  const showFormatHint = hasTypedEmail && !emailIsValid && status !== 'submitting'
  const showError = status === 'error' || showFormatHint
  const canSubmit = emailIsValid && status !== 'submitting'

  const handleChange = (event) => {
    setEmail(event.target.value)

    if (status !== 'idle') {
      setStatus('idle')
      setMessage('')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!emailIsValid) {
      setStatus('error')
      setMessage('Enter a valid email address to continue.')
      return
    }

    setStatus('submitting')
    setMessage('')

    const result = await submitEarlyAccess(trimmedEmail)

    if (result.ok) {
      setStatus('success')
      setEmail('')
      return
    }

    setStatus('error')
    setMessage(result.message)
  }

  if (status === 'success') {
    return (
      <div className="surface-panel border-primary-100 bg-white p-6 sm:p-8" role="status" aria-live="polite">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-100 text-accent-700">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="mt-5 text-xl font-semibold text-primary-950">You are on the list</p>
        <p className="mt-2 text-sm leading-6 text-neutral-600">We will reach out for onboarding.</p>
      </div>
    )
  }

  return (
    <form className="surface-panel border-primary-100 bg-white p-6 sm:p-8" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor={inputId} className="block text-sm font-semibold text-primary-900">
          Email address
        </label>
        <input
          id={inputId}
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          className="input-field mt-3"
          placeholder="you@community.com"
          autoComplete="email"
          disabled={status === 'submitting'}
          aria-invalid={showError ? 'true' : 'false'}
          aria-describedby={showError ? 'email-feedback' : undefined}
        />
        {showError ? (
          <p id="email-feedback" className="mt-3 text-sm text-red-600" role="alert">
            {showFormatHint ? 'Enter a valid email address to continue.' : message}
          </p>
        ) : null}
      </div>

      <button type="submit" className="btn-primary-lg mt-5 w-full" disabled={!canSubmit}>
        {status === 'submitting' ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Submitting...
          </span>
        ) : (
          'Request early access'
        )}
      </button>

      <p className="mt-4 text-sm text-neutral-500">
        Limited onboarding for first societies.
      </p>
      <p className="mt-2 text-sm text-neutral-500">
        Early access focused on societies with active billing and approval workflows.
      </p>
      <p className="mt-2 text-sm text-primary-700">
        See how early users run collections and approvals without follow ups.
      </p>
    </form>
  )
}