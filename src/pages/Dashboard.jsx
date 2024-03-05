import { useState, useEffect } from 'react';
// import ArchiveCourse from './ArchiveCourse';
// import EditCourse from "./EditCourse";

export default function Dashboard() {
    const [selectedTab, setSelectedTab] = useState('products');
    const [products, setProducts] = useState([]);

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:4003/b3/products/all`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const data = await response.json();

                if (Array.isArray(data.products)) {
                    setProducts(data.products);
                } else {
                    setProducts([]);
                }

            } catch (error) {
                console.error('Error viewing products:', error);
            }
        }
        fetchData();
    }, []);

    const DashboardTabs = ({ selectedTab, handleTabChange }) => {
        return (
            <nav className="w-full bg-neutral text-white py-5">
                <div className="container mx-auto flex justify-evenly">
                    <label className="block cursor-pointer">
                        <input
                            type="radio"
                            className="hidden"
                            name="dashboard"
                            value="products"
                            checked={selectedTab === 'products'}
                            onChange={() => handleTabChange('products')}
                        />
                        <span className={`px-6 py-3 rounded-lg hover:bg-primary/70 ${selectedTab === 'products' ? 'bg-primary' : ''}`}>
                            Products
                        </span>
                    </label>
                    <label className="block cursor-pointer">
                        <input
                            type="radio"
                            className="hidden"
                            name="dashboard"
                            value="users"
                            checked={selectedTab === 'users'}
                            onChange={() => handleTabChange('users')}
                        />
                        <span className={`px-6 py-3 rounded-lg hover:bg-primary/70 ${selectedTab === 'users' ? 'bg-primary' : ''}`}>
                            Users
                        </span>
                    </label>
                    <label className="block cursor-pointer">
                        <input
                            type="radio"
                            className="hidden"
                            name="dashboard"
                            value="blogs"
                            checked={selectedTab === 'blogs'}
                            onChange={() => handleTabChange('blogs')}
                        />
                        <span className={`px-6 py-3 rounded-lg hover:bg-primary/70 ${selectedTab === 'blogs' ? 'bg-primary' : ''}`}>
                            Blogs
                        </span>
                    </label>
                </div>
            </nav>
        );
    }

    const DashboardContent = ({ tab }) => {
		return (
			<div className="mx-auto py-5">
				{tab === 'products' && (
					<>
                       <div className=" flex lg:ml-4 lg:mt-0 items-center justify-between mb-5">
                            <h2 className="text-2xl sm:text-3xl text-primary text-center font-bold flex-grow sm:ml-20">Product Dashboard</h2>
                            <span className="sm:block mr-5">
                                <button type="button" className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                    <svg className="-ml-0.5 sm:mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" /></svg>
                                    <span className="hidden sm:block">Add Product</span>
                                </button>
                            </span>
                        </div>

                 
					
						<div className="overflow-x-auto">
							<table className="table table-zebra">
								<thead>
									<tr className="text-center bg-neutral text-neutral-content">
										<th>ID</th>
										<th>Name</th>
										<th>Description</th>
										<th>Price</th>
										<th>Availability</th>
										<th colSpan="2">Actions</th>
									</tr>
								</thead>
	
								<tbody>
									{products.map(product => (
										<tr key={product._id} className="hover text-center">
											<td>{product._id}</td>
											<td>{product.name}</td>
											<td>{product.description}</td>
											<td>{product.price}</td>
											<td className={product.isActive ? "text-success" : "text-danger"}>
												{product.isActive ? "Available" : "Unavailable"}
											</td>
											<td>
												Edit
												{/* <EditCourse course={product._id} fetchData={fetchData}/> */}
											</td>
											<td>
												Archive
												{/* <ArchiveCourse course={course._id} isActive={course.isActive} fetchData={fetchData}/> */}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</>
				)}
				{tab === 'users' && (
					<>
						<h2 className="text-3xl text-primary text-center font-bold mb-5">User Dashboard</h2>
					</>
				)}
				{tab === 'blogs' && (
					<>
						<h2 className="text-3xl text-primary text-center font-bold mb-5">Blog Dashboard</h2>
					</>
				)}
			</div>
		);
	}

    return (
        <>
            <div>
                <DashboardTabs selectedTab={selectedTab} handleTabChange={handleTabChange} />
                <DashboardContent tab={selectedTab} />
            </div>
        </>
    );
}