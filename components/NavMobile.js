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