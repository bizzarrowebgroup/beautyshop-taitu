import React, { useState, useContext } from 'react';
import Link from 'next/link';
import fire from '../config/fire-config';
import RouteContext from '../config/RouteContext';
const NavPc = () => {
  const { handleLogout } = useContext(RouteContext);
  const [navShow, setShowNav] = useState(false);
  const showNav = () => setShowNav(!navShow);
  const user = fire.auth().currentUser;
  //console.log("---user---", user)
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
              {/*<Link href="/prenotazioni">
                <button
                  type="button"
                  className="text-gray-900 w-full group flex items-center px-3 py-2 text-sm leading-5 font-medium rounded-md transition ease-in-out duration-150"// bg-gray-200
                >
                  <i className="mr-2 h-3 w-6 fa fa-hdd fa-lg text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"></i>
                  Prenotazioni
                </button>
              </Link>*/}
              {/*<button
                type="button"
                className="text-gray-700 w-full mt-2 group flex items-center px-3 py-1 text-sm leading-5 font-medium rounded-md transition ease-in-out duration-150"
              >
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="mr-2 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                >
                  <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                {"Impostazioni"}
              </button>
              <button
                type="button"
                className="text-gray-700 w-full mt-px group flex items-center px-3 py-1 text-sm leading-5 font-medium rounded-md transition ease-in-out duration-150"
              >
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="mr-2 h-6 w-6 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                >
                  <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                </svg>
                {"Pagamenti"}
              </button>
              <a
                className="text-gray-700 mt-px group flex items-center px-3 py-1 text-sm leading-5 font-medium rounded-md transition ease-in-out duration-150"
                //href="https://github.com/neptune-networks/feedback/issues/new/choose"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="mr-2 h-6 w-6 text-gray-400 group-focus:text-gray-500 transition ease-in-out duration-150"
                >
                  <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
                {"Supporto"}
              </a>*/}
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