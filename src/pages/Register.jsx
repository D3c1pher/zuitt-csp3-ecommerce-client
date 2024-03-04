import { useContext, useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';
import LogoImgColor from '../assets/inspired-weaver-logo-color.png';

export default function Register(){
	// const { user } = useContext(UserContext);

	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [mobileNo, setMobileNo] = useState("");
	const [address, setAddress] = useState("");
	const [birthdate, setBirthdate] = useState("");
	
	const [isActive, setIsActive] = useState(false);

	const registerUser = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch('http://localhost:4003/b3/users/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					firstName: firstname,
					lastName: lastname,
					username: username,
					email: email,
					password: password,
					confirmPassword: confirmPassword,
					mobileNo: mobileNo,
					address: address,
					birthdate: birthdate,
				})
			});
		
			const data = await response.json();
	
			if(data.message === "User registered successfully") {
				setFirstName("");
				setLastName("");
				setUsername("");
				setEmail("");
				setPassword("");
				setConfirmPassword("");
				setMobileNo("");
				setAddress("");
				setBirthdate("");

				alert("Registration successful!");

				return <Navigate to="/login" />;
			} else if (data.message !== ""){
				alert("Invalid input in registration form");
			} else {
				alert("Something went wrong.")
			}

		} catch (error) {
		  console.error('Error registering user:', error.message);
		  alert("Error registering user");
		}
	};

	useEffect(() => {
		if (
		  firstname !== "" &&
		  lastname !== "" &&
		  username !== "" &&
		  email !== "" &&
		  password !== "" &&
		  confirmPassword !== "" &&
		  mobileNo !== "" &&
		  address !== "" &&
		  birthdate !== "" &&
		  password === confirmPassword &&
		  mobileNo.length === 11
		) {
		  setIsActive(true);
		} else {
		  setIsActive(false);
		}
	}, [firstname, lastname, username, email, password, confirmPassword, mobileNo, address, birthdate]);

	return (
		    <>
                <div className="flex min-h-full flex-1 flex-col justify-center px-4 sm:px-2 py-12 lg:px-4 m-0">
                    <div className="sm:mx-auto sm:w-full sm:max-w-2xl bg-white rounded-lg sm:shadow-md p-5">
    
                        {/* Company Logo */}
                        <img
                            className="mx-auto h-20 w-auto"
                            src={LogoImgColor}
                            alt="Your Company"
                        />
    
                        {/* Header Text */}
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Create your account
                        </h2>
    
                        {/* Login Form */}
                        <form onSubmit={registerUser}>
                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                                <label className="form-control w-full max-w-3xl">
									<div className="flex">
										{/* Input First Name */}
										<div className="pr-2">
											<div className="label">
												<span className="label-text text-primary-content">First Name</span>
											</div>
											<input 
												type="text" 
												placeholder="Enter First Name" 
												className="input input-bordered input-primary w-full rounded-xl"
												value={firstname} 
												onChange={(e) => setFirstname(e.target.value)}
												required
											/>
										</div>
									
										{/* Input Last Name */}
										<div className="pl-2">
											<div className="label">
												<span className="label-text text-primary-content">Last Name</span>
											</div>
											<input 
												type="text" 
												placeholder="Enter Last Name" 
												className="input input-bordered input-primary w-full rounded-xl"
												value={lastname} 
												onChange={(e) => setLastname(e.target.value)}
												required
											/>
										</div>
									</div>

									{/* Input Username */}
                                    <div className="label">
                                        <span className="label-text text-primary-content">Username</span>
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="Enter Username" 
                                        className="input input-bordered input-primary w-full rounded-xl"
                                        value={username} 
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                    
                                    {/* Input Email */}
                                    <div className="label">
                                        <span className="label-text text-primary-content">Email</span>
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="Enter Email" 
                                        className="input input-bordered input-primary w-full rounded-xl"
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    
                                    {/* Input Password */}
                                    <div className="label">
                                        <span className="label-text text-primary-content">Password</span>
                                    </div>
                                    <input 
                                        type="password" 
                                        placeholder="Enter Password" 
                                        className="input input-bordered input-primary w-full rounded-xl"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} 
                                        required
                                    />

									{/* Input Confirm Password */}
                                    <div className="label">
                                        <span className="label-text text-primary-content">Confirm Password</span>
                                    </div>
                                    <input 
                                        type="password" 
                                        placeholder="Enter Password" 
                                        className="input input-bordered input-primary w-full rounded-xl"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)} 
                                        required
                                    />

									{/* Input Mobile No */}
                                    <div className="label">
                                        <span className="label-text text-primary-content">Mobile No</span>
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="Enter Mobile Number" 
                                        className="input input-bordered input-primary w-full rounded-xl"
                                        value={mobileNo} 
                                        onChange={(e) => setMobileNo(e.target.value)}
                                        required
                                    />

									{/* Input Address */}
                                    <div className="label">
                                        <span className="label-text text-primary-content">Address</span>
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="Enter Address" 
                                        className="input input-bordered input-primary w-full rounded-xl"
                                        value={address} 
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                    />
									
									{/* Input Birthdate */}
                                    <div className="label">
                                        <span className="label-text text-primary-content">Birthdate</span>
                                    </div>
                                    <input 
                                        type="text" 
                                        placeholder="YYYY-MM-DD" 
                                        className="input input-bordered input-primary w-full rounded-xl"
                                        value={birthdate} 
                                        onChange={(e) => setBirthdate(e.target.value)}
                                        required
                                    />
                                </label>
    
                                {/* Submit Button */}
                                <div>
                                    <button
                                        type="submit"
                                        className="btn flex w-full justify-center rounded-md bg-primary px-3 py-1.5 mt-5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                        disabled={!isActive}
                                    >
                                    Sign up
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
	)

}