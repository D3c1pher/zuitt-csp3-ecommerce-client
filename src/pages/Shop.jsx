import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

export default function Shop({productsData}) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4003/b3/products/active`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const data = await response.json();

                if (Array.isArray(data.products)) {
                    setProducts(data.products);
                } else {
                    setProducts([]);
                }

            } catch (error) {
                console.error('Error viewing products:', error);
            }
        }
        fetchData();
    }, []);

	useEffect(() => {
        if (Array.isArray(productsData)) {
            const activeProducts = productsData.filter(product => product.isActive === true);
            setProducts(activeProducts);
        }
    }, [productsData]);

	return (
		<>
            <div className="bg-base-100 max-w-full">
                
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

                    <h2 className="text-4xl font-bold tracking-tight text-primary text-center">SHOP</h2>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">

                    {products.map(product => (
                            <ProductCard productsProp={product} key={product._id} />
                    ))}
					
                    </div>
                </div>
            </div>
		</>
	)
}