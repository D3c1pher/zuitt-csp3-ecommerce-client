import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function UserProfile() {
  const [details,setDetails] = useState({});

  const token = localStorage.getItem('token');
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiUrl}/users/details`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();
      
        if (typeof data.user._id !== "undefined") {
          setDetails(data.user);
        } else if (data.error === "User not found") {
          toast.error('User not found');
        } else {
          toast.error('Something went wrong');
        }
      } catch (error) {
        console.error("Error fetching user details: ", error);
      }
    }

    fetchUserData();
  }, []);

  return (
    <div className="py-10 sm:px-20 my-5 sm:mx-10">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-bold leading-7">Profile Information | <Link to="/account" className="font-normal text-primary hover:text-secondary tracking-wide">Edit</Link></h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">User details and account information</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6">Full name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">{details.firstname} {details.lastname}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6">Username</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">{details.username}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6">Email address</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">{details.email}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6">About</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
              Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
              qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
              pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6">Address</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">{details.address}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6">Mobile Number</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">{details.mobileNo}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}