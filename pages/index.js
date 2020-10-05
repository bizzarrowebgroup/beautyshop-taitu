import Link from 'next/link';
import React from 'react';

export default function Home() {
  return (
    <div className="bg-white shadow rounded-md">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-xl leading-6 font-semibold text-center sm:text-left bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
          Sei dentro! Bravo, vuoi un applauso?
      </h3>
        <div className="mt-2 sm:flex sm:items-start sm:justify-between">
          {/*<div className="text-sm leading-6 text-gray-500">
            <p>
              {"Step one of setting up your autonomous system is creating a virtual machine to act as a router. The next few pages will guide you through creating a VM to your needs."}
            </p>
          </div>*/}
          {/*<Link href="/prenotazioni/crea">
            <button
              type="button"
              className="inline-flex rounded-md shadow-sm border border-gray-300 whitespace-no-wrap justify-center items-center w-full sm:w-auto mt-4 sm:mt-0 sm:ml-4 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-600 sm:text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 sm:h-3 sm:w-3 mr-1 text-teal-400"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
              <span>Crea prenotazione</span>
            </button>
          </Link>*/}
        </div>
      </div>
    </div>
  );
}