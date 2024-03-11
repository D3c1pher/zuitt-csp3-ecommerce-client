export default function UserProfile() {

  return (
    <div className="p-20">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7">Profile Information</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">User details and account information</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6">Full name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">Norven Caracas</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6">Email address</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">norven.caracas@email.com</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6">About</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-500 sm:col-span-2 sm:mt-0">
              Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
              qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure nostrud
              pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
            </dd>
          </div>

        </dl>
      </div>
    </div>
  );
}