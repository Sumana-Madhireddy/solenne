import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { images } from "../../constants";
import {API_ENDPOINT} from "../../constants";

function HomePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        const categories = [
          ...new Set(data.map((product) => product.category)),
        ];
        setCategories(categories);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  const handleClick = () => {
    navigate("/shop");
  };
  const handleClickCategory = (category) => {
    navigate(`/products?category=${category}`);
  };
  const handleNavigateToProduct = (id) => {
    navigate(`/product-detail/${id}`);
  };

  return (
    <div className="font-sans bg-gray-50 text-gray-800 mt-20">
      <section className="relative bg-gray-700 text-white ">
        <div className="w-full mx-auto px-6 py-16 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to Solenne
          </h1>
          <p className="text-lg md:text-xl mb-8 font-heading">
            Discover exclusive collections and seamless shopping experiences.
          </p>
          <button
            onClick={handleClick}
            className="px-6 py-3 font-brand bg-teal-500 hover:bg-teal-600 text-white text-lg rounded-lg font-semibold transition-transform transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Shop Now
          </button>
        </div>
        <img
          src={images.banner}
          alt="Hero Image"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-brand font-bold mb-8">
            Featured Products
          </h2>
          <div className="flex gap-6 overflow-x-scroll hide-scrollbar scroll-smooth snap-x snap-mandatory px-4">
            {products.map((product, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-72 p-6 border rounded-lg shadow hover:shadow-lg transition snap-center"
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <h3 className="text-xl font-brand font-bold mt-4">
                  {product.name}
                </h3>
                <p className="text-gray-600 font-brand  mt-2">
                  ${product.price}
                </p>
                <button
                  onClick={() => handleNavigateToProduct(product.id)}
                  className="mt-4 px-4 py-2 font-brand bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-semibold transition-transform transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-brand md:text-4xl font-bold mb-8">
            Shop by Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg hover:cursor-pointer hover:shadow-lg transition"
                onClick={() => handleClickCategory(category)}
              >
                <img
                  src={images[category]}
                  alt={category}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <h3 className="mt-4 text-lg font-heading font-semibold">
                  {category}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
