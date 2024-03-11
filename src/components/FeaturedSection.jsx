import Placeholder01 from '../assets/placeholder-01.jpg'
import Placeholder02 from '../assets/placeholder-02.jpg'
import Placeholder03 from '../assets/placeholder-03.jpg'
import Placeholder04 from '../assets/placeholder-04.jpg'

// Data Placeholders
const products = [
  {
    id: 1,
    name: 'UNISEX JERSEY SHORT SLEEVE TEE',
    href: '/shop/65e30d67d976ea7eb9de8bf7',
    imageSrc: Placeholder01,
    price: '₱1325.75',
    color: 'Navy',
  },
  {
    id: 2,
    name: 'UNISEX HEAVY BLEND™ CREWNECK SWEATSHIRT',
    href: '/shop/65e3196ebb0828095552831a',
    imageSrc: Placeholder02,
    price: '₱2294.69',
    color: 'Natural',
  },
  {
    id: 3,
    name: 'UNISEX HEAVY BLEND™ HOODED SWEATSHIRT',
    href: '/shop/65e8630f3a1c6a37edb57f1d',
    imageSrc: Placeholder03,
    price: '₱2890.75',
    color: 'Brown',
  },
  {
    id: 4,
    name: 'PUFFER JACKET (AOP)',
    href: '/shop/65e8667b3a1c6a37edb57f59',
    imageSrc: Placeholder04,
    price: '₱5282.62',
    color: 'White',
  },
]

export default function FeaturedSection() {

  return (
    <div className="mx-auto max-w-2xl px-4 py-5 sm:px-6 lg:max-w-7xl lg:px-8 pb-14">
      <h2 
        className="text-2xl font-bold tracking-tight"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        Featured Products
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <div key={product.id} className="group relative" data-aos="fade-up"
          data-aos-duration="2000">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-500">
                  <a href={product.href}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </a>
                </h3>
                <p className="mt-1 text-sm">{product.color}</p>
              </div>
              <p className="text-sm font-medium text-gray-900">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}