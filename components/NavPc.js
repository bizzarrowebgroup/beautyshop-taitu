import React, { useState, useContext } from 'react';
import Link from 'next/link';
import fire from '../config/fire-config';
import RouteContext from '../config/RouteContext';
const NavPc = () => {
  const { handleLogout } = useContext(RouteContext);
  const [navShow, setShowNav] = useState(false);
  const showNav = () => setShowNav(!navShow);
  const user = fire.auth().currentUser;
  return (
    <>
      <div className="lg:hidden flex items-center justify-between py-1 border-b border-gray-200 bg-gray-100">
        <Link href="/">
          <div className="inline-flex px-4 sm:px-6 md:px-4 font-bold text-xl text-gray-900">
            <h1>BS</h1>
          </div>
        </Link>
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            className="text-gray-400 inline-flex items-center justify-center py-2 px-4 sm:px-6 rounded-md focus:outline-none transition duration-150 ease-in-out"
            onClick={showNav}
          >
            <svg
              className="block h-6 w-6"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div className={!navShow ? "hidden" : "" + "lg:hidden border-b border-gray-200"}>
        <div className="flex flex-col">
          <div className="flex-1 flex flex-col mt-1 overflow-y-auto">
            <nav className="mt-2 flex-1 px-2">
              <Link href="/commercianti">
                <button
                  type="button"
                  className="text-gray-700 w-full mt-px group flex items-center px-3 py-2 text-sm leading-5 font-medium rounded-md transition ease-in-out duration-150"
                >
                  <i className="mr-2 h-3 w-6 fa fa-building fa-lg text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"></i>
                  {"Commercianti"}
                </button>
              </Link>
              <Link href="/servizi">
                <button
                  type="button"
                  className="text-gray-700 w-full mt-px group flex items-center px-3 py-2 text-sm leading-5 font-medium rounded-md transition ease-in-out duration-150"
                >
                  <i className="mr-2 h-3 w-6 fa fa-building fa-lg text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"></i>
                  {"Cat. di Servizi"}
                </button>
              </Link>
              <Link href="/servizicommercianti">
                <button
                  type="button"
                  className="text-gray-700 w-full mt-px group flex items-center px-3 py-2 text-sm leading-5 font-medium rounded-md transition ease-in-out duration-150"
                >
                  <i className="mr-2 h-3 w-6 fa fa-building fa-lg text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"></i>
                  {"Servizi"}
                </button>
              </Link>
              <Link href="/prenotazioni">
                <button
                  type="button"
                  className="text-gray-700 w-full mt-px group flex items-center px-3 py-2 text-sm leading-5 font-medium rounded-md transition ease-in-out duration-150"
                >
                  <i className="mr-2 h-3 w-6 fa fa-building fa-lg text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"></i>
                  {"Prenotazioni"}
                </button>
              </Link>
              <Link href="/fotocomm">
                <button
                  type="button"
                  className="text-gray-700 w-full mt-px group flex items-center px-3 py-2 text-sm leading-5 font-medium rounded-md transition ease-in-out duration-150"
                >
                  <i className="mr-2 h-3 w-6 fa fa-building fa-lg text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"></i>
                  {"Foto commercianti"}
                </button>
              </Link>
            </nav>
          </div>
          <div className="flex-shrink-0 flex p-4">
            <div className="flex items-center">
              <div>
                <img
                  alt={`Avatar for ${user.email}`}
                  src={user.photoURL}
                  height="50"
                  width="50"
                  className="react-gravatar inline-block h-6 w-6 ml-1 rounded-full"
                />
              </div>
              <div className="ml-2">
                <p className="text-sm leading-5 font-medium text-gray-700">
                  {user.displayName}
                </p>
                <p className="text-xs leading-4 font-light text-gray-400 hover:text-gray-500 transition ease-in-out duration-150">
                  <button onClick={handleLogout}>{"Esci"}</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default NavPc;