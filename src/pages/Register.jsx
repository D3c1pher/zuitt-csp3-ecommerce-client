import { useState } from "react";
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
    const [registrationError, setRegistrationError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const registerUser = async (e) => {
        e.preventDefault();

        const apiUrl = process.env.REACT_APP_API_URL;

        try {
            const response = await fetch(`${apiUrl}/b3/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({formData})
            });

            if (!response.ok) {
                throw new Error("Error registering user");
            }
    

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

    return (
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
                        <p className="mt-2 text-sm">
                            Already have an account?
                            <a className="ml-1 text-secondary decoration-2 hover:underline font-medium" href="/login">
                                Sign in here
                            </a>
                        </p>
                    </div>

                    {/* Register Form */}
                    <form className="form-control w-full max-w-8xl mt-10" onSubmit={registerUser}>

                        {/* First Name Input */}
                        <label className="input input-bordered input-primary w-full flex items-center gap-2 rounded-xl mt-2 bg-base-200">
                            <input
                                type="text"
                                className="grow"
                                placeholder="First Name"
                                name="firstname"
                                pattern="[A-Za-z]{1,32}"
                                title="First name must contain only letters (1-32 characters)"
                                value={formData.firstname}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        {/* Last Name Input */}
                        <label className="input input-bordered input-primary w-full flex items-center gap-2 rounded-xl mt-2 bg-base-200">
                            <input
                                type="text"
                                className="grow"
                                placeholder="Last Name"
                                name="lastname"
                                pattern="[A-Za-z]{1,32}"
                                title="Last name must contain only letters (1-32 characters)"
                                value={formData.lastname}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        {/* Username Input */}
                        <label className="input input-bordered input-primary w-full flex items-center gap-2 rounded-xl mt-2 bg-base-200">
                            <input
                                type="text"
                                className="grow"
                                placeholder="Username"
                                name="username"
                                pattern="[A-Za-z0-9_-]{3,16}"
                                title="Username must contain only letters, numbers, underscores, or hyphens (3-16 characters)"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        {/* Email Input */}
                        <label className="input input-bordered input-primary w-full flex items-center gap-2 rounded-xl mt-2 bg-base-200">
                            <input
                                type="email"
                                className="grow"
                                placeholder="Email"
                                name="email"
                                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                                title="Please enter a valid email address"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        {/* Password Input */}
                        <label className="input input-bordered input-primary w-full flex items-center gap-2 rounded-xl mt-2 bg-base-200">
                            <input
                                type="password"
                                className="grow"
                                placeholder="Password"
                                name="password"
                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$"
                                title="Password must contain at least one uppercase letter, one lowercase letter, one numeric digit, one special character, and be at least 8 characters long."
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        {/* Confirm Password Input */}
                        <label className="input input-bordered input-primary w-full flex items-center gap-2 rounded-xl mt-2 bg-base-200">
                            <input
                                type="password"
                                className="grow"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                pattern={formData.password}
                                title="Passwords must match"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        {/* Mobile No Input */}
                        <label className="input input-bordered input-primary w-full flex items-center gap-2 rounded-xl mt-2 bg-base-200">
                            <input
                                type="tel"
                                className="grow"
                                placeholder="Mobile Number"
                                name="mobileNo"
                                inputMode="numeric"
                                pattern="[0-9]{11}"
                                title="Mobile number must contain exactly 11 digits"
                                value={formData.mobileNo}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        {/* Address Input */}
                        <label className="input input-bordered input-primary w-full flex items-center gap-2 rounded-xl mt-2 bg-base-200">
                            <input
                                type="text"
                                className="grow"
                                placeholder="Address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        {/* Birthdate Input */}
                        <label className="input input-bordered input-primary w-full flex items-center gap-2 rounded-xl mt-2 bg-base-200">
                            <input
                                type="date"
                                className="grow"
                                placeholder="Birthdate"
                                name="birthdate"
                                value={formData.birthdate}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        {/* Registration Error */}
                        {registrationError && (
                            <div className="flex text-error mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" /></svg>
                            <span className="label-text text-error text-sm ml-1">{registrationError}</span> 
                        </div>
                    )}

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="btn flex w-full justify-center rounded-md bg-primary px-3 py-1.5 mt-5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
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