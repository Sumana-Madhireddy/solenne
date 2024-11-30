import React from 'react';

function About() {
  return (
    <section className=" text-black pb-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl text-teal-600  font-brand font-bold mb-6 text-shadow-md">
          About Solenne
        </h2>
        <p className="text-lg mb-8">
          Welcome to Solenne, where innovation meets simplicity. We are not just another e-commerce platform. We’re committed to delivering a seamless shopping experience with a touch of style and sophistication. Every product we offer is selected with care to ensure quality and satisfaction.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-x-12 md:space-y-0">
          <div className="w-full md:w-1/3 p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4 text-teal-500">Our Mission</h3>
            <p className="text-gray-700">
              Our mission is simple: to make online shopping easy, enjoyable, and accessible to everyone. We aim to connect people with the products they love, while prioritizing a smooth, safe, and efficient shopping experience.
            </p>
          </div>

          <div className="w-full md:w-1/3 p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4 text-teal-500">What We Offer</h3>
            <p className="text-gray-700">
              From trendy fashion to high-tech gadgets, our carefully curated selection offers something for everyone. Solenne combines top-quality products with unbeatable prices, giving our customers the best value every time they shop.
            </p>
          </div>

          <div className="w-full md:w-1/3 p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
            <h3 className="text-2xl font-semibold mb-4 text-teal-500">Why Choose Us</h3>
            <p className="text-gray-700">
              At Solenne, we prioritize customer satisfaction above all. We offer fast, secure shipping, excellent customer support, and a hassle-free return policy to ensure that every customer has an outstanding experience with us.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <p className="text-xl font-semibold">Join the Solenne family today and experience shopping like never before!</p>
          <button className="mt-4 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
            Start Shopping
          </button>
        </div>
      </div>
    </section>
  );
}

export default About;
