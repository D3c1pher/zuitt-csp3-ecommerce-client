
// export default function ProductView(){

// 	const { user } =  useContext(UserContext);

// 	const { productId } = useParams();

// 	const navigate = useNavigate();

//   const [image, setImage] = useState([]);
// 	const [name, setName] = useState('');
// 	const [description, setDescription] = useState('');
//   const [category, setCategory] = useState('');
// 	const [price, setPrice] = useState(0);
//   const [quantity, setQuantity] = useState(0);

// 	useEffect(() => {
// 		fetch(`http://localhost:4003/b3/products/${productId}`)
// 			.then(res => res.json())
// 			.then(data => {

// 				setName(data.product.name);
// 				setDescription(data.product.description);
// 				setPrice(data.product.price);
//         setCategory(data.product.category);
//         setImage(data.product.image);

// 			})

// 	}, [courseId]);


// 	return (

// 	)

// }

import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import UserContext from "../UserContext";

const product = {
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    // {
    //   src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
    //   alt: 'Model wearing plain black basic tee.',
    // },
    // {
    //   src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
    //   alt: 'Model wearing plain gray basic tee.',
    // },
    // {
    //   src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
    //   alt: 'Model wearing plain white basic tee.',
    // },
  ],
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-400', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-black', selectedClass: 'ring-gray-900' },
  ],
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductView() {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  // const [selectedSize, setSelectedSize] = useState(product.sizes[2])

  const { user } =  useContext(UserContext);

	const { productId } = useParams();

	const navigate = useNavigate();

  const [image, setImage] = useState([]);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
	const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

	useEffect(() => {
		fetch(`http://localhost:4003/b3/products/${productId}`)
			.then(res => res.json())
			.then(data => {

        console.log(data.product)
				setName(data.product.name);
				setDescription(data.product.description);
				setPrice(data.product.price);
        setCategory(data.product.category);
        setImage(data.product.image);

			})

	}, [productId]);

  return (
    <div className="bg-base-100">
      <div className="pt-6">

        {/* Beeadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            {/* {product.breadcrumbs.map((breadcrumb) => ( */}
              <li>
                <div className="flex items-center">
                  <a href="/shop" className="mr-2 text-sm font-medium">
                    shop
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
                  <a href="#" className="mr-2 text-sm font-medium">
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
            {/* ))} */}
            {/* <li className="text-sm">
              <a href={product.href} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                {product.name}
              </a>
            </li> */}
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={product.images[0].src}
              alt={product.images[0].alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
          {/* <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={product.images[1].src}
                alt={product.images[1].alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={product.images[2].src}
                alt={product.images[2].alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={product.images[3].src}
              alt={product.images[3].alt}
              className="h-full w-full object-cover object-center"
            />
          </div> */}
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="font-medium text-3xl tracking-tight">₱ {price}</p>

            {/* Reviews */}
            <div className="mt-6">
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

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium">Color</h3>

                <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-4">
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
                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
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

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium">Quantity</h3>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary hover:btn-secondary mt-10 flex w-full items-center justify-center rounded-md border border-transparent px-8 py-3 font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Add to bag
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <div className="space-y-6">
                <p className="text-base">{description}</p>
              </div>
            </div>

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

            <div className="mt-10">
              <h2 className="text-sm font-medium">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm">{product.details}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}