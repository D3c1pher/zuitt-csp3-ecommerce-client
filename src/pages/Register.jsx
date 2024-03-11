import { useState } from "react";
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LogoImgColor from '../assets/inspired-weaver-logo-color.png';

export default function Register() {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [address, setAddress] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [registrationError, setRegistrationError] = useState('');

    const registerUser = async (e) => {
        e.preventDefault();

        const apiUrl = process.env.REACT_APP_API_URL;

        try {
            const response = await fetch(`${apiUrl}/b3/users/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstname,
                    lastname,
                    username,
                    email,
                    password,
                    confirmPassword,
                    mobileNo,
                    address,
                    birthdate
                })
            });
            const data = await response.json();
                
            if (data.message) {
                setRegistrationError(data.message.map((error, index) => (
                    <div key={index} className="flex text-error mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                        <span className="text-sm ml-1">{error}</span>
                    </div>
                )));

                toast.warn('Invalid inputs!');
            } else {
                setFirstname('');
                setLastname('');
                setUsername('');
                setEmail('');
                setPassword('');
                setConfirmPassword('');
                setMobileNo('');
                setAddress('');
                setBirthdate('');

                toast.success(`Sign up successful!`);
                return <Navigate to="/login" />;
            }
        } catch (err) {
            console.error('Error registering user: ', err);
            toast.error('Internal Server Error!');
            setRegistrationError('Internal Server Error!');
        }
    }

    return (
        <div className="texture bg-gradient-to-br from-primary/60 to-secondary/60 flex h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-lg rounded-lg sm:shadow-md p-10 bg-base-100/50">

                {/* Company Logo */}
                <img
                    className="mx-auto h-20 w-auto"
                    src={LogoImgColor}
                    alt="Your Company"
                />

                <div className="text-center">
                    {/* Header Text */}
                    <h2 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight">
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
                <form onSubmit={registerUser}>
                    <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">

                        <label className="form-control w-full max-w-sm">
                        {/* Input First Name */}
                        <div className="label">
                            <span className="label-text">First Name :</span>
                        </div>
                        <input 
                            type="text"
                            placeholder="First Name"
                            name="firstname"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            required
                            className="input input-bordered input-primary flex w-full justify-stretch rounded-md max-w-sm"
                        />

                        {/* Last Name Input */}
                        <div className="label">
                            <span className="label-text">Last Name :</span>
                        </div>
                        <input 
                            type="text"
                            placeholder="Last Name"
                            name="lastname"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            required
                            className="input input-bordered input-primary flex w-full justify-stretch rounded-md max-w-sm"
                        />

                        <div className="divider divider-primary"></div>

                        {/* Username Input */}
                        <div className="label">
                            <span className="label-text">Username :</span>
                        </div>
                        <input 
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="input input-bordered input-primary flex w-full justify-stretch rounded-md max-w-sm"
                        />

                        {/* Email Input */}
                        <div className="label">
                            <span className="label-text">Email :</span>
                        </div>
                        <input 
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="input input-bordered input-primary flex w-full justify-stretch rounded-md max-w-sm"
                        />

                        <div className="divider divider-primary"></div>

                        {/* Password Input */}
                        <div className="label">
                            <span className="label-text">Password :</span>
                        </div>
                        <input 
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="input input-bordered input-primary flex w-full justify-stretch rounded-md max-w-sm"
                        />

                        {/* Confirm Password Input */}
                        <div className="label">
                            <span className="label-text">Confirm Password :</span>
                        </div>
                        <input 
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="input input-bordered input-primary flex w-full justify-stretch rounded-md max-w-sm"
                        />

                        <div className="divider divider-primary"></div>

                        {/* Mobile No Input */}
                        <div className="label">
                            <span className="label-text">Mobile Number :</span>
                        </div>
                        <input 
                            type="tel"
                            placeholder="Mobile Number"
                            name="mobileNo"
                            value={mobileNo}
                            onChange={(e) => setMobileNo(e.target.value)}
                            required
                            className="input input-bordered input-primary flex w-full justify-stretch rounded-md max-w-sm"
                        />

                        {/* Address Input */}
                        <div className="label">
                            <span className="label-text">Address :</span>
                        </div>
                        <input 
                            type="text"
                            placeholder="Address"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            className="input input-bordered input-primary flex w-full justify-stretch rounded-md max-w-sm"
                        />

                        {/* Birthdate Input */}
                        <div className="label">
                            <span className="label-text">Birth Date :</span>
                        </div>
                        <input 
                            type="date"
                            placeholder="Birthdate"
                            name="birthdate"
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                            required
                            className="input input-bordered input-primary flex w-full justify-stretch rounded-md max-w-sm"
                        />

                        {/* Registration Error */}
                        { registrationError && (
                            <div className="mt-4">
                                {registrationError}
                            </div>
                        )}
                        </label>

                        {/* Sign up Button */}
                        <div className="flex justify-between">
                            <button
                            type="submit"
                            className="btn btn-primary flex w-full justify-center rounded-md px-3 py-1.5 mt-5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary" 
                            >
                            Sign up
                            </button>
                        </div>
                        
                    </div>
                </form>

            </div>
        </div>
    );
}