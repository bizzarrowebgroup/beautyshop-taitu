import React, { useContext } from 'react';
import RouteContext from '../config/RouteContext';
import Link from 'next/link';

const BreadCrumb = () => {
  const { RenderTitle, enabledIcon } = useContext(RouteContext);
  // console.log("---enabledIcon---", enabledIcon)
  return (
    <>
      <div className="flex items-center h-10 my-1 sm:my-3 lg:my-3 justify-between flex-wrap sm:flex-no-wrap text-sm font-medium">
        <div className="inline-flex overflow-x-auto">
          <span className="text-gray-500">Dashboard</span>
          {
            RenderTitle.title !== '' && (
              <>
                <svg
                  className="inline-flex self-center flex-shrink-0 mx-1 mt-1 h-4 w-4 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="text-gray-700">
                  {RenderTitle.title}
                </span>
              </>
            )
          }
          {
            RenderTitle.subTitle !== '' && (
              <>
                <svg
                  className="inline-flex self-center flex-shrink-0 mx-1 mt-1 h-4 w-4 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="text-gray-700">
                  {RenderTitle.subTitle}
                </span>
              </>
            )
          }
        </div>
        {enabledIcon &&
          <div className="flex-shrink-0">
            <Link href="/commercianti/new">
              <button
                type="button"
                className={"inline-flex shadow items-center px-3 py-1 sm:py-2 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"}
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
                  className="h-3 w-3 mr-1"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                <span>Crea Commericante</span>
              </button>
            </Link>
          </div>
        }
      </div>
    </>
  );
}

export default BreadCrumb;