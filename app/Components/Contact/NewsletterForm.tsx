'use client'
import React from 'react'
import { useTranslations } from 'next-intl'

const NewsletterForm = () => {
  const t = useTranslations('newsletter')
  return (
    <div className="w-full max-w-md bg-gray-50 rounded-lg shadow p-6 flex flex-col items-center">
        <h3 className="font-bold text-lg mb-2 text-black">{t('title')}</h3>
        <p className="text-gray-700 text-center mb-4">{t('description')}</p>
        <form className="w-full flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            placeholder={t('inputPlaceholder')}
            className="flex-1 border rounded px-3 py-2"
            required
          />
          <button
            type="submit"
            className="bg-accent text-white font-bold px-6 py-2 rounded hover:scale-105 transition-transform"
          >
            {t('btn')}
          </button>
        </form>
      </div>
  )
}

export default NewsletterForm
