import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { CartContext } from "../../Context/CartContext";
import { API_ENDPOINT } from '../../../constants';

const AddProduct = () => {
    const navigate = useNavigate();
    const { refreshAccessToken } = useContext(CartContext);
    const [productData, setProductData] = useState({
        name: '',
        img: '',
        thumbnails: [],
        description: '',
        price: '',
        details: [],
        category: '',
        material: '',
        color: '',
        gender: '',
    });

    const handleArrayChange = (e, key) => {
        const values = e.target.value.split(',').map((item) => item.trim());
        setProductData({
          ...productData,
          [key]: values,
        });
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setProductData({
            ...productData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let currentToken = localStorage.getItem('authToken');
        console.log('currentToken ',currentToken);
        try {
            let response = await fetch(`${API_ENDPOINT}/add-product`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${currentToken}`,
                },
                body: JSON.stringify(productData),
              });
        
              if (response.status === 401) {
                currentToken = await refreshAccessToken();
                response = await fetch(`${API_ENDPOINT}/add-product`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentToken}`,
                  },
                  body: JSON.stringify(productData),
                });
            }
            else if (!response.ok) {
                throw new Error('Failed to add product');
            }
            const data = await response.json();
            alert('Product added successfully!');
            navigate('/admin/product-list'); 
            console.log(data);
        } catch (error) {
            console.error('Error adding product:', error);
            alert('Failed to add product');
        }
    }

    return (
        <div className="pb-10">
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 shadow-md rounded-md space-y-4">
                <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Add Product</h2>
                
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Name:</label>
                    <input
                    type="text"
                    name="name"
                    value={productData.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Image URL:</label>
                    <input
                    type="text"
                    name="img"
                    value={productData.img}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Thumbnails (comma separated URLs):</label>
                    <input
                    type="text"
                    name="thumbnails"
                    onChange={(e) => handleArrayChange(e, 'thumbnails')}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Description:</label>
                    <textarea
                    name="description"
                    value={productData.description}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Price:</label>
                    <input
                    type="number"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Details (comma separated):</label>
                    <input
                    type="text"
                    name="details"
                    onChange={(e) => handleArrayChange(e, 'details')}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Category:</label>
                    <input
                    type="text"
                    name="category"
                    value={productData.category}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Material:</label>
                    <input
                    type="text"
                    name="material"
                    value={productData.material}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Color:</label>
                    <input
                    type="text"
                    name="color"
                    value={productData.color}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Gender:</label>
                    <select
                    name="gender"
                    value={productData.gender}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="unisex">Unisex</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600"
                >
                    Add Product
                </button>
            </form>
        </div>
        
    );
};

export default AddProduct;