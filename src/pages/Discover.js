import { Link } from 'react-router-dom'
import NorvenPic from '../assets/norven-pp.jpg'
import ShellyPic from '../assets/shelly-pp.jpg'

// Data PLaceholders
const posts = [
  {
    id: 1,
    title: '10 Essential Wardrobe Staples for Every Season',
    to: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Fashion', to: '#' },
    author: {
      name: 'Norven Caracas',
      role: 'Fashion Consultant & Designer',
      to: '#',
      imageUrl: NorvenPic,
    },
  },
  {
    id: 2,
    title: 'The Power of Visual Branding: Creating a Memorable Fashion Identity',
    to: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Branding', to: '#' },
    author: {
      name: 'Shelly Noval',
      role: 'Brand & Marketing Manager',
      to: '#',
      imageUrl: ShellyPic,
    },
  },
  {
    id: 3,
    title: 'Mastering the Art of Layering: Tips for Effortless Style',
    to: '#',
    description:
      'Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.',
    date: 'Mar 16, 2020',
    datetime: '2020-03-16',
    category: { title: 'Fashion', to: '#' },
    author: {
      name: 'Norven Caracas',
      role: 'Fashion Consultant & Designer',
      to: '#',
      imageUrl: NorvenPic,
    },
  }
]

export default function Discover() {
  return (
    <div className="isolate bg-base-100 pt-28 pb-36">
      <div
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-secondary to-primary opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-black tracking-wide sm:text-4xl">STYLE BLOG</h2>
          <p className="mt-2 text-lg leading-8 text-gray-500">
            Learn to level up your style with fashion advice.
          </p>
        </div>
        
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-4 sm:mt-10 sm:pt-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={post.datetime} className="text-gray-500">
                  {post.date}
                </time>
                <Link
                  to={post.category.to}
                  className="relative z-10 rounded-full bg-base-100 px-3 py-1.5 font-medium text-gray-500 hover:bg-base-200"
                >
                  {post.category.title}
                </Link>
              </div>
              <div className="group relative">
                <h3 className="mt-3 text-lg font-semibold leading-6 group-hover:text-gray-500">
                  <Link to={post.to}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-500">{post.description}</p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img src={post.author.imageUrl} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                <div className="text-sm leading-6">
                  <p className="font-semibold">
                    <Link to={post.author.to}>
                      <span className="absolute inset-0" />
                      {post.author.name}
                    </Link>
                  </p>
                  <p className="text-gray-500">{post.author.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}