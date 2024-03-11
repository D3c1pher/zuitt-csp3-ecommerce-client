import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Checkout() {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleCheckout = async () => {
    try {
      const response = await fetch(`${apiUrl}/b3/orders/checkout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (!response.ok) {
        toast.info('Cart is empty');
      } else {
        toast.info('Order placed successfully');
        navigate('/shop');
      }
      
    } catch (err) {
      console.error('Error during checkout: ', err);
      toast.error('Internal Server Error!');
    }
  }

  return (
    <button onClick={handleCheckout} className="btn btn-lg btn-primary hover:btn-secondary rounded-xl text-white hover:text-white m-2">Checkout</button>
  );
}