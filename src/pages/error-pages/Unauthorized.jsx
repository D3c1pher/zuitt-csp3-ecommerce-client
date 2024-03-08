export default function Unauthorized() {
  
  return (
    <main className="grid min-h-full place-items-center bg-base-100 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="bg-base-100 font-semibold text-primary">401</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight bg-base-100 sm:text-5xl">Unauthorized Access</h1>
        <p className="mt-6 bg-base-100 leading-7 text-base-content">Sorry, you are unauthorized to access page. Please contact support.</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/"
            className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Go back home
          </a>
          <a href="#" className="text-sm font-semibold text-base-content hover:text-primary">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  );
}  