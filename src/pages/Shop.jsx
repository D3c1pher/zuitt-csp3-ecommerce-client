import { useContext, useEffect, useState } from "react";
import UserContext from '../UserContext';
// import UserView from '../components/UserView';

import ProductImg from "../assets/product-placeholder.webp";

export default function Shop() {
    const { user } = useContext(UserContext);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                let fetchUrl = user.isAdmin === true ? 
                    `http://localhost:4003/b3/products/all` 
                    : 
                    `http://localhost:4003/b3/products/active`

                const response = await fetch(fetchUrl, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                const data = await response.json();

                if (data.products.length === 0) {
                    setCourses([]);
                }

                console.log(data.products);

                setProducts(data.products);
            } catch (error) {
                console.error('Error viewing products:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="bg-base-100 max-w-full">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

                <h2 className="text-4xl font-bold tracking-tight text-primary text-center">SHOP</h2>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
               
               {products.map((product) => (
                    <div key={product.id} className="card bg-white shadow-xl group relative overflow-hidden rounded-xl">

                    <figure><img src={ProductImg} alt="Product Image" className="h-full w-full object-contain object-center group-hover:opacity-75 p-5" /></figure>

                    <div className="card-body">
                      <h2 className="card-title text-sm font-medium text-primary">
                        {product.name}
                      </h2>
                      <p className="mt-1 text-sm text-black">{product.description}</p>
                      <p className="font-medium text-2xl text-secondary">₱ {product.price}</p>
                      <div className="card-actions justify-end">
                        {/* <div className="badge badge-accent rounded-xl">{product.category}</div> */}
                        <button className="btn btn-outline btn-primary rounded-xl">Add to Cart</button>
                      </div>
                    </div>

                  </div>
                ))}

                </div>

            </div>
            
        </div>
    );
    
}
