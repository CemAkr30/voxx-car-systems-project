import { Link } from "@tanstack/react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4 text-gray-800 dark:text-gray-200 transition-colors duration-300">
      <div className="text-center space-y-6">
        <h1 className="text-9xl font-extrabold tracking-widest">
          <span className="sr-only">Error</span>
          <span className="inline-block transition-transform hover:scale-110 duration-300">
            4
          </span>
          <span className="inline-block transition-transform hover:scale-110 duration-300">
            0
          </span>
          <span className="inline-block transition-transform hover:scale-110 duration-300">
            4
          </span>
        </h1>
        <p className="text-xl">Oops! The page you're looking for isn't here.</p>
        <div className="h-1 w-16 bg-gray-800 dark:bg-gray-200 mx-auto rounded-full" />
      </div>

      <Link
        to="/"
        className="mt-8 px-4 py-2 bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800 rounded-md hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors duration-300 flex items-center group"
      >
        <svg
          role="img"
          aria-label="Not Found 404"
          aria-labelledby="Not Found 404"
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Return Home
      </Link>

      <div className="mt-12 text-sm text-gray-600 dark:text-gray-400">
        <p>Lost? Try searching our site or checking the navigation menu.</p>
      </div>
    </div>
  );
}
