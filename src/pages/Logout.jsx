import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../UserContext";

export default function Logout() {
	const { unsetUser, setUser } = useContext(UserContext);

	unsetUser();

	useEffect(() => {
		unsetUser();
		setUser({ 
			id: null,
			isAdmin: null
		});
	}, [unsetUser, setUser]);

	return (
		<Navigate to="/login"/>
	);
    
}