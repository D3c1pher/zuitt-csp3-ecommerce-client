import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CartItemCard from '../components/CartItemCard';
import Checkout from '../components/Checkout';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);

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
          if (data.message === 'Cart is empty') {
            setIsEmpty(true);
            toast.info('Cart is empty');
          } else {
            setIsEmpty(false);
            setCart(data.cart);
            setTotal(data.cart.totalPrice);
          }
        } else {
          setIsEmpty(true); 
          toast.error(data.message);
        }
        
      } catch (err) {
        console.error('Error fetching cart: ', err);
        setIsEmpty(true);
        toast.error('Internal Server Error!');
      }
    };

    fetchCart();
  }, []);

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`${apiUrl}/b3/cart/${productId}/removeFromCart`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (response.ok) {
        setCart(data.cart);
        setTotal(data.cart.totalPrice);
        toast.info('Product removed from cart');

        if (data.cart.cartItems.length === 0) {
          setIsEmpty(true);
        }
      } else {
        toast.error(data.message);
      }

    } catch (err) {
      console.error('Error removing product from cart: ', err);
      toast.error('Internal Server Error!');
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch(`${apiUrl}/b3/cart/clearCart`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (response.ok) {
        setIsEmpty(true);
        setCart(null);
        setTotal('');
        toast.info('Cart cleared successfully');
      } else {
        toast.error(data.message);
      }

    } catch (err) {
      console.error('Error clearing cart: ', err);
      toast.error('Internal Server Error!');
    }
  };

  return (
    <>
      {/* If Empty Cart */}
      { isEmpty ? (
        <div className="h-screen justify-center items-center bg-base-100">
          <div className="px-10 text-5xl font-black tracking-wider pt-28">
              <div className="divider">CART IS EMPTY</div>
          </div>
          <div className="flex justify-center items-center bg-base-100 pt-20 opacity-20">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-48 h-48"><path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" /></svg>
          </div>
        </div>
      ) : (
        <div className="texture px-4 sm:px-6 lg:px-10 bg-base-100">

          {/* Cart Title */}
          <h1 className="text-5xl font-black tracking-wider text-primary pt-10 px-5 text-center">MY CART</h1>

          <div className="divider divider-primary px-5"></div>

          {/* Cart Main */}
          <div className="lg:col-span-3 lg:px-20 pb-10">
            <div className="grid grid-cols-1 gap-8 items-center sm:px-8 sm:mx-8 md:px-12 lg:px-20 md:mx-12 lg:mx-20">

              {/* Cart Item List */}
              {cart && cart.cartItems && cart.cartItems.map(item => (
                <CartItemCard cartItemProp={item} removeFromCart={removeFromCart} key={item._id} />
              ))}

              <div className="divider divider-primary px-5"></div>

              <div className="flex items-center justify-between px-5">

                {/* Total Price */}
                <p className="text-3xl font-bold">Total Price : <span className="text-secondary">₱{total}</span></p>

                <div className="block sm:flex">
                  {/* Clear Cart */}
                  <button onClick={clearCart} className="btn btn-lg btn-error rounded-xl text-white m-2">Clear Cart</button>
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