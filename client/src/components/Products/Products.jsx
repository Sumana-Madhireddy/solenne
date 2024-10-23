import React, { useEffect, useState } from "react";
import Product from "./Product/Product";

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
          console.log("products data: ",data);
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
