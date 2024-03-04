import LogoImgColor from '../assets/inspired-weaver-logo-color.png';

export default function Login() {
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">

                <div className="sm:mx-auto sm:w-full sm:max-w-lg bg-white rounded-lg sm:shadow-md p-10">

                <img
                    className="mx-auto h-20 w-auto"
                    src={LogoImgColor}
                    alt="Your Company"
                />

                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                </h2>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <label className="form-control w-full max-w-sm">
                            <div className="label">
                                <span className="label-text text-primary-content">Email address</span>
                                <span className="label-text-alt text-error">Error</span>
                            </div>

                            <input type="text" placeholder="Enter Email" className="input input-bordered input-primary w-full max-w-sm rounded-xl" />

                            <div className="label">
                                <span className="label-text text-primary-content">Password</span>
                                <span className="label-text-alt text-error">Error</span>
                            </div>

                            <input type="text" placeholder="Enter Password" className="input input-bordered input-primary w-full max-w-sm rounded-xl" />

                            <a href="#" className="label-text font-semibold text-primary hover:text-primary/80 mt-2">
                                Forgot password?
                            </a>
                        </label>
                    
                        <div>
                            <button
                            type="submit"
                            className="btn flex w-full justify-center rounded-md bg-primary px-3 py-1.5 mt-5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                            >
                            Sign in
                            </button>
                        </div>

                        <div>
                            <p className="mt-10 text-center text-sm text-gray-500">
                            Not a member?{' '}
                                <a href="/register" className="font-semibold leading-6 text-primary hover:text-primary/80">
                                    Sign up and shop now
                                </a>
                            </p>
                        </div>
                    </div>

                </div>
                
            </div>
        </>
    );
}