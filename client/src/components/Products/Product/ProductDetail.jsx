import React,{ useContext, useEffect, useState, } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ImageCarousel from "./ImageCarousel";
import { CartContext } from "../../Context/CartContext";
import { API_ENDPOINT } from "../../../constants";

const ProductDetail = () => {
    const navigate = useNavigate();
    let { id } = useParams();
    const [curIndex, setCurIndex] = useState(0);
    const [productDetails,setProductDetails] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const sizes = ['XS','S','M','L','XL','XXL'];
    const { addItemToCart } = useContext(CartContext);

    const handleSizeChnage=(size) => {
        setSelectedSize(size);
    };

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        setQuantity(value > 0 ? value : 1);
    };
 
    const handleAddToCart = async () => {
        if(!selectedSize) {
            alert("Please select a size before adding to cart.");
            return;
        }
        await addItemToCart(productDetails.id, quantity, selectedSize);
        alert("Product added to Cart.");
        navigate('/cart');
    };

    useEffect(() => {
        const fetchProductDetail = async () =>{
            try {
                const response = await fetch(`${API_ENDPOINT}/products/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProductDetails(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        } 
        fetchProductDetail();
    },[id]);
    if (!productDetails) {
        return <div>Loading...</div>; 
    }
    return (
        <div className="container mx-auto p-6 flex">
            <div className="w-1/2 flex flex-col items-center">
                {/* <div className="mb-4">
                    <img
                        src={productDetails.img}
                        alt={productDetails.name}
                        className="w-full h-auto object-cover"
                    ></img>
                    <ImageCarousel thumbnails = {productDetails.thumbnails}/>
                </div> */}
                <ImageCarousel thumbnails = {productDetails.thumbnails} curIndex={curIndex} setCurIndex={setCurIndex}/>
                <div className="flex space-x-2 pt-2">
                    {productDetails.thumbnails.map((thumb, index) => (
                        <img
                            key={index}
                            src={thumb}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-24 h-24 object-cover cursor-pointer"
                            onClick={()=>setCurIndex(index)}
                        />
                    ))}
                </div>
            </div>
            <div className="w-1/2 pl-8">
                <h1 className="text-3xl font-semibold mb-2">{productDetails.name}</h1>
                <p className="text-xl font-medium text-gray-700 mb-4">${productDetails.price}</p>
                <h3 className="text-lg font-semibold mb-1">Description</h3>
                <p className="text-gray-600 mb-4">{productDetails.description}</p>
                <h3 className="text-lg font-semibold mb-1">Details</h3>
                <ul className="text-gray-600 list-disc pl-5 mb-4">
                    {productDetails.details.map((detail, index) => (
                        <li key={index}>{detail}</li>
                    ))}
                </ul>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-1">Size:</h3>
                    <div className="flex space-x-2">
                        {sizes.map((size, index) => (
                            <button
                                onClick={()=>handleSizeChnage(size)}
                                key={index}
                                className={
                                    selectedSize === size
                                        ? "border-2 p-2 rounded h-20 w-20 text-white text-lg bg-slate-800 hover:border-black"
                                        : "border-2 p-2 rounded h-20 w-20 text-gray-600 text-lg hover:border-black hover:text-black"
                                }
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-1">Quantity:</h3>
                    <input
                        type="number"
                        min="1"
                        defaultValue="1"
                        onClick={handleQuantityChange}
                        className="border-2 p-2 h-20 w-20 text-2xl text-center"
                    />
                </div>
                <button onClick={handleAddToCart} className=" bg-teal-500 hover:bg-teal-600 font-semibold text-white px-4 py-2 rounded ">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductDetail;
