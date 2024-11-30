import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Product from "./Product/Product";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category") || "All";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
        const categories = ["All", ...new Set(data.map((product) => product.category))];
        setCategories(categories);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (category) => {
    navigate(`?category=${category}`);
  };

  if (loading) {
    return <p>Loading products...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <main>
      <div className="flex justify-center mb-6">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`mx-2 px-3 py-1 rounded-full text-s font-heading transition-all duration-300 transform ${
              selectedCategory === category
                ? "bg-gradient-to-r from-teal-500 to-teal-700 text-white shadow-xl"
                : "bg-gray-200 text-gray-700 hover:bg-teal-100 hover:text-teal-500 shadow-sm"
            } hover:scale-105 hover:shadow-lg`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-black m-10">
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <Product product={product} />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Products;
