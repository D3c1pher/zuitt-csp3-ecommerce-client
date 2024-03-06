import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PhotoIcon } from '@heroicons/react/24/solid';

export default function EditProduct() {
    const navigate = useNavigate();
    const { productId } = useParams();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [discount, setDiscount] = useState('');
    const [images, setImages] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [isFeatured, setIsFeatured] = useState(false);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const response = await fetch(`http://localhost:4003/b3/products/${productId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }
                const data = await response.json();
				console.log(data.product);
                setName(data.product.name);
                setDescription(data.product.description);
                setCategory(data.product.category.name);
                setPrice(data.product.price);
                setDiscount(data.product.discount);
                setImages(data.product.images);
                setIsActive(data.product.isActive);
                setIsFeatured(data.product.isFeatured);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };
        fetchProductData();
    }, [productId]);

    const editProduct = async (e) => {
        e.preventDefault();
        try {
            let token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:4003/b3/products/${productId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    name: name,
                    description: description,
                    category: category,
                    price: price,
                    discount: discount,
                    images: images,
                    isActive: isActive,
                    isFeatured: isFeatured
                })
            });
            const data = await response.json();

            if (response.ok) {
                alert("Product successfully updated")
                navigate("/dashboard");
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error(err);
            alert("Internal Server Error")
        }
    };
	
    return (
        <form onSubmit={e => editProduct(e)}>
            <div className="space-y-12 pt-10 px-5 sm:px-20">
                <div className="border-b border-gray-900/10">

                    <h2 className="text-3xl font-bold text-center text-primary">Edit Product</h2>

                    <div className="divider divider-primary my-5"></div>

                    <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                        <div className="col-span-full">
                            <label className="block text-sm font-medium leading-6">
                                Product Images
                            </label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-500 px-6 py-10">
                                <div className="text-center">
                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer rounded-md bg-base-100 font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-secondary"
                                    >
                                    <span>Upload a file</span>
                                    <input 
                                        id="file-upload" 
                                        name="images" 
                                        type="file" className="sr-only" 
                                        value={images}
                                        onChange={(e) => setImages(e.target.value)} 
                                    />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">PNG or JPG up to 10MB</p>
                                </div>
                            </div>
                            <div className="divider divider-primary mt-8"></div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="name" className="block text-sm font-medium leading-6">
                                Product Name :
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="block w-full rounded-md border-0 bg-transparent py-1.5 px-2 shadow-sm ring-1 ring-inset ring-primary placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                                    placeholder="Enter Product Name"
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="category" className="block text-sm font-medium leading-6">
                                Category
                            </label>
                            <div className="mt-2">
                                <select
                                    id="category"
                                    name="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="block w-full rounded-md border-0 bg-transparent py-2 px-2 shadow-sm ring-1 ring-inset ring-primary placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                                    required
                                >
                                    <option className="text-gray-400" value="" disabled>Select Category</option>
									<option value="Desktop">Desktop</option>
									<option value="Laptop">Laptop</option>
									<option value="Tablet">Tablet</option>
									<option value="Mouse">Mouse</option>
									<option value="Keyboard">Keyboard</option>
									<option value="Headset">Headset</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label className="block text-sm font-medium leading-6">
                                Description :
                            </label>
                            <div className="mt-2">
                                <textarea
                                id="description"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={2}
                                className="px-2 block w-full rounded-md border-0 bg-transparent py-1.5 shadow-sm ring-1 ring-inset ring-primary placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                                required
                                />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">Write description of the product.</p>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="price" className="block text-sm font-medium leading-6">
                                Price :
                            </label>
                            <div className="mt-2">
                                <input
                                type="text"
                                name="price"
                                id="price"
                                value={price}
                                onChange={(e) => setPrice(parseFloat(e.target.value))}
                                inputMode="numeric"
                                placeholder="Enter Price"
                                className="block w-full rounded-md border-0 bg-transparent py-1.5 px-2 shadow-sm ring-1 ring-inset ring-primary placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                                required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="discount" className="block text-sm font-medium leading-6">
                                Discount :
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="discount"
                                    id="discount"
                                    value={discount}
                                    onChange={(e) => setDiscount(parseFloat(e.target.value))}
                                    inputMode="numeric"
                                    placeholder="Enter Discount"
                                    className="block w-full rounded-md border-0 bg-transparent py-1.5 px-2 shadow-sm ring-1 ring-inset ring-primary placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                    </div>
                </div>

                <div className="divider divider-primary"></div>

                <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 space-y-10">
                    <fieldset>
                    
                    <legend className="text-sm font-semibold leading-6">Other Product Info :</legend>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                            <input
                                id="isActive"
								name="isActive"
								type="checkbox"
								checked={isActive}
								onChange={(e) => setIsActive(e.target.checked)}
                                className="h-4 w-4 rounded border-secondary text-primary focus:ring-secondary"
                            />
                        </div>
                        <div className="text-sm leading-6">
                            <label htmlFor="isActive" className="font-medium">
                            Product is available
                            </label>
                            <p className="text-gray-500">Make product publicly available in shop.</p>
                        </div>
                        </div>

                        <div className="relative flex gap-x-3">
                        <div className="flex h-6 items-center">
                            <input
                                id="isFeatured"
								name="isFeatured"
								type="checkbox"
								checked={isFeatured}
								onChange={(e) => setIsFeatured(e.target.checked)}
                                className="h-4 w-4 rounded border-secondary text-primary focus:ring-secondary"
                            />
                        </div>

                        <div className="text-sm leading-6">
                            <label htmlFor="isFeatured" className="font-medium">
                            Product is featured
                            </label>
                            <p className="text-gray-500">Feature available product in shop.</p>
                        </div>
                        </div>
                    </div>
                    </fieldset>
                </div>

                </div>

            </div>

            <div className="mt-0 flex items-center justify-end gap-x-6 px-20 pb-20">
                <button href="/dashboard" type="button" className="text-sm font-semibold leading-6 hover:text-primary">
                Cancel
                </button>
                <button
                    type="submit"
                    className="btn btn-primary rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                Save
                </button>
            </div>
        </form>
    );
}