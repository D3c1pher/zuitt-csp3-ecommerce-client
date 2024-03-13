import { Link } from 'react-router-dom';

export default function HeroSection() {

  return (
    <div className="bg-primary/20 hero-bg">

      <div className="relative isolate px-6 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-secondary to-primary opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        <div className="mx-auto max-w-2xl py-20 sm:py-38 lg:py-50">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center drop-shadow-xl">
            <div 
              className="relative rounded-full px-3 text-sm leading-6 text-white/95 ring-1 ring-base-100/80"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              Check out the latest fashion trends.{' '}
              <Link to="/discover" className="font-semibold text-pink-500 hover:opacity-80">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="text-center">
            <h1 
              className="text-5xl font-black tracking-wider sm:text-6xl text-white drop-shadow-xl" 
              data-aos="fade-up"
              data-aos-duration="1500"
            >
              WEAVING INSPIRATION INTO FASHION
            </h1>
            <p 
              className="mt-6 font-normal text-lg leading-8 text-white drop-shadow-xl tracking-wide" 
              data-aos="fade-up"
              data-aos-duration="2000"
            >
              Fashion is more than just clothing – it's Link canvas for creativity, self-expression, and individuality. Our curated collections are crafted to inspire and empower you to weave your own unique style narrative.
            </p>
            <div 
              className="mt-10 flex items-center justify-center gap-x-6"
              data-aos="fade-up"
              data-aos-duration="2500"
              data-aos-anchor-placement="center-bottom"
            >
              <Link
                to="/shop"
                className="btn btn-lg bg-indigo-500 rounded-md px-8 py-2.5 text-lg font-black text-white shadow-sm hover:bg-indigo-500/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary drop-shadow-xl tracking-widest"
              >
                EXPLORE SHOP
              </Link>
              <Link to="/discover" className="text-xl font-black leading-6 text-pink-600 hover:opacity-80 drop-shadow-5xl tracking-widest">
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-secondary to-primary opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
       
      </div>
    </div>
  );
}