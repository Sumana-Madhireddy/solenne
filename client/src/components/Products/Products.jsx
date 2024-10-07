import React, { useEffect, useState } from "react";
import Product from "./Product/Product";
// import black_top from '../../assets/Lounge_Tunic_black.jpg';
// import blue_top from '../../assets/Lounge_Tunic_blue.jpg';
// import cream_top from '../../assets/Lounge_Tunic_Cream.jpg';
// import sonia_Skirt from '../../assets/Sonia_Skirt.jpg';

// const products = [
//     {id: 1, name: 'Lounge Tunic / Black', img: black_top, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', price: '$50.00', details: ['100% Cotton', 'Machine wash cold ', 'Tumble dry low']},
//     {id: 2, name: 'Lounge Tunic / Blue', img: blue_top, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', price: '$50.00', details: ['100% Cotton', 'Machine wash cold ', 'Tumble dry low']},
//     {id: 3, name: 'Lounge Tunic / Cream', img: cream_top, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', price: '$40.00', details: ['100% Cotton', 'Machine wash cold ', 'Tumble dry low']},
//     {id: 4, name: 'Sonia Skirt', img: sonia_Skirt, description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', price: '$50.00', details: ['100% Cotton', 'Machine wash cold ', 'Tumble dry low']},
// ]

const Products = () => {
    const [products, setProducts] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);    
  
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch('http://localhost:5000/products');
          if (!response.ok) {
            throw new Error('Failed to fetch products');
          }
          const data = await response.json();
          setProducts(data); 
          console.log("data img url -",data[0].img);
          setLoading(false); 
        } catch (error) {
          setError(error.message); 
          setLoading(false); 
        }
      };
  
      fetchProducts();
    }, []);
  
    if (loading) {
      return <p>Loading products...</p>; 
    }
    if (error) {
      return <p>Error: {error}</p>; 
    }

    return (
        <main>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-black m-10 pt-5">
                {products.map((product)=>(
                    <div item key={product.id} xs={12} sm={6} md={4} lg={3} className="">
                        <Product product = {product}/>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Products;
