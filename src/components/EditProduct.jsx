// import React, { useState } from "react";
// // import { Button, Form, Modal } from "react-bootstrap";
// import Swal from "sweetalert2";

// export default function EditCourse({ product, fetchData }){

// 	const [courseId, setProductId] = useState("");

// 	const [name, setName] = useState("");
// 	const [description, setDescription] = useState("");
// 	const [price, setPrice] = useState(0);

// 	// Modal state
// 	const [showEdit, setShowEdit] = useState(false);

// 	// function for opening the modal
// 	const openEdit = (courseId) => {

// 		fetch(`http://localhost:4000/courses/${ courseId }`)
// 			.then(res => res.json())
// 			.then(data => {

// 				console.log(data.course);

// 				setProductId(data.course._id);
// 				setName(data.course.name);
// 				setDescription(data.course.description);
// 				setPrice(data.course.price);

// 			})

// 			setShowEdit(true);

// 	}

// 	const closeEdit = () => {

// 		setShowEdit(false);
// 		setCourseId("");
// 		setName("");
// 		setDescription("");
// 		setPrice(0);

// 	}

// 	const editCourse = (e, productId) => {

// 		e.preventDefault();

// 		fetch(`http://localhost:4003/products/${ productId }`, {
// 			method: "PUT",
// 			headers: {
// 				"Content-Type": "application/json",
// 				"Authorization": `Bearer ${localStorage.getItem("token")}`
// 			},
// 			body: JSON.stringify({
// 				name: name,
// 				description: description,
// 				price: price
// 			})
// 		})
// 		.then(res => res.json())
// 		.then(data => {

// 			console.log(data);

// 			if(data.message === "Course updated successfully"){
// 				Swal.fire({
// 				  title: "Success!",
// 				  text: "Course successfully updated.",
// 				  icon: "success"
// 				});

// 				closeEdit();
// 				fetchData();

// 			} else {
// 				Swal.fire({
// 				  title: "Error!",
// 				  text: "Please try again.",
// 				  icon: "Error"
// 				});

// 				closeEdit();
// 				fetchData();
// 			}

// 		})

// 	}

// 	return (

// 		<>
			
// 			<Button variant="primary" size="sm" onClick={() => openEdit(course)}> Edit </Button>


// 			{/*Edit Course Modal*/}
// 			<Modal show={showEdit} onHide={closeEdit}>
// 				<Form onSubmit={e => editCourse(e, courseId)}>
// 					<Modal.Header closeButton>
// 						<Modal.Title>Edit Course</Modal.Title>
// 					</Modal.Header>

// 					<Modal.Body>
// 						<Form.Group controlId="courseName">
// 						    <Form.Label>Name:</Form.Label>
// 						    <Form.Control type="text" required value={name} onChange={e => {setName(e.target.value)}}/>
// 						</Form.Group>

// 						<Form.Group controlId="courseDescription">
// 						    <Form.Label>Description:</Form.Label>
// 						    <Form.Control type="text" required value={description} onChange={e => {setDescription(e.target.value)}}/>
// 						</Form.Group>

// 						<Form.Group  controlId="coursePrice">
// 						    <Form.Label>Price:</Form.Label>
// 						    <Form.Control type="number" required value={price} onChange={e => {setPrice(e.target.value)}}/>
// 						</Form.Group>
// 					</Modal.Body>

// 					<Modal.Footer>
// 						<Button variant="secondary" onClick={closeEdit}>Close</Button>
// 						<Button variant="success" type="submit">Submit</Button>
// 					</Modal.Footer>
// 				</Form>
// 			</Modal>


// 		</>

// 	)

// }