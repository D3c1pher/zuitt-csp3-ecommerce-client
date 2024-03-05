import { useContext, useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import LogoImgColor from '../assets/inspired-weaver-logo-color.png';

export default function Login() {
    const { user, setUser } = useContext(UserContext);

    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [emailOrUsernameError, setemailOrUsernameError] = useState('');
    const [passwordError, setpasswordError] = useState('');

    const authenticate = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4003/b3/users/login', {
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
                setemailOrUsernameError('Email or username is invalid');
                setpasswordError('');
            } else if (data.message === "Password is incorrect") {
                setemailOrUsernameError('');
                setpasswordError('Password is incorrect');
            } else if (data.message === "Forbidden Access! Your account is not active.") {
                Swal.fire({
                    title: "Forbidden Access!",
                    text: "Your account is not active.",
                    icon: "error"
                });
            } else if (data.message === "Forbidden Access! Your account has been blocked.") {
                Swal.fire({
                    title: "Forbidden Access!",
                    text: "Your account has been blocked.",
                    icon: "error"
                });  
            } else if (typeof data.access !== "undefined") {
                localStorage.setItem("token", data.access);
                retrieveUserDetails(data.access);

                setemailOrUsernameError('');
                setpasswordError('');

                Swal.fire({
                    title: "Login successful!",
                    text: "Welcome to Zuitt!",
                    icon: "success"
                });
            } else {
                Swal.fire({
                    title: "Internal Server Error!",
                    text: "Please try again later.",
                    icon: "error"
                });
            }

            setEmailOrUsername('');
            setPassword('');

        } catch (err) {
            console.error('Error occurred while logging in: ', err);
            Swal.fire({
                title: "Internal Server Error!",
                text: "Please try again later.",
                icon: "error"
            });
        }
    }

    const retrieveUserDetails = async (token) => {
        try {
            const response = await fetch('http://localhost:4003/b3/users/details', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            setUser({
                id: data.user._id,
                isAdmin: data.user.isAdmin
            });

        } catch (error) {
            console.error('Error occurred while retrieving user details: ', error);
        }
    }
    
    useEffect(() => {
        setIsActive(emailOrUsername !== '' && password !== '');
    }, [emailOrUsername, password]);

    if (user && user.id !== null && !user.isAdmin) {
        return <Navigate to="/shop" />;
    } else if (user && user.id !== null && user.isAdmin) {
        return <Navigate to="/dashboard" />;
    } else {
        return (
            <>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-lg bg-white rounded-lg sm:shadow-md p-10">
    
                        {/* Company Logo */}
                        <img
                            className="mx-auto h-20 w-auto"
                            src={LogoImgColor}
                            alt="Your Company"
                        />
    
                        {/* Header Text */}
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
    
                        {/* Login Form */}
                        <form onSubmit={authenticate}>
                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                <label className="form-control w-full max-w-sm">
                                    
                                    {/* Input Email or Username */}
                                    <div className="label">
                                        <span className="label-text text-primary-content">Email / Username</span>
                                        <span className="label-text-alt text-error">{emailOrUsernameError}</span>
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="Enter Email or Username" 
                                        className="input input-bordered input-primary w-full max-w-sm rounded-xl"
                                        value={emailOrUsername} 
                                        onChange={(e) => setEmailOrUsername(e.target.value)}
                                        required
                                    />
                                    
                                    {/* Input Password */}
                                    <div className="label">
                                        <span className="label-text text-primary-content">Password</span>
                                        <span className="label-text-alt text-error">{passwordError}</span>
                                    </div>
                                    <input 
                                        type="password" 
                                        placeholder="Enter Password" 
                                        className="input input-bordered input-primary w-full max-w-sm rounded-xl"
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
                                <div>
                                    <button
                                        type="submit"
                                        className="btn flex w-full justify-center rounded-md bg-primary px-3 py-1.5 mt-5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                        disabled={!isActive}
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