// import React, { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { CartContext } from "../Context/CartContext";
// import {images} from '../../constants';

// const Account = () => {
//   const navigate  = useNavigate();
//   const firstName = localStorage.getItem("firstName") || "John";
//   const lastName = localStorage.getItem("lastName") || "Doe";
//   const email = localStorage.getItem("email") || "johndoe@example.com";
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const { refreshAccessToken } = useContext(CartContext);

//   const handleOrders= () => {
//     navigate('/orders');
//   }
//   const handleNavigateToOrderSummary = (orderId) => {
//     console.log('orderId - ',orderId);
//     navigate(`/order-summary/${orderId}`);
//   };

//   useEffect(() => {
//     const fetchOrders = async () => {
//       setLoading(true);
//       let currentToken = localStorage.getItem('authToken');
//       try {
//         const response = await fetch("http://localhost:5000/orders", {
//           headers: {
//             Authorization: `Bearer ${currentToken}`,
//             "Content-Type": "application/json",
//           },
//         });
//         if (response.status === 401) {
//           currentToken = await refreshAccessToken();
//           response = await fetch('http://localhost:5000/orders',{
//               headers: {
//                   'Authorization': `Bearer ${currentToken}`,
//                   'Content-Type': 'application/json',
//               },
//           }); 
//         }

//         if (response.ok) {
//           const data = await response.json();
//           const sortedOrders = data
//             .sort((a, b) => new Date(b.date) - new Date(a.date)) 
//             .slice(0, 2);
//           setOrders(sortedOrders);
//         } else {
//           console.error("Failed to fetch orders");
//         }
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);
//   const [imagePreview, setImagePreview] = useState(images.profile);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleImageUpload = async () => {
//     if (!selectedImage) {
//       alert("Please select an image first.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("profileImage", selectedImage);

//     try {
//       const response = await fetch("http://localhost:5000/upload", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         alert("Image uploaded successfully!");
//         // Optionally, fetch and update the new profile image URL here
//       } else {
//         alert("Failed to upload image.");
//       }
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       alert("An error occurred during upload.");
//     }
//   };
  

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Profile Section */}
//         <div className="md:w-1/3 bg-teal-600 text-white p-6 rounded-lg shadow-lg">
//           <div className="pt-10 text-center">
//             <img
//               src={imagePreview}
//               alt="Profile"
//               className="w-32 h-32 rounded-full mx-auto mb-4"
//             />
//             <h2 className="text-2xl font-semibold">{firstName} {lastName}</h2>
//             <p className="text-sm text-teal-200 mt-2">{email}</p>
//           </div>
//           <div className="mt-6">
//             <input
//               type="file"
//               accept="image/*"
//               className="mb-4 text-sm text-gray-700"
//               onChange={handleImageChange}
//             />
//             <button
//               onClick={handleImageUpload}
//               className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2 rounded-md focus:outline-none transition duration-300"
//             >
//               Upload Image
//             </button>
//           </div>
//           <div className="mt-6">
//             <button className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2 rounded-md focus:outline-none transition duration-300">
//               Edit Profile
//             </button>
//             <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded-md mt-4 focus:outline-none transition duration-300">
//               Change Password
//             </button>
//           </div>
//         </div>

//         {/* Account Information Section */}
//         <div className="md:w-2/3 bg-white p-6 rounded-lg shadow-lg">
//           <h3 className="text-xl font-semibold text-teal-800 mb-6">Account Information</h3>
//           <ul className="space-y-4 text-gray-700">
//             <li className="flex items-center justify-between border-b pb-4">
//               <span className="font-medium">Full Name:</span>
//               <span>{firstName} {lastName}</span>
//             </li>
//             <li className="flex items-center justify-between border-b pb-4">
//               <span className="font-medium">Email Address:</span>
//               <span>{email}</span>
//             </li>
//           </ul>

