import CozyPreviewImg from '../assets/preview-cozy.jpg';
import SummerPreviewImg from '../assets/preview-summer.jpg';
import TraditionalPreviewImg from '../assets/preview-traditional.jpg';

// Collection Data Preset
const collections = [
  {
    name: 'Summer Glows',
    description: 'Face the summer in bright colors',
    imageSrc: SummerPreviewImg,
    href: '#',
  },
  {
    name: 'Inspired Tradition',
    description: 'Embrace tradition in style',
    imageSrc: TraditionalPreviewImg,
    href: '#',
  },
  {
    name: 'Chill N Cozy',
    description: 'Wear a dripping cozy casual',
    imageSrc: CozyPreviewImg,
    href: '#',
  },
]

export default function CollectionSection() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl py-5 lg:max-w-none">
        <h2 className="text-2xl font-bold">Collections</h2>

        <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
          {collections.map((collection) => (
            <div key={collection.name} className="group relative">
              <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                <img
                  src={collection.imageSrc}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-6 text-sm text-gray-500">
                <a href={collection.href}>
                  <span className="absolute inset-0" />
                  {collection.name}
                </a>
              </h3>
              <p className="text-base font-semibold">{collection.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}