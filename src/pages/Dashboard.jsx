import {useState, useEffect, useContext} from 'react';
import { Link, Navigate } from "react-router-dom";
import ArchiveProduct from '../components/ArchiveProduct';
import SetUserRole from '../components/SetUserRole';
import UserContext from '../UserContext';

export default function Dashboard() {
    const { user } = useContext(UserContext);

    const [selectedTab, setSelectedTab] = useState('products');
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_URL;

    const isAdmin = user && user.id !== null && user.isAdmin; 

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${apiUrl}/b3/products/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
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

        } catch (err) {
            console.error('Error viewing products: ', err);
        }
    }

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${apiUrl}/b3/users/view-all-users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();

            if (Array.isArray(data.users)) {
                setUsers(data.users);
            } else {
                setUsers([]);
            }

        } catch (err) {
            console.error('Error viewing users: ', err);
        }
    }

    const fetchOrders = async () => {
        try {
            const response = await fetch(`${apiUrl}/b3/orders/all-orders`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }

            const data = await response.json();

            if (Array.isArray(data.orders)) {
                setOrders(data.orders);
            } else {
                setOrders([]);
            }

        } catch (err) {
            console.error('Error viewing orders: ', err);
        }
    }
        
    useEffect(() => {
        fetchProducts();
        fetchUsers();
        fetchOrders();
    }, []);

    const DashboardTabs = ({ selectedTab, handleTabChange }) => {
        return (
            <nav className="w-full h-full bg-neutral text-white py-5">
                <div className="container mx-auto flex justify-evenly">
                    <label className="block cursor-pointer">
                        <input
                            type="radio"
                            className="hidden"
                            name="dashboard"
                            value="products"
                            checked={selectedTab === 'products'}
                            onChange={() => handleTabChange('products')}
                        />
                        <span className={`px-6 py-3 rounded-lg hover:bg-primary/70 ${selectedTab === 'products' ? 'bg-primary' : ''}`}>
                            Products
                        </span>
                    </label>
                    <label className="block cursor-pointer">
                        <input
                            type="radio"
                            className="hidden"
                            name="dashboard"
                            value="users"
                            checked={selectedTab === 'users'}
                            onChange={() => handleTabChange('users')}
                        />
                        <span className={`px-6 py-3 rounded-lg hover:bg-primary/70 ${selectedTab === 'users' ? 'bg-primary' : ''}`}>
                            Users
                        </span>
                    </label>
                    <label className="block cursor-pointer">
                        <input
                            type="radio"
                            className="hidden"
                            name="dashboard"
                            value="orders"
                            checked={selectedTab === 'orders'}
                            onChange={() => handleTabChange('orders')}
                        />
                        <span className={`px-6 py-3 rounded-lg hover:bg-primary/70 ${selectedTab === 'orders' ? 'bg-primary' : ''}`}>
                            Orders
                        </span>
                    </label>
                </div>
            </nav>
        );
    }

    const DashboardContent = ({ tab }) => {
		return (
			<div className="mx-auto py-5 bg-base-100">
				{tab === 'products' && (
					<>
                       <div className=" flex lg:ml-4 lg:mt-0 items-center justify-between mb-5">
                            <h2 className="text-2xl sm:text-3xl text-primary text-center font-bold flex-grow sm:ml-20">Product Dashboard</h2>
                            <span className="sm:block mr-5">
                                <Link
                                    to="/dashboard/product/add"
                                    className="btn inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                    <svg className="-ml-0.5 sm:mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" /></svg>
                                    <span className="hidden sm:block">Add Product</span>
                                </Link>
                            </span>
                        </div>

                 
					
						<div className="overflow-x-auto">
							<table className="table table-zebra">
								<thead>
									<tr className="text-center bg-neutral text-neutral-content">
										<th>ID</th>
										<th>Name</th>
										<th>Description</th>
										<th>Price</th>
										<th>Availability</th>
										<th colSpan="2">Actions</th>
									</tr>
								</thead>
	
								<tbody>
									{products.map(product => (
										<tr key={product._id} className="hover text-center">
											<td>{product._id}</td>
											<td>{product.name}</td>
											<td>{product.description}</td>
											<td>{product.price}</td>
											<td className={product.isActive ? "text-success" : "text-danger"}>
												{product.isActive ? "Available" : "Unavailable"}
											</td>
											<td>
                                                {/* Link Button to edit-product */}
                                                <Link to={`/dashboard/edit-product/${product._id}`} className="btn btn-primary hover:btn-secondary">
                                                    <svg className="-ml-0.5 md:mr-1.5 h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" /></svg>
                                                    <span className="hidden md:block text-white">Edit</span>
                                                </Link>
											</td>
											<td>
												<ArchiveProduct 
                                                    product={product._id} 
                                                    isActive={product.isActive} 
                                                    fetchProducts={fetchProducts}
                                                />
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</>
				)}
				{tab === 'users' && (
                    <>
                        <div className=" flex lg:ml-4 lg:mt-0 items-center justify-center mb-5">
                            <h2 className="text-2xl sm:text-3xl text-primary text-center font-bold">User Dashboard</h2>
                            {/* <span className="sm:block mr-5">
                                <Link
                                    to="/dashboard/add-product"
                                    className="btn inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                    <svg className="-ml-0.5 sm:mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" /></svg>
                                    <span className="hidden sm:block">Add Product</span>
                                </Link>
                            </span> */}
                        </div>

                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                <thead>
                                    <tr className="text-center bg-neutral text-neutral-content">
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th colSpan="2">Actions</th>
                                    </tr>
                                </thead>
    
                                <tbody>
                                    {users.map(user => (
                                        <tr key={user._id} className="hover text-center">
                                            <td>{user._id}</td>
                                            <td>{user.firstname} {user.lastname}</td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td className={user.isAdmin ? "text-primary" : "text-secondary"}>
                                                {user.isAdmin ? "Admin" : "Customer"}
                                            </td>
                                            <td>
                                               {/* Temporary Button */}
                                                <SetUserRole 
                                                    user={user._id} 
                                                    isAdmin={user.isAdmin} 
                                                    fetchUsers={fetchUsers}
                                                />
                                            </td>
                                            <td>
                                               {/* Temporary Button */}
                                                <ArchiveProduct 
                                                    product={user._id} 
                                                    isActive={user.isActive} 
                                                    fetchUsers={fetchProducts}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
				)}
				{tab === 'orders' && (
				<>
					<div className=" flex lg:ml-4 lg:mt-0 items-center justify-between mb-5">
                        <h2 className="text-2xl sm:text-3xl text-primary text-center font-bold flex-grow sm:ml-20">Order Dashboard</h2>
                        {/* <span className="sm:block mr-5">
                             <Link
                                 to="/dashboard/add-product"
                                 className="btn inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                 <svg className="-ml-0.5 sm:mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" /></svg>
                                 <span className="hidden sm:block">Add Product</span>
                             </Link>
                         </span> */}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table table-zebra">
                            <thead>
                                <tr className="text-center bg-neutral text-neutral-content">
                                    <th>ID</th>
                                    <th>User</th>
                                    <th>Status</th>
                                    <th>Items</th>
                                    <th>Availability</th>
                                    <th colSpan="2">Actions</th>
                                </tr>
                            </thead>
 
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id} className="hover text-center">
                                        <td>{order._id}</td>
                                        <td>{order.userId.email}</td>
                                        <td>{order.status}</td>
                                        <td>₱{order.totalPrice}</td>
                                        {/* <td className={order.isActive ? "text-success" : "text-danger"}>
                                             {order.isActive ? "Available" : "Unavailable"}
                                        </td> */}
                                        <td>
                                             {/* Link Button to edit-product */}
                                             {/* <Link to={`/dashboard/edit-product/${product._id}`} className="btn btn-primary hover:btn-secondary">
                                                 <svg className="-ml-0.5 md:mr-1.5 h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" /></svg>
                                                 <span className="hidden md:block text-white">Edit</span>
                                             </Link> */}
                                        </td>
                                        <td>
                                             {/* <ArchiveProduct 
                                                 product={product._id} 
                                                 isActive={product.isActive} 
                                                 fetchProducts={fetchProducts}
                                             /> */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
				)}
			</div>
		);
	}

    return (
        isAdmin ? (
            <>
              <DashboardTabs selectedTab={selectedTab} handleTabChange={handleTabChange} />
              <DashboardContent tab={selectedTab} />
            </>
        ) : (
            <Navigate to="/shop" />
        )
    );
}