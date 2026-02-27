'use client'

import { useState, useRef, useEffect } from 'react'

/**
 * EarlyAccessForm Component
 * 
 * Enterprise-grade early access form with email validation,
 * loading states, and structured error handling.
 */
export default function EarlyAccessForm({ formRef }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('')
  const inputRef = useRef(null)

  // Focus input when form becomes visible
  useEffect(() => {
    if (formRef?.current) {
      inputRef.current?.focus()
    }
  }, [formRef])

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} - Whether email is valid
   */
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  /**
   * Handle form submission
   * @param {Event} e - Form submit event
   */
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate email
    if (!email.trim()) {
      setStatus('error')
      setErrorMessage('Please enter your email address.')
      return
    }

    if (!isValidEmail(email)) {
      setStatus('error')
      setErrorMessage('Please enter a valid email address.')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/early-access.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() }),
      })

      const data = await response.json()

      if (data.success) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
        setErrorMessage(data.message || 'Submission failed. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setErrorMessage('Submission failed. Please try again.')
    }
  }

  return (
    <section 
      ref={formRef}
      className="py-16 px-4 sm:px-6 lg:px-8"
      aria-label="Early access signup"
    >
      <div className="max-w-md mx-auto">
        <div className="glass-card p-8">
          {status === 'success' ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg 
                  className="w-6 h-6 text-accent-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>
              <p className="text-lg font-semibold text-gray-900">
                You're on the priority list.
              </p>
              <p className="text-gray-600 mt-2">
                We'll be in touch soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-6">
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email address
                </label>
                <input
                  ref={inputRef}
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status === 'error') {
                      setStatus('idle')
                      setErrorMessage('')
                    }
                  }}
                  placeholder="you@company.com"
                  className="input-field"
                  disabled={status === 'submitting'}
                  aria-describedby={errorMessage ? 'email-error' : undefined}
                  aria-invalid={status === 'error'}
                  autoComplete="email"
                />
                {status === 'error' && errorMessage && (
                  <p 
                    id="email-error" 
                    className="mt-2 text-sm text-red-600" 
                    role="alert"
                  >
                    {errorMessage}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary w-full"
              >
                {status === 'submitting' ? (
                  <span className="flex items-center justify-center">
                    <svg 
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" 
                      fill="none" 
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                      />
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Join Early Access'
                )}
              </button>

              <p className="mt-4 text-center text-sm text-gray-500">
                Launching soon. Limited onboarding for early communities.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
