import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from the backend
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/products'); // Adjust to your API endpoint
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Navigate to Add Product page
  const handleAddProduct = () => {
    navigate('/admin/add-product');
  };

  // Handle product selection for bulk delete
  const handleSelectProduct = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Delete selected products
  const handleDeleteProducts = async () => {
    try {
      await Promise.all(
        selectedProducts.map((id) =>
          fetch(`http://localhost:5000/products/${id}`, {
            method: 'DELETE',
          })
        )
      );
      fetchProducts(); // Refresh the product list
      setSelectedProducts([]); // Clear selection
      alert('Selected products deleted successfully');
    } catch (error) {
      console.error('Error deleting products:', error);
      alert('Failed to delete selected products');
    }
  };

  // Navigate to Edit Product page
  const handleEditProduct = (productId) => {
    navigate(`/admin/edit-product/${productId}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Product List</h2>
        <button
          onClick={handleAddProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add New Product
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border border-gray-200">Select</th>
            <th className="p-2 border border-gray-200">Product Name</th>
            <th className="p-2 border border-gray-200">Price</th>
            <th className="p-2 border border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="text-center">
              <td className="p-2 border border-gray-200">
                <input
                  type="checkbox"
                  checked={selectedProducts.includes(product.id)}
                  onChange={() => handleSelectProduct(product.id)}
                />
              </td>
              <td className="p-2 border border-gray-200">{product.name}</td>
              <td className="p-2 border border-gray-200">${product.price}</td>
              <td className="p-2 border border-gray-200">
                <button
                  onClick={() => handleEditProduct(product.id)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 mr-2"
                >
                  Edit
                </button>
                {/* <button
                  onClick={() => handleSelectProduct(product.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedProducts.length > 0 && (
        <button
          onClick={handleDeleteProducts}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Delete Selected Products
        </button>
      )}
    </div>
  );
};

export default ProductList;
