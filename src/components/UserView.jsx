import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
// import ProductSearch from "./ProductSearch";

export default function UserView({productsData}) {
    const [products, setProducts] = useState([]);

	useEffect(() => {
		const productsArr = productsData.map(product => {
			if (product.isActive === true) {
				return (
					<ProductCard 
                        productsProp={product} 
                        key={product._id}
                    />
				)
			} else {
				return null;
			}
		})
		setProducts(productsArr)
	}, [productsData])

	return (
		<>
            {/* <CourseSearch /> */}
            <div className="bg-base-100 max-w-full">
                
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

                    <h2 className="text-4xl font-bold tracking-tight text-primary text-center">SHOP</h2>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">

                    

                    { products }
                    
                    </div>
                </div>
            </div>
		</>
	)
}