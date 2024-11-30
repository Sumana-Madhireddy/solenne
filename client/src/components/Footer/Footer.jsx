import React from 'react';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-teal-600 to-teal-800 text-white py-4">
      <div className="w-full mx-auto px-6">
        {/* Footer Top Section */}
        <div className="flex flex-wrap justify-between pl-12 mb-4">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h3 className="text-xl font-extrabold mb-2 text-teal-100">Solenne</h3>
            <p className="text-sm text-gray-200">
              Curated fashion for the modern consumer. Discover your perfect look today.
            </p>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/3 pl-48 mb-4 md:mb-0">
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/about" className="hover:text-teal-200 transition-all duration-300">About Us</a></li>
              <li><a href="/shop" className="hover:text-teal-200 transition-all duration-300">Shop</a></li>
              <li><a href="/contact" className="hover:text-teal-200 transition-all duration-300">Contact</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="w-full pl-24 md:w-1/3">
            <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-teal-200 mr-2 transition-all duration-300 hover:text-teal-300"
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
                  className="w-5 h-5 text-teal-200 mr-2 transition-all duration-300 hover:text-teal-300"
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
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-teal-500 pt-3">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-300">
              &copy; {new Date().getFullYear()} Solenne. All Rights Reserved.
            </p>
            <div className="space-x-4">
              <a href="#" className="text-teal-200 hover:text-teal-300 transition-all duration-300">Facebook</a>
              <a href="#" className="text-teal-200 hover:text-teal-300 transition-all duration-300">Instagram</a>
              <a href="#" className="text-teal-200 hover:text-teal-300 transition-all duration-300">Twitter</a>
              <a href="#" className="text-teal-200 hover:text-teal-300 transition-all duration-300">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
