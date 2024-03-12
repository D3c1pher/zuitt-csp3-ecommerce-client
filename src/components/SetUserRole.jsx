import { toast } from 'react-toastify';

export default function SetUserRole({user, isAdmin, fetchUsers}) {
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const setAsAdminToggle = async (userId) => {
        try {
            const response = await fetch(`${apiUrl}/users/${userId}/set-as-admin`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();

            if(data.message === "User set to admin successfully") {
                toast.warn('User is set to admin successfully');
                fetchUsers();
            } else {
                toast.error('Something went wrong. Please try again.');
                fetchUsers();
            }
        } catch (err) {
            console.error('Error setting user as admin:', err);
            toast.error('Internal Server Error!');
        }
    }

    const setAsCustomerToggle = async (userId) => {
        try {
            const response = await fetch(`${apiUrl}/users/${userId}/set-as-customer`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();

            if(data.message === "User set to customer successfully") {
                toast.warn('User set to customer successfully');
                fetchUsers();
            } else {
                toast.error('Something went wrong. Please try again.');
                fetchUsers();
            }
        } catch (error) {
            console.error('Error setting user as customer:', error);
            toast.error('Internal Server Error!');
        }
    }

    return (
        <>
            { isAdmin ?
                <button className="btn btn-error text-white" onClick={() => setAsCustomerToggle(user)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="-ml-0.5 xl:mr-1.5 h-5 w-5 text-white"><path d="M10.375 2.25a4.125 4.125 0 1 0 0 8.25 4.125 4.125 0 0 0 0-8.25ZM10.375 12a7.125 7.125 0 0 0-7.124 7.247.75.75 0 0 0 .363.63 13.067 13.067 0 0 0 6.761 1.873c2.472 0 4.786-.684 6.76-1.873a.75.75 0 0 0 .364-.63l.001-.12v-.002A7.125 7.125 0 0 0 10.375 12ZM16 9.75a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5h-6Z" /></svg>
                    <span className="hidden xl:block text-white">Unset Admin</span>
                </button>
                :
                <button className="btn btn-success text-white" onClick={() => setAsAdminToggle(user)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="-ml-0.5 xl:mr-1.5 h-5 w-5 text-white"><path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" /></svg>
                    <span className="hidden xl:block text-white">Set as Admin</span>
                </button>
            }
        </>
    );
}