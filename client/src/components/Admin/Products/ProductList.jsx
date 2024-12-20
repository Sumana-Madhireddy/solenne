import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINT } from '../../../constants';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/products`); 
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddProduct = () => {
    navigate('/admin/add-product');
  };

  const handleSelectProduct = (productId) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleDeleteProducts = async () => {
    try {
      await Promise.all(
        selectedProducts.map((id) =>
          fetch(`${API_ENDPOINT}/products/${id}`, {
            method: 'DELETE',
          })
        )
      );
      fetchProducts(); 
      setSelectedProducts([]); 
      alert('Selected products deleted successfully');
    } catch (error) {
      console.error('Error deleting products:', error);
      alert('Failed to delete selected products');
    }
  };

  const handleEditProduct = (productId) => {
    navigate(`/admin/edit-product/${productId}`);
  };

  return (
    <div>
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
    </div>
  );
};

export default ProductList;
