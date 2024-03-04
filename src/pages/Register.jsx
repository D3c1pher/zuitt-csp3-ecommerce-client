import { useContext,useEffect, useState } from "react";
//import { Form, Button } from "react-boostrap";
import { Navigate } from 'react-router-dom';
import UserContext from '../UserContext';

export default function Register(){

	const { user } = useContext(UserContext);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [verifyPassword, setVerifyPassword] = useState("");
	const [isActive, setIsActive] = useState(false);

	function registerUser(e){

		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}b3/users/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({

				email : email,
				password : password
				//verifyPassword : verifyPassword

			})
		}).then(res => res.json())
		.then(data => {

			console.log(data);

			if(data.message === "User registered successfully"){

				setEmail("");
				setPassword("");
				setVerifyPassword("");

				alert("Registration successful!");

			} else if (data.error === "Error in user registration:"){

				alert("Error in user registration");

			} else {

				alert("Something went wrong.")

			}

		})

	}


	useEffect(() => {

		if((email !== "" && password !== "" && verifyPassword !== "") && (password === confirmPassword)){

			setIsActive(true);

		} else {

			setIsActive(false);

		}

	}, [email, password, verifyPassword]);

	return (
		<>
		<h1 className="my-5 text-center text-2xl text-gray-900 dark:text-white"> Register </h1>
			<form class="max-w-sm mx-auto">
			  <div class="mb-5">
			    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
			    <input type="email" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your email" value={ email } onChange={e => setEmail(e.target.value)} required />
			  </div>
			  <div class="mb-5">
			    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
			    <input type="password" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter your password" value={ password } onChange={e => setPassword(e.target.value)} required />
			  </div>
			  <div class="mb-5">
			    <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Verify Password:</label>
			    <input type="password" id="repeat-password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Verify your password" value={ verifyPassword } onChange={e => setVerifyPassword(e.target.value)} required />
			  </div>
			  <div class="text-red-600 text-center">Please enter your registration details.</div>
			</form>
			<p class="text-center">Already have an account? Click here to log in.</p>
			</>
		)
	

}