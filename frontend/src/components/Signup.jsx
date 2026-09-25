import { useState } from 'react'
import api from './api.js'
import './Signup.css'

function Signup({ onSuccess, onOpenApiTester }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  })
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
    setError('')
    setSubmitted(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError('Please complete all required fields.')
      return
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError('Please enter a valid email address.')
      return
    }

    if (form.password.length < 8) {
      setError('Your password must contain at least 8 characters.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (!form.terms) {
      setError('Please accept the terms to continue.')
      return
    }

    setError('')
    setSubmitted(false)
    setLoading(true)

    try {
      await api.post('/signup', {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      })
      onSuccess()
      setForm({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false,
      })
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          'Could not create your account. Make sure the backend is running.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="signup-page">
      <section className="signup-intro" aria-label="Bookstore introduction">
        <p className="eyebrow">THE READING ROOM</p>
        <h1>Make room for your next great story.</h1>
        <p className="intro-copy">
          Create your account to save favorites, discover new authors, and
          keep your reading life in one place.
        </p>
        <div className="intro-note">
          <span className="note-mark">01</span>
          <p>Readers welcome. Curiosity required.</p>
        </div>
      </section>

      <section className="signup-panel">
        <div className="form-heading">
          <p className="eyebrow">JOIN THE CLUB</p>
          <h2>Create your account</h2>
          <p>It only takes a minute to get started.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Alex Morgan"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
          />

          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="alex@example.com"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
          />

          <div className="form-row">
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="8+ characters"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Repeat password"
                value={form.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
              />
            </div>
          </div>

          <label className="terms-label">
            <input
              name="terms"
              type="checkbox"
              checked={form.terms}
              onChange={handleChange}
            />
            <span>I agree to the terms and privacy policy.</span>
          </label>

          {error && <p className="form-message error-message">{error}</p>}
          {submitted && (
            <p className="form-message success-message">
              Your account was created successfully.
            </p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
            {!loading && <span aria-hidden="true">-&gt;</span>}
          </button>
        </form>

        <div className="signup-links">
          <p className="signin-prompt">
            Already have an account? <a href="#signin">Sign in</a>
          </p>
          <button type="button" className="tester-link" onClick={onOpenApiTester}>
            Open API Tester
          </button>
        </div>
      </section>
    </main>
  )
}

export default Signup