import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from "../../Context/CartContext";

const Users = () => {
    const { refreshAccessToken } = useContext(CartContext);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        let currentToken = localStorage.getItem('authToken');
        try {
            const response = await fetch('http://localhost:5000/admin/all-users',{
                headers: {
                    'Authorization': `Bearer ${currentToken}`,
                    'Content-Type': 'application/json',
                },
            }); 
            if (response.status === 401) {
                currentToken = await refreshAccessToken();
                response = await fetch('http://localhost:5000/admin/all-users',{
                    headers: {
                        'Authorization': `Bearer ${currentToken}`,
                        'Content-Type': 'application/json',
                    },
                }); 
            }
            console.log("response ", response);
            const data = await response.json();
            setUsers(data);
            console.log("data ", data);
        } catch (error) {
            console.error('Error fetching Users:', error);
        }
    };
    
    const handleEditUser = (id) => {
        navigate(`/admin/users/${id}`);
    };
    console.log("Users ",users);


    return (
        <div>
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Users</h2>
                </div>
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border border-gray-200">User Id</th>
                            <th className="p-2 border border-gray-200">First Name</th>
                            <th className="p-2 border border-gray-200">Last Name</th>
                            <th className="p-2 border border-gray-200">Email</th>
                            <th className="p-2 border border-gray-200">Role</th>
                            <th className="p-2 border border-gray-200">View User</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="text-center">
                            <td className="p-2 border border-gray-200">{user.id}</td>
                            <td className="p-2 border border-gray-200">{user.firstName}</td>
                            <td className="p-2 border border-gray-200">{user.lastName}</td>
                            <td className="p-2 border border-gray-200">{user.email}</td>
                            <td className="p-2 border border-gray-200">{user.role}</td>
                            <td className="p-2 border border-gray-200">
                                <button
                                onClick={() => handleEditUser(user.id)}
                                className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 mr-2"
                                >
                                edit user
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;