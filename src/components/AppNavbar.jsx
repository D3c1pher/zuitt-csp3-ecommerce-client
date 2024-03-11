import React, { Fragment, useContext, useState } from 'react'
import { Link } from 'react-router-dom'; 
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline'
import CartIcon from './CartIcon';
import UserContext from "../UserContext";
import LogoImg from '../assets/inspired-weaver-logo-color.png'

const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '/shop',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
        },
        {
          name: 'Featured Products',
          href: '/shop',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '/shop' },
            { name: 'Shirts', href: '/shop' },
            { name: 'Sweaters', href: '/shop' },
            { name: 'Jackets', href: '/shop' },
            { name: 'Bottoms', href: '/shop' },
            { name: 'Pants', href: '/shop' },
            { name: 'Shorts', href: '/shop' },
            { name: 'Browse All', href: '/shop' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '/shop' },
            { name: 'Bags', href: '/shop' },
            { name: 'Hats', href: '/shop' },
            { name: 'Gloves', href: '/shop' },
            { name: 'Socks', href: '/shop' },
            { name: 'Belts', href: '/shop' },
          ],
        },
        {
          id: 'others',
          name: 'Others',
          items: [
            { name: 'Featured', href: '/shop' },
            { name: 'Collections', href: '/shop' },
            { name: 'On Sale', href: '/shop' },
            { name: 'Promos', href: '/shop' },
          ],
        },
      ],
    },
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          href: '/shop',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
        },
        {
          name: 'Featured Products',
          href: '/shop',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', href: '/shop' },
            { name: 'Shirts', href: '/shop' },
            { name: 'Sweaters', href: '/shop' },
            { name: 'Jackets', href: '/shop' },
            { name: 'Bottoms', href: '/shop' },
            { name: 'Pants', href: '/shop' },
            { name: 'Shorts', href: '/shop' },
            { name: 'Browse All', href: '/shop' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', href: '/shop' },
            { name: 'Bags', href: '/shop' },
            { name: 'Hats', href: '/shop' },
            { name: 'Gloves', href: '/shop' },
            { name: 'Socks', href: '/shop' },
            { name: 'Belts', href: '/shop' },
          ],
        },
        {
          id: 'others',
          name: 'Others',
          items: [
            { name: 'Featured', href: '/shop' },
            { name: 'Collections', href: '/shop' },
            { name: 'On Sale', href: '/shop' },
            { name: 'Promos', href: '/shop' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Discover', href: '/discover' },
    { name: 'Support', href: '/support' },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AppNavbar() {
  const [open, setOpen] = useState(false)

  const { user } = useContext(UserContext);

  const isAdmin = user && user.isAdmin;
  const isAuthenticated = user && user.id !== null;

  return (
    <div className="fixed top-0 w-full z-50 bg-base-100 shadow-lg">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
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
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-base-100 pb-12 shadow-xl mt-[104px]">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected ? 'border-primary text-primary' : 'border-transparent',
                              'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <Tab.Panel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div key={item.name} className="group relative text-sm">
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img src={item.imageSrc} className="object-cover object-center" />
                              </div>
                              <a href={item.href} className="mt-6 block font-medium">
                                <span className="absolute inset-0 z-10" aria-hidden="true" />
                                {item.name}
                              </a>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                        {category.sections.map((section) => (
                          <div key={section.name}>
                            <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium">
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <a href={item.href} className="-m-2 block p-2 text-content opacity-80 hover:text-primary">
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root hover:text-primary">
                      <a href={page.href} className="-m-2 block p-2 font-medium">
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

                { !isAuthenticated && (
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <a href="/login" className="-m-2 block p-2 font-medium hover:text-primary">
                      Sign in
                    </a>
                  </div>
                  <div className="flow-root">
                    <a href="/register" className="-m-2 block p-2 font-medium hover:text-primary">
                      Sign up
                    </a>
                  </div>
                </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-base-100">
        <p className="flex h-10 items-center justify-center bg-secondary px-4 text-sm font-medium text-white sm:px-6 lg:px-8">
          Get free delivery on orders over ₱5000
        </p>

        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-base-100 p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <a href="/">
                  <img
                    className="h-12 w-auto hover:opacity-90"
                    src={LogoImg}
                  />
                </a>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? 'border-primary text-primary'
                                  : 'border-transparent hover:text-primary',
                                'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Popover.Panel className="absolute inset-x-0 top-full text-sm">
    
                              <div className="absolute inset-0 top-1/2 bg-base-100 shadow" aria-hidden="true" />

                              <div className="relative bg-base-100">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                                    <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                      {category.featured.map((item) => (
                                        <div key={item.name} className="group relative text-base sm:text-sm">
                                          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              className="object-cover object-center"
                                            />
                                          </div>
                                          <a href={item.href} className="mt-6 block font-medium">
                                            <span className="absolute inset-0 z-10" aria-hidden="true" />
                                            {item.name}
                                          </a>
                                          <p aria-hidden="true" className="mt-1">
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                      {category.sections.map((section) => (
                                        <div key={section.name}>
                                          <p id={`${section.name}-heading`} className="font-medium">
                                            {section.name}
                                          </p>
                                          <ul
                                            role="list"
                                            aria-labelledby={`${section.name}-heading`}
                                            className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                          >
                                            {section.items.map((item) => (
                                              <li key={item.name} className="flex">
                                                <a href={item.href} className="hover:text-primary">
                                                  {item.name}
                                                </a>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <a
                      key={page.name}
                      href={page.href}
                      className="flex items-center text-sm font-medium hover:text-primary"
                    >
                      {page.name}
                    </a>
                  ))}
                </div>
              </Popover.Group>

              <div className="ml-auto flex items-center">
                
                { !isAuthenticated && (
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    <a href="/login" className="text-sm font-medium hover:text-primary">
                      Sign in
                    </a>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <a href="/register" className="text-sm font-medium hover:text-primary">
                      Sign up
                    </a>
                  </div>
                )}

                {/* Theme Button */}
                <div className="flex lg:ml-6">
                  <label className="swap swap-rotate btn btn-ghost btn-circle">
                    <input type="checkbox" className="theme-controller" value="night" />
                    {/* Sun icon */}
                    <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                    {/* Moon icon */}
                    <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
                  </label>
                </div>

                {/* Cart */}
                { isAuthenticated && !isAdmin && (
                  <div className="ml-4 flow-root lg:ml-6">
                    <CartIcon />
                  </div>
                )}
                
                {/* Profile Dropdown */}
                {isAuthenticated && (
                <div className="dropdown dropdown-end">
                  {/* Profile Button */}
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ml-4">

                    <UserIcon className="h-5 w-5" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />

                  </div>
                  {/* Profile Dropdown Content */}
                  <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li>
                        <Link 
                            to="/profile"
                            className="justify-between"
                        >
                            Profile
                            <span className="badge badge-secondary badge-outline">WIP</span>
                        </Link>
                    </li>
                    <li>
                      <Link to="/account">
                        Account
                        <span className="badge badge-secondary badge-outline">WIP</span>
                      </Link>
                    </li>
                    {
                      isAdmin ? (
                        <li>
                          <Link to="/dashboard">Dashboard</Link>
                        </li>
                      ) : (
                        <li>
                          <Link to="/my-orders">Orders</Link>
                        </li>
                      )
                    }
                    <li><Link to="/logout">Logout</Link></li>
                  </ul>
                </div>
              )}

              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}