import { Link } from "react-router-dom";
import ProductImg from "../assets/product-placeholder.webp";

export default function ProductCard({productsProp}) {
	const { _id, name, description, price } = productsProp;

    return (
        <div className="card bg-white shadow-xl group relative overflow-hidden rounded-xl">
            
            <figure><img src={ProductImg} alt="Product Image" className="h-full w-full object-contain object-center group-hover:opacity-75 p-5" /></figure>

            <div className="card-body">
                <h2 className="card-title text-sm font-medium text-primary">{name}</h2>
                <p className="mt-1 text-sm text-black">{description}</p>
                <p className="font-medium text-2xl text-secondary">₱ {price}</p>
                <div className="card-actions justify-between">
                    <Link className="btn btn-outline btn-primary rounded-xl" to={`/courses/${_id}`}>Details</Link>
                    <button className="btn btn-outline btn-primary rounded-xl">Add to Cart</button>
                </div>
            </div>

        </div>
	);
}
