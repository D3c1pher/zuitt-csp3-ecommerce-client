import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Link, Navigate } from "react-router-dom";
import { toast } from 'react-toastify';
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
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const isAdmin = user && user.id !== null && user.isAdmin; 

    const fetchProducts = useCallback(async () => {
        try {
            const response = await fetch(`${apiUrl}/products/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();

            if (!response.ok) {
                toast.error('Failed to fetch products');
                throw new Error('Failed to fetch products');
            }

            if (Array.isArray(data.products)) {
                setProducts(data.products);
            } else {
                setProducts([]);
            }

        } catch (err) {
            console.error('Error viewing products: ', err);
            toast.error('Internal Server Error!');
        }
    }, [apiUrl, token]);

    const fetchUsers = useCallback(async () => {
        try {
            const response = await fetch(`${apiUrl}/users/view-all-users`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();

            if (!response.ok) {
                toast.error('Failed to fetch users');
                throw new Error('Failed to fetch users');
            }

            if (Array.isArray(data.users)) {
                setUsers(data.users);
            } else {
                setUsers([]);
            }

        } catch (err) {
            console.error('Error viewing users: ', err);
            toast.error('Internal Server Error!');
        }
    }, [apiUrl, token]);

    const fetchOrders = useCallback(async () => {
        try {
            const response = await fetch(`${apiUrl}/orders/all-orders`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();

            if (!response.ok) {
                toast.error('Failed to fetch orders');
                throw new Error('Failed to fetch orders');
            }

            if (Array.isArray(data.orders)) {
                setOrders(data.orders);
            } else {
                setOrders([]);
            }

        } catch (err) {
            console.error('Error viewing orders: ', err);
            toast.error('Internal Server Error!');
        }
    }, [apiUrl, token]);
        
    useEffect(() => {
        fetchProducts();
        fetchUsers();
        fetchOrders();
    }, [fetchProducts, fetchUsers, fetchOrders]);

    const WorkInProgress = () => {
        toast.info('Work In Progress');
    }

    const DashboardTabs = ({ selectedTab, handleTabChange }) => {
        return (
            <nav className="w-full h-full bg-neutral text-white pt-5 pb-0">
                <div className="container mx-auto flex text-center justify-evenly">
                    <label className="block cursor-pointer w-full">
                        <input
                            type="radio"
                            className="hidden"
                            name="dashboard"
                            value="products"
                            checked={selectedTab === 'products'}
                            onChange={() => handleTabChange('products')}
                        />
                        <span className={`font-black px-6 py-5 ${selectedTab === 'products' ? 'text-primary' : 'hover:text-primary/80'}`}>
                            Products
                        </span>
                        <div className={`bg-primary mt-3 ${selectedTab === 'products' ? 'block text-primary' : 'hidden hover:bg-primary/80 hover:text-primary/80'} h-2`} />
                    </label>
                    <label className="block cursor-pointer w-full">
                        <input
                            type="radio"
                            className="hidden"
                            name="dashboard"
                            value="users"
                            checked={selectedTab === 'users'}
                            onChange={() => handleTabChange('users')}
                        />
                        <span className={`font-black px-6 py-5 ${selectedTab === 'users' ? 'text-primary' : 'hover:text-primary/80'}`}>
                            Users
                        </span>
                        <div className={`bg-primary mt-3 ${selectedTab === 'users' ? 'block text-primary' : 'hidden hover:bg-primary/80 hover:text-primary/80'} h-2`} />
                    </label>
                    <label className="block cursor-pointer w-full">
                        <input
                            type="radio"
                            className="hidden"
                            name="dashboard"
                            value="orders"
                            checked={selectedTab === 'orders'}
                            onChange={() => handleTabChange('orders')}
                        />
                        <span className={`font-black px-6 py-5 ${selectedTab === 'orders' ? 'text-primary' : 'hover:text-primary/80'}`}>
                            Orders
                        </span>
                        <div className={`bg-primary mt-3 ${selectedTab === 'orders' ? 'block text-primary' : 'hidden hover:bg-primary/80 hover:text-primary/80'} h-2`} />
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
                            <h2 className="text-2xl sm:text-3xl text-primary text-center font-bold flex-grow sm:ml-36">Product Dashboard</h2>
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
											<td className="px-8 max-w-xs md:max-w-md truncate">{product.description}</td>
											<td>₱{product.price.toFixed(2)}</td>
											<td className={product.isActive ? "text-success" : "text-danger"}>
												{product.isActive ? "Available" : "Unavailable"}
											</td>
											<td>
                                                <Link to={`/dashboard/edit-product/${product._id}`} className="btn btn-primary hover:btn-secondary">
                                                    <svg className="-ml-0.5 xl:mr-1.5 h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" /></svg>
                                                    <span className="hidden xl:block text-white">Edit</span>
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
                                                <SetUserRole 
                                                    user={user._id} 
                                                    isAdmin={user.isAdmin} 
                                                    fetchUsers={fetchUsers}
                                                />
                                            </td>
                                            <td>
                                                <button onClick={WorkInProgress} className="btn btn-primary hover:btn-secondary">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="-ml-0.5 xl:mr-1.5 h-5 w-5 text-white"><path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" /></svg>
                                                    <span className="hidden xl:block text-white">View Info</span>
                                                </button>
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
                        <h2 className="text-2xl sm:text-3xl text-primary text-center font-bold flex-grow">Order Dashboard</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr className="text-center bg-neutral text-neutral-content">
                                    <th>ID</th>
                                    <th>User</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
 
                            <tbody>
                                { orders.map(order => (
                                    <>
                                    <tr key={order._id} className="text-center bg-base-200 hover:bg-base-300">
                                        <td>{order._id}</td>
                                        <td>{order.userId.email}</td>
                                        <td className="text-success">{order.status}</td>
                                        <td>₱ {order.totalPrice.toFixed(2)}</td>
                                    </tr>
                                    <tr className="hover:bg-base-300">
                                        <td colSpan="6">
                                            <p className="text-sm font-bold sm:ml-10">Purchased Items :</p>
                                            <ul className="list-disc text-sm ml-20 mt-2">
                                                {order.productsOrdered.map(item => {
                                                    const product = products.find(product => product._id === item.productId);
                                                    if (product) {
                                                        return (
                                                            <li key={item._id}>
                                                                <p>{product.name} - Qty : {item.quantity}</p>
                                                            </li>
                                                        );
                                                    } else {
                                                        return null;
                                                    }
                                                })}
                                            </ul>
                                        </td>
                                    </tr>
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
				)}
			</div>
		);
	}
    
    if (isAdmin) {
        return (
            <>
                <DashboardTabs selectedTab={selectedTab} handleTabChange={handleTabChange} />
                <DashboardContent tab={selectedTab} />
            </>
        );
    } else {
        return <Navigate to="/shop" />;
    }
}