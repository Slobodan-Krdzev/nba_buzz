'use client'
import React from 'react'

const NewsletterForm = () => {
  return (
    <div className="w-full max-w-md bg-gray-50 rounded-lg shadow p-6 flex flex-col items-center">
        <h3 className="font-bold text-lg mb-2 text-black">Stay in the Game!</h3>
        <p className="text-gray-700 text-center mb-4">
          Subscribe to our newsletter for exclusive offers, new drops, and basketball inspiration.
        </p>
        <form className="w-full flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            placeholder="Your email"
            className="flex-1 border rounded px-3 py-2"
            required
          />
          <button
            type="submit"
            className="bg-accent text-white font-bold px-6 py-2 rounded hover:scale-105 transition-transform"
          >
            Subscribe
          </button>
        </form>
      </div>
  )
}

export default NewsletterForm
