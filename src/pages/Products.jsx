import { useContext, useEffect, useState } from "react";
import UserContext from '../UserContext';
import UserView from '../components/UserView';
import AdminView from '../components/AdminView';

export default function Products() {
    const { user } = useContext(UserContext);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!user) return;

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

                if(typeof data.message !== "string"){
                    setProducts(data.products);
                } else {
                    setProducts([]);
                }

            } catch (error) {
                console.error('Error viewing products:', error);
            }
        }

        fetchData();
    }, [user]);

    if (!user) return null;

    return (
        <> 
            {
                user.isAdmin ? 
                    <AdminView productsData={products} />
                :
                    <UserView productsData={products} />
            }
		</>
    );
}