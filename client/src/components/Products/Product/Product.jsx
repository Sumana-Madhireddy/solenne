import React from "react";
import { Link, useNavigate } from 'react-router-dom';

const Product = ({product}) => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/product-detail/${product.id}`);
    }

    return (
        <div className='max-w-full flex-col justify-center items-center font-heading p-3'>
            <div className="w-full">
                <img src={product.img} onClick={handleNavigate} alt="apparel" className="w-full h-auto object-cover"></img>
            </div>
            <div className="flex flex-row justify-between items-center space-y-1">
                <Link onClick={handleNavigate}><h5>{product.name}</h5></Link>
                <h5>{product.price}</h5>
            </div>
            <button className="bg-slate-200 hover:bg-slate-300 text-black font-semibold rounded-md py-1 px-3 mt-4 transition duration-300 ease-in-out">Add to Cart</button>
        </div>
    );
}

export default Product;

