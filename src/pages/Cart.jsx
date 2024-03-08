import React, { useEffect, useState } from 'react';
import CartItemCard from '../components/CartItemCard';
import Checkout from '../components/Checkout';

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState('');

  const token = localStorage.getItem('token');
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`${apiUrl}/b3/cart/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setCart(data.cart);
          setTotal(data.cart.totalPrice);
          console.log(data.cart);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error('Error fetching cart: ', err);
      }
    };

    fetchCart();
  }, []);

  return (
    <>
      {/* If Empty Cart */}
      {cart && cart.cartItems && cart.cartItems.length === 0 ? (
        <div>Cart is empty</div>
      ) : (
        // Cart Page
        <div className="texture mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 bg-base-100">

          {/* Cart Title */}
          <h1 className="text-4xl font-bold tracking-tight text-primary pt-10 px-5 text-center">MY CART</h1>

          <div className="divider divider-primary px-5"></div>

          {/* Cart Main */}
          <div className="lg:col-span-3 lg:px-20 pb-10">
            <div className="grid grid-cols-1 gap-8 items-center sm:px-8 sm:mx-8 md:px-12 lg:px-20 md:mx-12 lg:mx-20">

              {/* Cart Item List */}
              {cart && cart.cartItems && cart.cartItems.map(item => (
                <CartItemCard cartItemProp={item} key={item._id} />
              ))}

              <div className="divider divider-primary px-5"></div>

              <div className="flex items-center justify-between px-5">

                {/* Total Price */}
                <p className="text-3xl font-bold">Total Price : <span className="text-secondary">₱{total}</span></p>

                <div className="block sm:flex">
                  {/* Clear Cart */}
                  <button className="btn btn-lg btn-error rounded-xl text-white m-2">Clear Cart</button>
                  {/* Checkout Cart */}
                  <Checkout />
                </div>

              </div>

              <div className="divider divider-primary px-5"></div>

            </div>
          </div>
          
        </div>
      )}
    </>
  );
}