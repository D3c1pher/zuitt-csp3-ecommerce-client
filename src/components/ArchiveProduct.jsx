import { toast } from 'react-toastify';

export default function ArchiveProduct({ product, isActive, fetchProducts }) {
    const token = localStorage.getItem('token');
    const apiUrl = process.env.REACT_APP_API_URL;

    const archiveToggle = async (productId) => {
        try {
            const response = await fetch(`${apiUrl}/b3/products/archive/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();

            if (data.message === "Product archived successfully") {
                toast.success('Product is successfully disabled');
                fetchProducts();
            } else {
                toast.error('Something went wrong. Please try again.');
                fetchProducts();
            }

        } catch (err) {
            console.error('Error archiving product: ', err);
            toast.error('Internal Server Error!');
        }
    }

    const activateToggle = async (productId) => {
        try {
            const response = await fetch(`${apiUrl}/b3/products/activate/${productId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();

            if(data.message === "Product activated successfully") {
                toast.success('Product successfully enabled');
                fetchProducts();
            } else {
                toast.error('Something went wrong. Please try again.');
                fetchProducts();
            }
        } catch (err) {
            console.error('Error activating product: ', err);
            toast.error('Internal Server Error!');
        }
    }

    return (
        <>
            { isActive ?
                <button className="btn btn-error text-white" onClick={() => archiveToggle(product)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="-ml-0.5 xl:mr-1.5 h-5 w-5 text-white"><path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" /><path fillRule="evenodd" d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.133 2.845a.75.75 0 0 1 1.06 0l1.72 1.72 1.72-1.72a.75.75 0 1 1 1.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 1 1-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 1 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" /></svg>
                    <span className="hidden xl:block text-white">Archive</span>
                </button>
                :
                <button className="btn btn-success text-white" onClick={() => activateToggle(product)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="-ml-0.5 xl:mr-1.5 h-5 w-5 text-white"><path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" /><path fillRule="evenodd" d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087ZM12 10.5a.75.75 0 0 1 .75.75v4.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72v-4.94a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" /></svg>
                    <span className="hidden xl:block text-white">Activate</span>
                </button>
            }
        </>
    );
}