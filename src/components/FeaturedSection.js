import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import FeaturedProduct from './FeaturedProduct';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

export default function FeaturedSection() {
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${apiUrl}/products/active`);
        const data = await response.json();

        const numbers = [];
        const featured = [];

        const generateRandomNums = () => {
          let randomNum = Math.floor(Math.random() * data.products.length);

          if (numbers.indexOf(randomNum) === -1) {
            numbers.push(randomNum);
          } else {
            generateRandomNums();
          }
        };

        for (let i = 0; i < 4; i++) {
          generateRandomNums();
          featured.push(
            <FeaturedProduct 
              data={data.products[numbers[i]]} 
              key={data.products[numbers[i]]._id} 
            />
          );
        }

        setPreviews(featured);
      } catch (err) {
        console.error('Error in displaying featured products: ', err);
        toast.error('Internal Server Error!');
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 lg:max-w-7xl lg:px-8 pb-14">
      <h2 
        className="text-2xl font-bold tracking-tight"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        Featured Products
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {previews}
      </div>
    </div>
  );
}
