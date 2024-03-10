import React, { useState, useEffect } from 'react';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

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
          throw new Error('Failed to fetch orders');
          
        }
        
        setOrders(data.orders);
        
      } catch (err) {
        console.error('Error fetching orders:', err);
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

  return (
    // Cart Page
    <div className="texture bg-base-100">

    {/* Cart Title */}
    <h1 className="text-4xl font-bold tracking-tight text-primary pt-10 px-5 text-center">ORDER HISTORY</h1>

    <div className="divider divider-primary px-5"></div>

      <div className="pb-8 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
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
                      <p className="text-lg font-bold pt-2">Total: <span className="text-secondary">₱{order.totalPrice}</span></p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}