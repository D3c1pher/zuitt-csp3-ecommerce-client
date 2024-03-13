import React from "react";
import { Link } from "react-router-dom";
import Placeholder01 from '../assets/placeholder-01.jpg'
import Placeholder02 from '../assets/placeholder-02.jpg'
import Placeholder03 from '../assets/placeholder-03.jpg'
import Placeholder04 from '../assets/placeholder-04.jpg'

export default function FeaturedProduct(props) {
  const { data } = props;
  const { _id, name, price, category } = data;
  const { name: categoryName } = category;

  let imageSrc, color;

  switch (categoryName) {
    case 'Shirts':
      imageSrc = Placeholder01;
      color = 'Navy';
      break;
    case 'Sweaters':
      imageSrc = Placeholder02;
      color = 'Natural';
      break;
    case 'Tops':
      imageSrc = Placeholder03;
      color = 'Brown';
      break;
    case 'Jackets':
      imageSrc = Placeholder04;
      color = 'White';
      break;
    default:
      imageSrc = Placeholder01;
      color = 'Black';
      break;
  }

  return (
    <div 
      key={_id} 
      className="group relative"    
      data-aos="fade-up"
      data-aos-duration="2000"
    >
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={imageSrc}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          alt={name}
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-500">
            <Link to={`/products/${_id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {name}
            </Link>
          </h3>
          <p className="mt-1 text-sm">{color}</p>
        </div>
        <p className="text-sm font-medium">₱{price}</p>
      </div>
    </div>
  );
}