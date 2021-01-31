import React, { useContext } from 'react';
import Link from 'next/link';
import RouteContext from '../config/RouteContext';
import fire from '../config/fire-config';
const NavMobile = () => {
  const { RenderTitle, handleLogout } = useContext(RouteContext);
  const user = fire.auth().currentUser;

  return (
    <>
      <div className="hidden lg:flex md:flex-shrink-0">
        <div className="flex flex-col w-56 bg-gray-100 border-r border-gray-200">
          <div className="h-0 flex-1 flex flex-col mt-1 overflow-y-auto">
            <Link href="/">
              <div className="flex items-center flex-shrink-0 px-4 pt-4 pb-3">
                {/* width="189" height="26"*/}
                <h1>BeautyShop</h1>
              </div>
            </Link>
            <nav className="mt-2 flex-1 px-2">
              <Link href="/commercianti">
                <button
                  type="button"
                  className={`${RenderTitle.title === 'Commercianti' ? "bg-gray-200" : ""} text-gray-700 w-full mt-px group flex items-center px-3 py-2 text-sm leading-5 font-medium rounded-md hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150`}
                >
                  <i className="mr-2 h-3 w-10 fa fa-building fa-lg text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"></i>
                  {"Commercianti"}
                </button>
              </Link>
              <Link href="/servizi">
                <button
                  type="button"
                  className={`${RenderTitle.title === 'Categorie di Servizi' ? "bg-gray-200" : ""} text-gray-700 w-full mt-px group flex items-center px-3 py-2 text-sm leading-5 font-medium rounded-md hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150`}
                >
                  <i className="mr-2 h-3 w-10 categorieServizi fa-lg text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"></i>
                  {"Cat. di Servizi"}
                </button>
              </Link>
              <Link href="/servizicommercianti">
                <button
                  type="button"
                  className={`${RenderTitle.title === 'Servizi commercianti' ? "bg-gray-200" : ""} text-gray-700 w-full mt-px group flex items-center px-3 py-2 text-sm leading-5 font-medium rounded-md hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150`}
                >
                  <i className="mr-2 h-3 w-10 categorieAllServizi fa-lg text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"></i>
                  {"Servizi"}
                </button>
              </Link>
              <Link href="/prenotazioni">
                <button
                  type="button"
                  className={`${RenderTitle.title === 'Prenotazioni' ? "bg-gray-200" : ""} text-gray-700 w-full mt-px group flex items-center px-3 py-2 text-sm leading-5 font-medium rounded-md hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150`}
                >
                  <i className="mr-2 h-3 w-10 categorieAllServizi fa-lg text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"></i>
                  {"Prenotazioni"}
                </button>
              </Link>
              <Link href="/fotocomm">
                <button
                  type="button"
                  className={`${RenderTitle.title === 'Foto commercianti' ? "bg-gray-200" : ""} text-gray-700 w-full mt-px group flex items-center px-3 py-2 text-sm leading-5 font-medium rounded-md hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150`}
                >
                  <i className="mr-2 h-3 w-10 categorieAllServizi fa-lg text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"></i>
                  {"Foto Commercianti"}
                </button>
              </Link>
              {/*<Link href="/prenotazioni">
                <button
                  type="button" // bg-gray-200
                  className="text-gray-900 w-full group flex items-center px-3 py-2 text-sm leading-5 font-medium rounded-md hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
                >
                  <i className="mr-2 h-3 w-10 fa fa-hdd fa-lg text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"></i>
                  Prenotazioni
                </button>
              </Link>*/}
              {/*<Link href="">
                <button
                  type="button"
                  className="text-gray-700 w-full mt-3 group flex items-center px-3 py-1 text-xs leading-5 font-light rounded-md hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
                >
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                  >
                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                    Impostazioni
                </button>
              </Link>
              <Link href="">
                <button
                  type="button"
                  className="text-gray-700 w-full mt-px group flex items-center px-3 py-1 text-xs leading-5 font-light rounded-md hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
                >
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                  >
                    <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                  </svg>
                  Pagamenti
                </button>
              </Link>*/}
              {/*<Link href="">
                <a
                  className="text-gray-700 mt-px group flex items-center px-3 py-1 text-xs leading-5 font-light rounded-md hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
                  //href="https://github.com/neptune-networks/feedback/issues/new/choose"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="mr-3 h-4 w-4 text-gray-400 group-hover:text-gray-500 group-focus:text-gray-500 transition ease-in-out duration-150"
                  >
                    <path d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                  Supporto
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
                    className="ml-2 h-3 w-3 text-gray-300 group-hover:text-gray-500"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </a>
              </Link>*/}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div>
                <img
                  alt={`Avatar for ${user.email}`}
                  src={user.photoURL}
                  height="50"
                  width="50"
                  className="react-gravatar inline-block h-9 w-9 rounded-full"
                />
              </div>
              <div className="ml-3">
                <p className="text-sm leading-5 font-medium text-gray-700">
                  {user.displayName}
                </p>
                <p className="text-xs leading-4 font-medium text-gray-400 hover:text-gray-500 transition ease-in-out duration-150">
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
export default NavMobile;