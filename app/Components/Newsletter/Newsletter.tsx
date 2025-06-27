'use client'


export default function NewsletterSection() {
  return (
    <section className="relative min-h-[800px] flex items-center justify-center bg-[url('/common/newsletter.jpg')] bg-cover lg:bg-center">
      {/* Background image */}
      

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4 max-w-xl w-full">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          JOIN OUR NEWSLETTER
        </h2>
        <p className="text-sm md:text-base mb-5">
          Be first to see new arrivals, exclusive deals & discover our latest
          products by subscribing to our newsletter!
        </p>

        {/* Input */}
        <form className="flex items-center justify-center">
          <input
            type="email"
            placeholder="Email..."
            className="w-full md:w-[300px] px-4 py-2 text-black focus:outline-none"
          />
          <button
            type="submit"
            className="bg-white text-black font-semibold px-4 py-2 rounded-r hover:bg-accentLight transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}