//           {/* Order History Section */}
//           <h3 className="text-xl font-semibold text-teal-800 mt-8 mb-4">Order History</h3>
//           {loading ? (
//               <p>Loading orders...</p>
//             ) : orders.length > 0 ? (
//               <ul className="space-y-4 text-gray-700">
//                 {orders.map((order) => (
//                   <li key={order.orderId} className="border rounded-md p-4 hover:shadow-lg transition duration-300">
//                     <h4 onClick={() =>handleNavigateToOrderSummary(order.orderId)} className="text-teal-800 hover:cursor-pointer font-medium">Order #{order.orderId}</h4>
//                     <p className="text-sm text-gray-500">
//                       Placed on:{" "}
//                       {new Date(order.createdAt).toLocaleDateString(undefined, {
//                         year: "numeric",
//                         month: "long",
//                         day: "numeric",
//                       })}
//                     </p>
//                     <p className="text-sm text-gray-500">Status: {order.status}</p>
//                     <p className="text-sm text-gray-500">Total: ${order.totalAmount}</p>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No recent orders found.</p>
//             )}

//           <div className="mt-4">
//             <button onClick={handleOrders} className="w-full bg-teal-700 hover:bg-teal-800 text-white py-2 rounded-md focus:outline-none transition duration-300">
//               View All Orders
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Account;


import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { images } from "../../constants";

const Account = () => {
  const navigate = useNavigate();
  const firstName = localStorage.getItem("firstName") || "John";
  const lastName = localStorage.getItem("lastName") || "Doe";
  const email = localStorage.getItem("email") || "johndoe@example.com";
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { refreshAccessToken } = useContext(CartContext);

  const handleOrders = () => {
    navigate("/orders");
  };

  const handleNavigateToOrderSummary = (orderId) => {
    navigate(`/order-summary/${orderId}`);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      let currentToken = localStorage.getItem("authToken");
      try {
        let response = await fetch("http://localhost:5000/orders", {
          headers: {
            Authorization: `Bearer ${currentToken}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 401) {
          currentToken = await refreshAccessToken();
          response = await fetch("http://localhost:5000/orders", {
            headers: {
              Authorization: `Bearer ${currentToken}`,
              "Content-Type": "application/json",
            },
          });
        }

        if (response.ok) {
          const data = await response.json();
          const sortedOrders = data
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 2);
          setOrders(sortedOrders);
        } else {
          console.error("Failed to fetch orders");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const [imagePreview, setImagePreview] = useState(images.profile);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", selectedImage);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Image uploaded successfully!");
      } else {
        alert("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("An error occurred during upload.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Section */}
        <div className="md:w-1/3 bg-white p-6 rounded-lg shadow-lg">
          <div className="text-center">
            <img
              src={imagePreview}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-4 shadow"
            />
            <h2 className="text-2xl font-semibold text-teal-700">
              {firstName} {lastName}
            </h2>
            <p className="text-sm text-gray-600 mt-2">{email}</p>
          </div>
          {/* <div className="mt-6">
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-600 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-white file:bg-teal-600 hover:file:bg-teal-700 mb-4"
              onChange={handleImageChange}
            />
            <button
              onClick={handleImageUpload}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md transition duration-300"
            >
              Upload Image
            </button>
          </div> */}
          {/* <div className="mt-4 space-y-4">
            <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md transition duration-300">
              Edit Profile
            </button>
            <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md transition duration-300">
              Change Password
            </button>
          </div> */}
        </div>

        {/* Account Information Section */}
        <div className="md:w-2/3 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-teal-700 mb-6">Account Information</h3>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-center justify-between border-b pb-4">
              <span className="font-medium">Full Name:</span>
              <span>{firstName} {lastName}</span>
            </li>
            <li className="flex items-center justify-between border-b pb-4">
              <span className="font-medium">Email Address:</span>
              <span>{email}</span>
            </li>
          </ul>

          {/* Order History Section */}
          <h3 className="text-xl font-semibold text-teal-700 mt-8 mb-4">Order History</h3>
          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length > 0 ? (
            <ul className="space-y-4 text-gray-700">
              {orders.map((order) => (
                <li
                  key={order.orderId}
                  className="border rounded-md p-4 hover:shadow-lg transition duration-300"
                >
                  <h4
                    onClick={() => handleNavigateToOrderSummary(order.orderId)}
                    className="text-teal-700 font-medium cursor-pointer"
                  >
                    Order #{order.orderId}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Placed on:{" "}
                    {new Date(order.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-gray-500">Status: {order.status}</p>
                  <p className="text-sm text-gray-500">Total: ${order.totalAmount}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No recent orders found.</p>
          )}

          <div className="mt-4">
            <button
              onClick={handleOrders}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md transition duration-300"
            >
              View All Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
