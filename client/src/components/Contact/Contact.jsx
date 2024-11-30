import React from 'react';

function Contact() {
  return (
    <section className= "text-black pb-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl text-teal-600 font-brand font-bold mb-6 text-shadow-md">Contact Us</h2>
        <p className="text-lg mb-10">
          Have questions or feedback? We’d love to hear from you! Reach out to us, and we’ll get back to you as soon as possible.
        </p>

        <div className="flex flex-col md:flex-row justify-center space-y-8 md:space-y-0 md:space-x-12">
          <div className="w-full md:w-1/2 bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-teal-500 mb-4">Send Us a Message</h3>
            <form>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 rounded-md border-2 border-teal-300 focus:outline-none focus:border-teal-500 transition"
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 rounded-md border-2 border-teal-300 focus:outline-none focus:border-teal-500 transition"
                />
              </div>
              <div className="mb-4">
                <textarea
                  placeholder="Your Message"
                  rows="4"
                  className="w-full p-3 rounded-md border-2 border-teal-300 focus:outline-none focus:border-teal-500 transition"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-md font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="w-full md:w-1/2 bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold text-teal-500 mb-4">Our Contact Details</h3>
            <ul className="space-y-6">
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-teal-500 mr-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c-1.398 0-2.674-.516-3.651-1.363-1.198-1.036-1.684-2.57-1.032-3.978 1.187-2.391 4.279-2.632 5.449.88C22.712 7.426 22.53 10 21 10z"></path>
                </svg>
                <span>support@solenne.com</span>
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-teal-500 mr-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c-1.398 0-2.674-.516-3.651-1.363-1.198-1.036-1.684-2.57-1.032-3.978 1.187-2.391 4.279-2.632 5.449.88C22.712 7.426 22.53 10 21 10z"></path>
                </svg>
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-teal-500 mr-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c-1.398 0-2.674-.516-3.651-1.363-1.198-1.036-1.684-2.57-1.032-3.978 1.187-2.391 4.279-2.632 5.449.88C22.712 7.426 22.53 10 21 10z"></path>
                </svg>
                <span>123 Solenne Avenue, New York, NY</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg font-semibold">
            We look forward to hearing from you! Our team is ready to assist with any inquiries.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
