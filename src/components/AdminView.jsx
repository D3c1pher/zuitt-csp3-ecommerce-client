import { useState, useEffect } from 'react';
// import { Button, Table } from 'react-bootstrap';

// import ArchiveCourse from './ArchiveCourse';
// import EditCourse from "./EditCourse";

export default function AdminView({ productsData }) {
    const [products, setProducts] = useState([]);

	//Getting the coursesData from the courses page
	useEffect(() => {
		console.log(productsData);

		const productsArr = productsData.map(product => {
			return (
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
                        {/* <EditCourse course={course._id} fetchData={fetchData}/> */}
                    </td>
					<td>
                        Archive
                        {/* <ArchiveCourse course={course._id} isActive={course.isActive} fetchData={fetchData}/> */}
                    </td>	
					{/*<td><Button course={course._id}>Edit</Button> </td>	*/}
					{/*<td><Button course={course._id} className="btn-danger">Archive</Button></td>*/}
				</tr>
			)
		})

		setProducts(productsArr)

	}, [productsData])


	return(
		<>
			<h1 className="text-center my-4"> Admin Dashboard</h1>

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
                        {products}
                    </tbody>
                </table>	
            </div>
			
		</>

		)
}