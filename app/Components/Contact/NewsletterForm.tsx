'use client'
import React, { useState } from 'react'
import { useTranslations } from 'next-intl'

const NewsletterForm = () => {
  const t = useTranslations('newsletter')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  return (
    <div className="w-full max-w-md bg-gray-50 rounded-lg shadow p-6 flex flex-col items-center">
      <h3 className="font-bold text-lg mb-2 text-black">{t('title')}</h3>
      <p className="text-gray-700 text-center mb-4">{t('description')}</p>
      <form className="w-full flex flex-col sm:flex-row gap-2" onSubmit={async (e) => {
        e.preventDefault()
        setMessage(null)
        if (!email) return
        try {
          setSubmitting(true)
          const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api'
          const res = await fetch(`${base}/newsletter/subscribe`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
          })
          if (!res.ok) throw new Error('Subscribe failed')
          setMessage('Subscribed! Please check your email.')
          setEmail('')
        } catch {
          setMessage('Subscription failed. Please try again.')
        } finally {
          setSubmitting(false)
        }
      }}>
        <input
          type="email"
          placeholder={t('inputPlaceholder')}
          className="flex-1 border rounded px-3 py-2"
          required
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <button
          type="submit"
          className="bg-accent text-white font-bold px-6 py-2 rounded hover:scale-105 transition-transform disabled:opacity-60"
          disabled={submitting}
        >
          {t('btn')}
        </button>
      </form>
      {message && <p className="mt-3 text-sm text-black">{message}</p>}
    </div>
  )
}

export default NewsletterForm
