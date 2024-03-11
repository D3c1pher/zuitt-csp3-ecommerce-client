import React, { Fragment, useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import ProductCard from '../components/ProductCard';

// Data Placeholders
const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
  { name: 'New Arrivals', href: '#' },
  { name: 'Featured Products', href: '#' },
  { name: 'On Sale Products', href: '#' },
  { name: 'Special Promos', href: '#' },
]
const filters = [
  {
    id: 'clothing',
    name: 'Clothing',
    options: [
      { name: 'Tops', label: 'Tops', checked: false },
      { name: 'Shirts', label: 'Shirts', checked: false },
      { name: 'Sweaters', label: 'Sweaters', checked: false },
      { name: 'Jackets', label: 'Jackets', checked: false },
      { name: 'Bottoms', label: 'Bottoms', checked: false },
      { name: 'Pants', label: 'Pants', checked: false },
      { name: 'Shorts', label: 'Shorts', checked: false },
    ],
  },
  {
    id: 'accessories',
    name: 'Accessories',
    options: [
      { name: 'Watches', label: 'Watches', checked: false },
      { name: 'Bags', label: 'Bags', checked: false },
      { name: 'Hats', label: 'Hats', checked: false },
      { name: 'Gloves', label: 'Gloves', checked: false },
      { name: 'Socks', label: 'Socks', checked: false },
      { name: 'Belts', label: 'Belts', checked: false },
    ],
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Shop({productsData}) {
  const [products, setProducts] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {

      const token = localStorage.getItem('token');
      const apiUrl = process.env.REACT_APP_API_URL;

      try {
        const response = await fetch(`${apiUrl}/b3/products/active`, {
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
        console.error('Error in viewing products: ', err);
        toast.error('Internal Server Error!');
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    if (Array.isArray(productsData)) {
      const activeProducts = productsData.filter(product => product.isActive === true);
      setProducts(activeProducts);
    }
  }, [productsData]);

  const handleSearchByName = async () => {
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_URL;

    try {
      const response = await fetch(`${apiUrl}/b3/products/searchByName`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: searchQuery }),
      });

      if (!response.ok) {
        toast.error('Failed to search products by name');
        throw new Error('Failed to search products by name');
      }

      const data = await response.json();

      if (Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error('Error searching products by name: ', err);
      toast.error('Internal Server Error!');
    }
  }

  const handleSearchByPrice = async () => {
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_URL;
  
    try {
      let body = {};

      if (minPrice || maxPrice) {
        body = { minPrice, maxPrice };
      } else {
        const response = await fetch(`${apiUrl}/b3/products/active`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        if (!response.ok) {
          toast.error('Failed to fetch products');
          throw new Error('Failed to fetch products');
        }
  
        const data = await response.json();
        setProducts(data.products || []);
        return;
      }
  
      const response = await fetch(`${apiUrl}/b3/products/searchByPrice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        toast.error('Failed to search products by price');
        throw new Error('Failed to search products by price');
      }
  
      const data = await response.json();
  
      if (Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        setProducts([]);
      }
  
    } catch (err) {
      console.error('Error searching products by price: ', err);
      toast.error('Internal Server Error!');
    }
  }

  const handleSearch = async () => {
    if (searchQuery) {
      await handleSearchByName();
    } else if (minPrice || maxPrice) {
      await handleSearchByPrice();
    }
  };

  useEffect(() => {
    handleSearch();
  }, [minPrice, maxPrice]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="texture bg-base-100">
      <div>

        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-base-100 py-32 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium">Filters</h2>

                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-base-100 p-2"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  <div className="block px-5 pt-8">
                    <label className="block">
                      <span className="input-label font-bold my-2">Min Price :</span>
                      <input
                        type="number"
                        className="input input-primary my-2"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                      />
                    </label>
                    <label className="block">
                      <span className="input-label font-bold my-2">Max Price :</span>
                      <input
                        type="number"
                        className="input input-primary my-2"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="divider divider-primary px-5 py-2 opacity-60"></div>

                  {/* Filters */}
                  <form className="border-t border-gray-200">
                    <ul role="list" className="px-2 font-medium">
                      {subCategories.map((category) => (
                        <li key={category.name}>
                          <a href={category.href} className="block px-2 py-3 hover:text-primary">
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul>

                    <div className="divider divider-primary px-5 opacity-60"></div>

                    {filters.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-4">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-transparent px-2 hover:opacity-80">
                                <span className="font-medium">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>

                            <div className="divider divider-primary opacity-60"></div>

                            <Disclosure.Panel className="pt-3">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 opacity-75"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* MAIN SHOP */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Menu */}
          <div className="flex items-center justify-between pt-8">

            <div className="flex text-primary items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16"><path fillRule="evenodd" d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12A1.875 1.875 0 0 0 4.25 22.5h15.5a1.875 1.875 0 0 0 1.865-2.071l-1.263-12a1.875 1.875 0 0 0-1.865-1.679H16.5V6a4.5 4.5 0 1 0-9 0ZM12 3a3 3 0 0 0-3 3v.75h6V6a3 3 0 0 0-3-3Zm-3 8.25a3 3 0 1 0 6 0v-.75a.75.75 0 0 1 1.5 0v.75a4.5 4.5 0 1 1-9 0v-.75a.75.75 0 0 1 1.5 0v.75Z" clipRule="evenodd" /></svg>
              <h1 className="hidden sm:block text-4xl font-black tracking-wide ml-3 pt-2">SHOP</h1>
            </div>

            <label className="input input-bordered input-primary w-full min-w-xs max-w-lg flex items-center gap-2 mx-10">
              <input 
                type="text"
                className="grow"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress} 
              />
              <button type="button" className="hover:text-primary" onClick={handleSearch}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-6 h-6 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
              </button>
            </label>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium hover:opacity-80">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-base-100 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current ? 'font-medium' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              
            </div>
          </div>

          <div className="divider divider-primary"></div>

          {/* Shop Body */}
          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              
              {/* Filters */}
              <form className="hidden lg:block bg-base-100 p-10 rounded-lg shadow-xl">
              
                <div className="my-5">
                  <label>
                    <span className="input-label font-bold my-2">Min Price :</span>
                    <input
                      type="number"
                      className="input input-primary my-2"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </label>
                  <label>
                    <span className="input-label font-bold my-2">Max Price :</span>
                    <input
                      type="number"
                      className="input input-primary my-2"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </label>
                </div>
      
                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-transparent py-3 text-sm hover:opacity-80">
                            <span className="font-medium">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product List*/}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 gap-8 items-center">
                  {products.map(product => (
                          <ProductCard productsProp={product} key={product._id} />
                  ))}
                </div>
              </div>

            </div>
          </section>
        </main>
        
      </div>
    </div>
  );
}