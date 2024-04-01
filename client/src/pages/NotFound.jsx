export default function NotFound() {
  return (
    <section className="bg-white">
      <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
        <div className="wf-ull lg:w-1/2">
          <p className="text-sm font-medium text-teal-600">
            404 error
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">
            Page not found
          </h1>
          <p className="mt-4 text-gray-500">
            Sorry, the page you are looking for doesn't exist.
          </p>

          <div className="flex items-center mt-6 gap-x-3">
            <a
              href="mailto:info@regionalhq.com"
              className="w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto hover:bg-gray-100"
            >
              <span>Contact us</span>
            </a>

            <a
              href={process.env.REACT_APP_ENDPOINT}
              className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-teal-600 rounded-lg shrink-0 sm:w-auto hover:bg-teal-700"
            >
              Take me home
            </a>
          </div>
        </div>

        <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
          <img
            className="w-full max-w-lg lg:mx-auto"
            src="/images/components/illustration.svg"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
