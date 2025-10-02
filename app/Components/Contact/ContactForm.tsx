'use client'
import React from "react";

const ContactForm = () => {
  return (
    <form className="w-[90%] mx-auto bg-white border rounded-lg shadow p-6 space-y-4 mt-[1vh]">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="mt-1 block w-full py-2 rounded-md border-gray-300 border shadow-sm focus:border-accent focus:ring-accent"
          required
        />
      </div>
      <div>
        <label
          htmlFor="lastname"
          className="block text-sm font-medium text-gray-700"
        >
          Lastname
        </label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          className="py-2 border mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent"
          required
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full py-2 rounded-md border-gray-300 border shadow-sm focus:border-accent focus:ring-accent"
          required
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="mt-1 block w-full py-2 rounded-md border-gray-300 border shadow-sm focus:border-accent focus:ring-accent"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-accent text-white font-bold py-2 px-4 rounded hover:bg-accent-dark transition"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
