import { Link } from "react-router-dom";
import { StarIcon } from '@heroicons/react/20/solid'

// Data Placeholders
const reviews = { to: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductCard({ productsProp }) {
	const { _id, name, description, price } = productsProp;

  return (
      <div className="card bg-base-100/70 shadow-xl group relative overflow-hidden rounded-xl grid grid-cols-2 items-center">

        {/* Image placeholder */}
        <div className="col-span-full sm:col-span-1 pl-5 pr-5 py-5">
          <Link to={`/shop/${_id}`} className="bg-gradient-to-br from-black/30 to-black/20 rounded-xl relative h-[280px] w-auto flex P-5 group-hover:opacity-75">
          </Link>
        </div>

        <div className="card-body col-span-full sm:col-span-1 px-10">

          <Link to={`/shop/${_id}`} className="card-title text-md font-medium text-primary hover:opacity-80">{name}</Link>
          <p className="mt-1 text-sm">{description}</p>

          {/* Reviews */}
          <div className="mt-1">
            <div className="flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <StarIcon
                    key={rating}
                    className={classNames(
                      reviews.average > rating ? 'text-primary' : 'text-gray-200',
                      'h-5 w-5 flex-shrink-0'
                    )}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <Link to={reviews.to} className="ml-3 text-sm font-medium text-primary hover:text-secondary">
                {reviews.totalCount} reviews
              </Link>
            </div>
          </div>

          <p className="font-bold text-3xl text-secondary">₱ {price}</p>
          <div className="card-actions justify-end">
              <Link className="link link-hover text-primary hover:text-secondary rounded-xl text-lg font-bold" to={`/shop/${_id}`}>View Details</Link>
          </div>

        </div>
        
      </div>
	);
}