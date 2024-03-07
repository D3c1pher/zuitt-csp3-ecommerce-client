import { Link } from "react-router-dom";
import { StarIcon } from '@heroicons/react/20/solid'

// Data Placeholders
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ProductCard({productsProp}) {
	const { _id, name, description, price } = productsProp;

    return (
        <div className="card bg-white shadow-xl group relative overflow-hidden rounded-xl grid grid-cols-2 items-center">

            <div className="col-span-1 p-5">
              {/* Image placeholder */}
              <div className="bg-gradient-to-br from-black/30 to-black/20 rounded-xl relative h-[240px] w-auto flex P-5 group-hover:opacity-75">
              </div>
            </div>  

            <div className="card-body col-span-1 p-8">
                <h2 className="card-title text-md font-medium text-primary">{name}</h2>
                <p className="mt-1 text-sm text-black">{description}</p>

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
                    <a href={reviews.href} className="ml-3 text-sm font-medium text-primary hover:text-secondary">
                      {reviews.totalCount} reviews
                    </a>
                  </div>
                </div>

                <p className="font-medium text-2xl text-secondary">₱ {price}</p>
                <div className="card-actions justify-between">
                    <Link className="btn btn-outline btn-primary rounded-xl" to={`/shop/${_id}`}>Details</Link>
                    <button className="btn btn-outline btn-primary rounded-xl">Add to Cart</button>
                </div>
            </div>

        </div>

        
	);
}
