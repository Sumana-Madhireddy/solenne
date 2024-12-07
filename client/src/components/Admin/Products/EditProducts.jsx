import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';

function EditProduct({ onSave }) {
    const { id } = useParams();
    const { refreshAccessToken } = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        material: '',
        color: '',
        gender: '',
        price: '',
        details: '',
        img: '',
        thumbnails: '',
        description: '',
    });

    useEffect(() => {
        const fetchProduct = async () => {
            let currentToken = localStorage.getItem('authToken');
            try {
                let response = await fetch(`http://localhost:5000/products/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${currentToken}`,
                    },
                });
                if (response.status === 401) {
                    currentToken = await refreshAccessToken();
                    response = await fetch(`http://localhost:5000/products/${id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${currentToken}`,
                        },
                    });
                }

                const data = await response.json();
                setProduct(data);
                setFormData({
                    name: data.name,
                    img: data.img,
                    thumbnails: data.thumbnails.join(', '), 
                    description: data.description,
                    price: data.price,
                    details: data.details.join(', '),
                    category: data.category,
                    material: data.material,
                    color: data.color,
                    gender: data.gender,
                });
            } catch (error) {
                console.error('Error fetching product:', error);
                toast.error("Failed to load product details.");
            }
        };
        fetchProduct();
    }, [refreshAccessToken, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let currentToken = localStorage.getItem('authToken');
        const updatedProduct = {};
        if (formData.name !== product.name) updatedProduct.name = formData.name;
        if (formData.img !== product.img) updatedProduct.img = formData.img;
        if (formData.thumbnails !== product.thumbnails.join(', ')) updatedProduct.thumbnails = formData.thumbnails.split(', ').map(item => item.trim());
        if (formData.description !== product.description) updatedProduct.description = formData.description;
        if (formData.price !== product.price) updatedProduct.price = formData.price;
        if (formData.details !== product.details.join(', ')) updatedProduct.details = formData.details.split(', ').map(item => item.trim());
        if (formData.category !== product.category) updatedProduct.category = formData.category;
        if (formData.material !== product.material) updatedProduct.material = formData.material;
        if (formData.color !== product.color) updatedProduct.color = formData.color;
        if (formData.gender !== product.gender) updatedProduct.gender = formData.gender;

        try {
            let response = await fetch(`http://localhost:5000/admin/edit-product/${product.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentToken}`,
                },
                body: JSON.stringify(updatedProduct),
            });
            if (response.status === 401) {
                currentToken = await refreshAccessToken();
                response = await fetch(`http://localhost:5000/admin/edit-product/${product.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${currentToken}`,
                    },
                    body: JSON.stringify(updatedProduct),
                });
            }

            const data = await response.json();
            if (response.ok) {
                if (onSave) {
                    onSave(data);
                }
                toast.success("Product details successfully updated!");
            } else {
                toast.error("Failed to update product details.");
            }

        } catch (error) {
            console.error('Error updating product:', error.message);
            toast.error("Failed to update product details.");
        }
    };

    return (
        <div className="pb-10">
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 shadow-md rounded-md space-y-4">
                <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Edit Product</h2>
                <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="name">Product Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="img">Image URL</label>
                    <input
                        type="text"
                        id="img"
                        name="img"
                        value={formData.img}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="thumbnails">Thumbnails (comma separated URLs)</label>
                    <input
                        type="text"
                        id="thumbnails"
                        name="thumbnails"
                        value={formData.thumbnails}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="details">Details (comma separated)</label>
                    <input
                        type="text"
                        id="details"
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="category">Category</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="material">Material</label>
                    <input
                        type="text"
                        id="material"
                        name="material"
                        value={formData.material}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="color">Color</label>
                    <input
                        type="text"
                        id="color"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Gender:</label>
                    <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="unisex">Unisex</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600">Save Changes</button>
            </form>
        </div>
    );
}

export default EditProduct;