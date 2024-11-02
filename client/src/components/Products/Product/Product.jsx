import React from "react";
import { useNavigate } from 'react-router-dom';

const Product = ({product}) => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/product-detail/${product.id}`);
    };
    

    return (
        <div onClick={handleNavigate} className='max-w-full flex-col justify-center items-center font-heading p-5 hover:shadow-lg'>
            <div className="w-full">
                <img src={product.img} alt="apparel" className="w-full h-auto object-cover hover:cursor-pointer"></img>
            </div>
            <div className="flex flex-row justify-between items-center space-y-1">
                <h5 className='hover:cursor-pointer'>{product.name}</h5>
                <h5>{product.price}</h5>
            </div>
        </div>
    );
}

export default Product;

