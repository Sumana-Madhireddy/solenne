import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify';

function EditUser({ onSave }) {
    const { id } = useParams();  
    const { refreshAccessToken } = useContext(CartContext);
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        role: '',
        email: '',
    });

    useEffect(() => {
        const editUser = async () => {
            let currentToken = localStorage.getItem('authToken');
            try {
                let response = await fetch(`http://localhost:5000/admin/edit-user/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${currentToken}`,
                    },
                });
                if (response.status === 401) {
                    currentToken = await refreshAccessToken();
                    response = await fetch(`http://localhost:5000/admin/edit-user/${id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${currentToken}`,
                        },
                    });
                }

                const data = await response.json();
                setUser(data.user);
                setFormData({
                    firstName: data.user.firstName,
                    lastName: data.user.lastName,
                    role: data.user.role,
                    email: data.user.email,
                });
            } catch (error) {
                console.error('Error fetching user:', error);
                toast.error("Failed to load user details.");
            }
        };
        editUser();
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
        const updatedUser = {};
        if (formData.firstName !== user.firstName) updatedUser.firstName = formData.firstName;
        if (formData.lastName !== user.lastName) updatedUser.lastName = formData.lastName;
        if (formData.role !== user.role) updatedUser.role = formData.role;
        if (formData.email !== user.email) updatedUser.email = formData.email;

        try {
            let response = await fetch(`http://localhost:5000/admin/edit-user/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentToken}`,
                },
                body: JSON.stringify(updatedUser),
            });
            if (response.status === 401) {
                currentToken = await refreshAccessToken();
                response = await fetch(`http://localhost:5000/admin/edit-user/${user.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${currentToken}`,
                    },
                    body: JSON.stringify(updatedUser),
                });
            }

            const data = await response.json();
            if (response.ok) {  
                if (onSave) {
                    onSave(data.user);
                }
                toast.success("User details successfully updated!");  
            } else {
                toast.error("Failed to update user details.");  
            }

        } catch (error) {
            console.error('Error updating user:', error.message);
            toast.error("Failed to update user details.");  
        }
    };

    return (
        <div className="pb-10">
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 shadow-md rounded-md space-y-4">
                <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Edit User</h2>
                <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="role">Role</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                        <option value="">Select Role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600">Save Changes</button>
            </form>
        </div>
    );
}

export default EditUser;
