import { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import LogoImgColor from '../assets/inspired-weaver-logo-color.png';

export default function Register() {
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobileNo: "",
        address: "",
        birthdate: ""
    });

    const registerUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4003/b3/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setFormData({
                    firstname: "",
                    lastname: "",
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    mobileNo: "",
                    address: "",
                    birthdate: ""
                });

                alert("Registration successful!");
                return <Navigate to="/login" />;
            } else if (data.errors) {
                setRegistrationError(data.errors.join('\n'));
            } else {
                setRegistrationError("Something went wrong.");
            }
        } catch (error) {
            console.error('Error registering user:', error.message);
            setRegistrationError("Error registering user");
        }
    };

    return(
        <>
                <div className="flex min-h-full flex-1 flex-col justify-center px-4 sm:px-2 py-12 lg:px-4 m-0 bg-base-200">
                    <div className="sm:mx-auto sm:w-full sm:max-w-4xl bg-base-100 rounded-lg sm:shadow-md py-16 px-20">
    
                        {/* Company Logo */}
                        <img
                            className="mx-auto h-20 w-auto"
                            src={LogoImgColor}
                            alt="Your Company"
                        />

                        <div className="mt-5 text-center">
                            {/* Header Text */}
                            <h2 className="text-2xl font-bold leading-9 tracking-tight text-primary">
                                Create your account
                            </h2>

                            {/* Already have an account */}
                            <p class="mt-2 text-sm">
                                Already have an account?
                                <a class="ml-1 text-secondary decoration-2 hover:underline font-medium" href="/login">
                                    Sign in here
                                </a>
                            </p>
                        </div>
    
                        {/* Register Form */}
                        <form className="form-control w-full max-w-8xl mt-10" onSubmit={registerUser}> 

                            {/* First Name Input */}
                            <label className="input input-bordered input-primary w-full flex items-center gap-2 rounded-xl mt-2 bg-base-200">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                <input 
                                    type="text" 
                                    className="grow" 
                                    placeholder="First Name"
                                    required 
                                />
                            </label>  

                            <div className="flex text-error mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" /></svg>
                                <span className="label-text text-error text-sm ml-1">Error Info</span> 
                            </div>

                            {/* Last Name Input */}
                            <label className="input input-bordered input-primary w-full flex items-center gap-2 rounded-xl mt-2 bg-base-200">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                <input 
                                    type="text" 
                                    className="grow" 
                                    placeholder="Last Name"
                                    required 
                                />
                            </label>    
                            <div className="flex text-error mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" /></svg>
                                <span className="label-text text-error text-sm ml-1">Error Info</span> 
                            </div>  

                            {/* Username Input */}
                            <label className="input input-bordered input-primary w-full flex items-center gap-2 rounded-xl mt-2 bg-base-200">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                                <input 
                                    type="text" 
                                    className="grow" 
                                    placeholder="Username"
                                    required 
                                />
                            </label>
                            <div className="flex text-error mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" /></svg>
                                <span className="label-text text-error text-sm ml-1">Error Info</span> 
                            </div> 

                            {/* Email Input */}
                            <label className="input input-bordered input-primary w-full flex items-center gap-2 rounded-xl mt-2 bg-base-200">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                <input 
                                    type="text" 
                                    className="grow" 
                                    placeholder="Email"
                                    required 
                                />
                            </label>
                            <div className="flex text-error mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" /></svg>
                                <span className="label-text text-error text-sm ml-1">Error Info</span> 
                            </div> 

                            {/* Password Input */}
                            <label className="input input-bordered input-primary w-full flex items-center gap-2 rounded-xl mt-2 bg-base-200">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                <input 
                                    type="password" 
                                    className="grow" 
                                    placeholder="Password"
                                    required 
                                />
                            </label>
                            <div className="flex text-error mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" /></svg>
                                <span className="label-text text-error text-sm ml-1">Error Info</span> 
                            </div> 

                            {/* Confirm Password Input */}
                            <label className="input input-bordered input-primary w-full flex items-center gap-2 rounded-xl mt-2 bg-base-200">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                <input 
                                    type="password" 
                                    className="grow" 
                                    placeholder="Confirm Password"
                                    required 
                                />
                            </label>
                            <div className="flex text-error mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" /></svg>
                                <span className="label-text text-error text-sm ml-1">Error Info</span> 
                            </div>  

                            {/* Mobile No Input */}
                            <label className="input input-bordered input-primary w-full flex items-center gap-2 rounded-xl mt-2 bg-base-200">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M10.5 18.75a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" /><path fillRule="evenodd" d="M8.625.75A3.375 3.375 0 0 0 5.25 4.125v15.75a3.375 3.375 0 0 0 3.375 3.375h6.75a3.375 3.375 0 0 0 3.375-3.375V4.125A3.375 3.375 0 0 0 15.375.75h-6.75ZM7.5 4.125C7.5 3.504 8.004 3 8.625 3H9.75v.375c0 .621.504 1.125 1.125 1.125h2.25c.621 0 1.125-.504 1.125-1.125V3h1.125c.621 0 1.125.504 1.125 1.125v15.75c0 .621-.504 1.125-1.125 1.125h-6.75A1.125 1.125 0 0 1 7.5 19.875V4.125Z" clipRule="evenodd" /></svg>
                                <input 
                                    type="text" 
                                    className="grow" 
                                    placeholder="Mobile Number" 
                                    required
                                />
                            </label>
                            <div className="flex text-error mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" /></svg>
                                <span className="label-text text-error text-sm ml-1">Error Info</span> 
                            </div>

                            {/* Address Input */}
                            <label className="input input-bordered input-primary w-full flex items-center gap-2 rounded-xl mt-2 bg-base-200">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" /><path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" /></svg>
                                <input 
                                    type="text" 
                                    className="grow"
                                    placeholder="Address" 
                                    required
                                />
                            </label>
                            <div className="flex text-error mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" /></svg>
                                <span className="label-text text-error text-sm ml-1">Error Info</span> 
                            </div>  

                            {/* Address Input */}
                            <label className="input input-bordered input-primary w-full flex items-center gap-2 rounded-xl mt-2 bg-base-200">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" /><path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" /></svg>
                                <input 
                                    type="date" 
                                    className="grow" 
                                    placeholder="Birthdate" 
                                    required
                                />
                            </label>
                            <div className="flex text-error mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" /></svg>
                                <span className="label-text text-error text-sm ml-1">Error Info</span> 
                            </div>
                             
                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    className="btn flex w-full justify-center rounded-md bg-primary px-3 py-1.5 mt-5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                    // disabled={!isActive}
                                >
                                Sign up
                                </button>
                            </div>
 
                        </form>
    
                    </div>    
                </div>
            </>
    );
}