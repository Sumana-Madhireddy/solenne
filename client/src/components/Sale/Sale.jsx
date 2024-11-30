import React from 'react';

function Sale() {
  return (
    <div className=" text-black py-16">
      <div className="container mx-auto px-6">
        {/* Sale Banner */}
        <div className="text-center text-white mb-12">
          <h2 className="text-4xl font-extrabold text-teal-100 mb-4">Exclusive Sale!</h2>
          <p className="text-lg text-teal-200 mb-6">
            Get up to 50% off on select styles. Limited time offer – don’t miss out!
          </p>
          <a 
            href="/shop" 
            className="bg-teal-300 text-white px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-teal-400">
            Shop Now
          </a>
        </div>

        {/* Sale Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Sale Item 1 */}
          <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <img 
              src="https://via.placeholder.com/300" 
              alt="Sale Item 1" 
              className="w-full h-72 object-cover transition-all duration-300 transform group-hover:scale-110"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-xl font-semibold">Stylish Jacket</p>
              <p className="text-lg line-through text-teal-200">$120</p>
              <p className="text-xl font-bold text-teal-100">$80</p>
            </div>
          </div>

          {/* Sale Item 2 */}
          <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <img 
              src="https://via.placeholder.com/300" 
              alt="Sale Item 2" 
              className="w-full h-72 object-cover transition-all duration-300 transform group-hover:scale-110"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-xl font-semibold">Summer Dress</p>
              <p className="text-lg line-through text-teal-200">$95</p>
              <p className="text-xl font-bold text-teal-100">$60</p>
            </div>
          </div>

          {/* Sale Item 3 */}
          <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <img 
              src="https://via.placeholder.com/300" 
              alt="Sale Item 3" 
              className="w-full h-72 object-cover transition-all duration-300 transform group-hover:scale-110"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-xl font-semibold">Classic Watch</p>
              <p className="text-lg line-through text-teal-200">$150</p>
              <p className="text-xl font-bold text-teal-100">$100</p>
            </div>
          </div>

          {/* Sale Item 4 */}
          <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <img 
              src="https://via.placeholder.com/300" 
              alt="Sale Item 4" 
              className="w-full h-72 object-cover transition-all duration-300 transform group-hover:scale-110"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <p className="text-xl font-semibold">Leather Boots</p>
              <p className="text-lg line-through text-teal-200">$130</p>
              <p className="text-xl font-bold text-teal-100">$85</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sale;
