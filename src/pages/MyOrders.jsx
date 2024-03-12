import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserContext from '../UserContext';

export default function MyOrders() {
  const { user } =  useContext(UserContext);

  const [orders, setOrders] = useState([]);

  const isAuthorized = user && user !== null;
  const isAdmin = isAuthorized && user.isAdmin;

  const token = localStorage.getItem('token');
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${apiUrl}/b3/orders/my-orders`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();

        if (!response.ok) {
          toast.error('Failed to fetch orders');
          throw new Error('Failed to fetch orders');
        }
        
        setOrders(data.orders);
        
      } catch (err) {
        console.error('Error fetching orders: ', err);
        toast.error('Internal Server Error!');
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  let orderNumber = 0;

  if (!isAuthorized || isAdmin) {
    return <Navigate to="/" />;
  } else {
    return (
      <>
          { orders.length === 0 ? (
            <div className="h-screen justify-center items-center bg-base-100">
              <div className="px-10 text-5xl font-black tracking-wider pt-28">
                  <div className="divider">ORDER IS EMPTY</div>
              </div>
              <div className="flex justify-center items-center bg-base-100 pt-20 opacity-20">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-48 h-48"><path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clipRule="evenodd" /></svg>
              </div>
            </div>
          ) : (
            <div className="texture px-4 sm:px-6 lg:px-10 bg-base-100">

              {/* Cart Title */}
              <h1 className="text-5xl font-black tracking-wider text-primary pt-10 px-5 text-center">ORDER HISTORY</h1>

              <div className="divider divider-primary px-5"></div>

              <div className="bg-base-100 rounded-b-lg">
                <ul>
                  {orders.map(order => {
                    orderNumber++;
                    return (
                      <li key={order._id}>
                        <div className={`bg-gray-500 text-gray-200 px-5 py-2 ${orderNumber === 1 ? 'rounded-t-lg' : ''}`}>
                          <h2><span className="font-bold">ORDER # {orderNumber} |</span> Purchased on: {formatDate(order.orderedOn)}</h2>
                        </div>
                        <div className="px-5 pt-3 pb-5">
                          <p className="font-bold">Items :</p>
                          <ul className="list-disc px-10">
                          {order.productsOrdered.map(item => (
                            <li key={item._id}>
                              <p>{item.productId.name}</p>
                            </li>
                          ))}
                          </ul>
                          <p className="font-bold pt-2">Status: <span className="text-secondary">{order.status}</span></p>
                          <p className="text-lg font-bold pt-2">Total: <span className="text-secondary">₱{order.totalPrice.toFixed(2)}</span></p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
      </>
    );
  }
}