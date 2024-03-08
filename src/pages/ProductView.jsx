import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import UserContext from "../UserContext";

// Data Placeholders
const product = {
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: '1Gray', class: 'bg-gray-400', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-black', selectedClass: 'ring-gray-900' },
  ],
  highlights: [
    'lorem ipsum dolor sit amet, consectetur adip',
    'lorem ipsum dolor sit amet, consectetur adip',
    'lorem ipsum dolor sit amet, consectetur adip',
    'lorem ipsum dolor sit amet, consectetur adip',
  ],
  details:
    'Lorem ipsum dolor sit amet, consectetur adip dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet. Lorem ipsum dolor sit amet, consectetur adip dolor sit amet dolor sit amet dolor sit amet dolor sit amet dolor sit amet.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductView() {
  const { user } =  useContext(UserContext);

	const { productId } = useParams();

  const isAuthenticated = user && user.id !== null;

  // const [image, setImage] = useState([]);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
	const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(product.colors[0]);

  const token = localStorage.getItem('token');
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/b3/products/${productId}`);
        const data = await response.json();
      
        setName(data.product.name);
        setDescription(data.product.description);
        setCategory(data.product.category);
        setPrice(data.product.price);
        setQuantity(data.product.quantity);
        // setImage(data.product.image);
        
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [productId]);

  const handleIncreaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const addToCart = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/b3/cart/addToCart`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          productId: productId,
          quantity: quantity
        })
      });
      const data = await response.json();

      if (response.ok) {
        alert("Product successfully created")

        navigate("/shop");
    } else {
        alert(data.message);
    }

    } catch (err) {
      console.error(err);
      alert("Internal Server Error")
    }
  }

  return (
    <div className="bg-base-100 pt-6 pb-8">
      <div className="container">
      
        {/* Beeadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol role="list" className="flex max-w-2xl items-center space-x-2 px-10">
            <li>
              <div className="flex items-center">
                <a href="/shop" className="mr-2 text-md font-medium">
                  Shop
                </a>
                <svg
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <a href="/shop" className="mr-2 text-md font-medium">
                  {category.name}
                </a>
                <svg
                  width={16}
                  height={20}
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li className="text-md">
              <a href="#" aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {name}
              </a>
            </li>
          </ol>
        </nav> 

        <div className="divider divider-primary py-5 px-10"></div>

        {/* Product */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-10 items-center">

          {/* Image placeholder */}
          <div className="bg-gradient-to-br from-black/30 to-black/20 rounded-3xl relative h-[360px] w-auto flex">
          </div>

          {/* Product info */}
          <div className="lg:col-span-3 lg:px-10">
            
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl py-1">{name}</h1>
            <p className="font-sm text-base py-1">{description}</p>
            <p className="font-bold text-3xl tracking-tight py-1">₱ {price}</p>

            {/* Reviews */}
            <div className="mt-5">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-primary' : 'text-gray-200',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a href={reviews.href} className="ml-3 text-sm font-medium text-primary hover:text-secondary">
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

            <form onSubmit={e => addToCart(e)} className="mt-10">
              
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium">Color</h3>
                <RadioGroup value={color} onChange={setColor} className="mt-4">
                  <div className="flex items-center space-x-3">
                    {product.colors.map((color) => (
                      <RadioGroup.Option
                        key={color.name}
                        value={color}
                        className={({ active, checked }) =>
                          classNames(
                            color.selectedClass,
                            active && checked ? 'ring ring-offset-1 ring-primary' : '',
                            !active && checked ? 'ring-2' : '',
                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-1 focus:outline-none bg-gray-300'
                          )
                        }
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            color.class,
                            'h-8 w-8 rounded-full border border-black border-opacity-10'
                          )}
                        />
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Quantity */}
              <div className="mt-10">
                <div className="items-center justify-between">
                  <h3 className="text-sm font-medium">Quantity</h3>
                  <div className="flex items-center mt-4">
                    <button
                      type="button" // Specify button type to prevent form submission
                      onClick={handleDecreaseQuantity}
                      className="bg-gray-200 text-gray-700 px-3 py-1"
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      value={quantity} 
                      placeholder="0" 
                      className="input input-sm text-center w-[60px]" 
                      onChange={(e) => {
                        const value = parseInt(e.target.value, 10);
                        if (!isNaN(value) || e.target.value === '') {
                          setQuantity(value);
                        } else {
                          setQuantity(1); 
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleIncreaseQuantity}
                      className="bg-gray-200 text-gray-700 px-3 py-1"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {isAuthenticated ? (
                /* Add to Cart Button */
                <button
                  type="submit"
                  className="btn btn-primary hover:btn-secondary mt-10 flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 font-bold focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  ADD TO CART
                </button>
              ) : (
                /* Link to Login */
                <Link
                  to="/login"
                  className="btn btn-primary hover:btn-secondary mt-10 flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 font-bold focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  SIGN IN TO SHOP
                </Link>
              )}
            </form>

          </div>
        </div>

        <div className="divider divider-primary py-5 px-10"></div>

        <div className="px-10 mb-10 items-center">
          {/* Details */}
          <div className="mt-5">
            <h2 className="text-sm font-medium">Details</h2>
            <div className="mt-4 space-y-6">
              <p className="text-sm">{product.details}</p>
            </div>
          </div>

          {/* Highlights */}
          <div className="mt-10">
            <h3 className="text-sm font-medium">Highlights</h3>
            <div className="mt-4">
              <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                {product.highlights.map((highlight) => (
                  <li key={highlight}>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  )
}