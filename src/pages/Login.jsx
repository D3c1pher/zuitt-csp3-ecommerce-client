import React, { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import LogoImgColor from '../assets/inspired-weaver-logo-color.png';

export default function Login() {
  const { user, setUser } = useContext(UserContext);

  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailOrUsernameError, setemailOrUsernameError] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [errorAlert, setErrorAlert] = useState(false);
  const [isForbidden, setIsForbidden] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;

  const authenticate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/b3/users/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailOrUsername: emailOrUsername,
            password: password
        })
      });

      const data = await response.json();

      if (data.message === "Email or username is invalid") {
        setemailOrUsernameError(data.message);
        setpasswordError('');
        setErrorAlert(true);
      } else if (data.message === "Password is incorrect") {
        setemailOrUsernameError('');
        setpasswordError(data.message);
        setErrorAlert(true);
      } else if (
        data.message === "Forbidden Access! Your account is not active." || data.message === "Forbidden Access! Your account has been blocked."
      ) {
        setIsForbidden(true);
      } else {
        localStorage.setItem("token", data.access);
        retrieveUserDetails(data.access);
        setemailOrUsernameError('');
        setpasswordError('');
        setErrorAlert(false);
      }

    } catch (err) {
      console.error('Error occurred while logging in: ', err);
      setErrorAlert(true);
    }
  }

  const retrieveUserDetails = async (token) => {
    try {
      const response = await fetch(`${apiUrl}/b3/users/details`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      setUser({
        id: data.user._id,
        isAdmin: data.user.isAdmin
      });

    } catch (err) {
      console.error('Error occurred while retrieving user details: ', err);
    }
  }

  if (isForbidden) {
    return <Navigate to="/403"/>;
  } else if (user && user.id !== null && !user.isAdmin) {
      return <Navigate to="/shop" />;
  } else if (user && user.id !== null && user.isAdmin) {
      return <Navigate to="/dashboard" />;
  } else {
    return (
      <>
        {/* Error Alert */}
        {errorAlert && (
          <div className="py-5 sm:px-5 md:px-10 lg:px-20">
            <div role="alert" className="alert alert-warning" close>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <span>Authentication Failed!</span>
            </div>
          </div>
        )}

        {/* Login */}
        <div className="flex h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-lg rounded-lg sm:shadow-md p-10 bg-base-100">

            {/* Company Logo */}
            <img
              className="mx-auto h-20 w-auto"
              src={LogoImgColor}
              alt="Your Company"
            />

            {/* Header Text */}
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
                Sign in to your account
            </h2>

            {/* Login Form */}
            <form onSubmit={authenticate}>
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <label className="form-control w-full max-w-sm">
                    
                  {/* Input Email or Username */}
                  <div className="label">
                    <span className="label-text">Email / Username</span>
                    <span className="label-text-alt text-error">{emailOrUsernameError}</span>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Enter Email or Username" 
                    className="input input-bordered input-primary flex w-full justify-stretch rounded-md max-w-sm"
                    value={emailOrUsername} 
                    onChange={(e) => setEmailOrUsername(e.target.value)}
                    required
                  />
                    
                  {/* Input Password */}
                  <div className="label">
                    <span className="label-text">Password</span>
                    <span className="label-text-alt text-error">{passwordError}</span>
                  </div>
                    <input 
                      type="password" 
                      placeholder="Enter Password" 
                      className="input input-bordered input-primary flex w-full justify-stretch rounded-md max-w-sm"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} 
                      required
                    />

                  {/* Forgot Password Link */}
                  <a href="#" className="label-text font-semibold text-primary hover:text-primary/80 mt-2">
                    Forgot password?
                  </a>
                </label>

                {/* Submit Button */}
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="btn btn-primary flex w-full justify-center rounded-md px-3 py-1.5 mt-5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" 
                  >
                    Sign in
                  </button>
                </div>

                {/* Sign Up Link */}
                <div>
                  <p className="mt-10 text-center text-sm text-gray-500">
                  Not a member?{' '}
                    <a href="/register" className="font-semibold leading-6 text-primary hover:text-primary/80">
                      Sign up and shop now
                    </a>
                  </p>
                </div>
              </div>
            </form>

          </div>    
        </div>
      </>
    );
  } 
}