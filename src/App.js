import React from 'react';
//import logo from './logo.svg';
import './styles/tailwind-used.css';

function App() {
  return (
    <div className="App">
      <nav
        className="flex bg-blue-700 items-center flex-wrap lg:flex-no-wrap fixed left-0 right-0 top-0 z-50"
      >
        <div className="block lg:hidden md:hidden ml-4 mr-auto">
          <button
            className="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-white hover:border-white sideTrigger"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="flex">
          <a
            href="#"
            className="p-4 text-blue-200 hover:text-white font-extrabold text-lg"
          >BeautyShop</a
          >
        </div>
        <div className="block lg:hidden ml-auto mr-4">
          <button
            className="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-white hover:border-white menuTrigger"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="w-full lg:flex hidden nav-menu ">
          <ul className="text-base lg:flex">
            {/*<li>
              <a
                href="#"
                className="p-4 flex items-center text-purple-300 hover:text-white hover:bg-purple-800"
              ><i className="fas fa-home mr-1"></i>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="p-4 flex items-center text-purple-300 hover:text-white hover:bg-purple-800"
              ></a>
            </li>
            <li>
              <a
                href="#"
                className="p-4 flex items-center text-purple-300 hover:text-white hover:bg-purple-800"
              ></a>
            </li>
            <li>
              <a
                href="#"
                className="p-4  flex items-center text-purple-300 hover:text-white hover:bg-purple-800"
              ></a>
            </li>*/}
          </ul>
          <ul className="text-base lg:flex lg:ml-auto">
            {/*<li>
              <a
                href="#"
                className=" p-4 flex items-center text-blue-300 hover:bg-blue-800 hover:text-white"
              >Notifche</a>
            </li>*/}
            <li>
              <a
                href="#"
                className="p-4 flex items-center text-blue-300 hover:text-white hover:bg-blue-800"
              >
                <i className="fas fa-sign-out-alt mr-1"></i>
              Esci
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container max-w-full">
        <div className="flex flex-wrap">
          <div
            className="lg:w-1/4 xl:w-1/6 md:w-1/4 w-full mt-16 fixed top-0 h-full bg-blue-700 z-40 sidebar "
          >
            <div className="wrapper p-3 -mt-2 bg-blue-700">
              <p
                className="text-xs uppercase my-1 pb-2 text-blue-400 border-b border-blue-600"
              >
                Generali
               </p>
              <ul className="list-none p-0 m-0 flex flex-col">
                <li>
                  <a
                    href="#"
                    className="flex p-2 text-blue-300 hover:text-white hover:bg-blue-800"
                  >Dashboard</a
                  >
                </li>
              </ul>
              <p
                className="text-xs uppercase my-1 pb-2 text-blue-400 border-b border-blue-600"
              >
                Amministrazione
               </p>
              <ul className="list-none p-0 m-0 flex flex-col">
                <li>
                  <a
                    href="#"
                    className="flex p-2 text-blue-300 hover:text-white hover:bg-blue-800"
                  >Prenotazioni</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    className="flex p-2 text-blue-300 hover:text-white hover:bg-blue-800"
                  >Commercianti</a
                  >
                  <ul className="list-none p-0 m-0 pl-2 flex flex-col">
                    <li>
                      <a
                        href="#"
                        className="flex p-2 text-blue-300 hover:text-white hover:bg-blue-800"
                      >Servizi</a
                      >
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex p-2 text-blue-300 hover:text-white hover:bg-blue-800"
                      >Orari</a
                      >
                    </li>
                    <li>
                      <a
                        href="#"
                        className="flex p-2 text-blue-300 hover:text-white hover:bg-blue-800"
                      >Dipendenti</a
                      >
                    </li>
                  </ul>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex p-2 text-blue-300 hover:text-white hover:bg-blue-800"
                  >Cat. di Servizi</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    className="flex p-2 text-blue-300 hover:text-white hover:bg-blue-800"
                  >Recensioni</a
                  >
                </li>
                <li>
                  <a
                    href="#"
                    className="flex p-2 text-blue-300 hover:text-white hover:bg-blue-800"
                  >Foto</a
                  >
                </li>
              </ul>
              {/*<p
                className="text-xs uppercase my-1 pb-2 text-blue-400 border-b border-blue-600"
              >
                others
              </p>
              <ul className="p-0 m-0 list-none flex flex-col">
                <li>
                  <a
                    href="#"
                    className="flex p-2 text-blue-300 hover:text-white hover:bg-blue-800"
                  >
                    Extras
                     </a>
                </li>
              </ul>*/}
            </div>
          </div>
          <div className="xl:w-5/6 lg:w-3/4 lg:ml-auto md:w-3/4 md:ml-auto w-full">
            <div className="p-3">
              <div className="container max-w-full">
                <div className="flex flex-wrap -mx-2">
                  <div className="lg:w-1/4 w-full p-2">
                    <div className="border border-green-500 rounded shadow-lg p-3 bg-green-200">
                      <div>
                        <p className="text-xs uppercase mb-1 text-green-700">
                          APP SCARICATA
                        </p>
                        <h3 className="text-3xl font-semibold">56,585</h3>
                      </div>
                      {/*<div className="mt-2">
                        <span
                          className="inline-block bg-green-400 rounded-full px-3 py-1 font-semibold text-sm text-green-900"
                        >#vendite</span
                        >
                        <span
                          className="inline-block bg-green-400 rounded-full px-3 py-1 text-sm font-semibold text-green-900"
                        >#info</span
                        >
                      </div>*/}
                    </div>
                  </div>
                  <div className="lg:w-1/4 w-full p-2">
                    <div
                      className="border border-blue-500 rounded shadow-lg p-3 bg-blue-200"
                    >
                      <div>
                        <p className="text-xs uppercase mb-1 text-blue-700">
                          UTENTI REGISTRATI
                              </p>
                        <h3 className="text-3xl font-semibold">56,585</h3>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-1/4 w-full p-2">
                    <div
                      className="border border-green-500 rounded shadow-lg p-3 bg-green-200"
                    >
                      <div>
                        <p className="text-xs uppercase mb-1 text-green-700">
                          PRENOTAZIONI FATTE
                              </p>
                        <h3 className="text-3xl font-semibold">56,585</h3>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-1/4 w-full p-2">
                    <div
                      className="border border-pink-500 rounded shadow-lg p-3 bg-pink-200"
                    >
                      <div>
                        <p className="text-xs uppercase mb-1 text-pink-700">
                          PRENOTAZIONI PENDENTI
                              </p>
                        <h3 className="text-3xl font-semibold">56,585</h3>
                      </div>
                      <div className="mt-2">
                        <p>Win win</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/*<div className="flex flex-wrap -mx-2">
                  <div className="lg:w-1/2 md:w-1/2 w-full p-2">
                    <div className="p-4 bg-teal-200 text-teal-800 rounded shadow-lg">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptatum aspernatur ipsam voluptatem laborum perspiciatis
                      minus impedit ducimus ipsa? Deleniti error voluptatem
                      voluptatibus illum repellendus et maiores dicta quam dolores
                           <div>
                        <button
                          className="px-6 py-2 my-2 rounded-sm border-none bg-teal-900 text-white uppercase"
                        >
                          Show More
                              </button>
                      </div>
                    </div>
                  </div>
                  <div className="lg:w-1/2 md:w-1/2 w-full p-2">
                    <div className="p-4 border border-gray-800 rounded shadow-lg">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Voluptatum aspernatur ipsam voluptatem laborum perspiciatis
                      minus impedit ducimus ipsa? Deleniti error voluptatem
                      voluptatibus illum repellendus et maiores dicta quam dolores
                      ullam?
                      </div>
                  </div>
                </div>*/}
                <div className="flex flex-wrap -mx-2">
                <div className="lg:w-1/2 md:w-1/2 w-full p-2">
                  <table className="border-collapse border-2 border-gray-500">
                    <thead>
                      <tr>
                        <th className="border border-gray-400 px-4 py-2 text-gray-800">ID Negoziante</th>
                        <th className="border border-gray-400 px-4 py-2 text-gray-800">Nome negoziante</th>
                        <th className="border border-gray-400 px-4 py-2 text-gray-800"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-400 px-4 py-2">Indiana</td>
                        <td className="border border-gray-400 px-4 py-2">Indianapolis</td>
                        <td className="border border-gray-400 px-4 py-2">
                          <span>m</span>
                          <span>c</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-400 px-4 py-2">Ohio</td>
                        <td className="border border-gray-400 px-4 py-2">Columbus</td>
                        <td className="border border-gray-400 px-4 py-2">
                          <span>m</span>
                          <span>c</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-400 px-4 py-2">Michigan</td>
                        <td className="border border-gray-400 px-4 py-2">Detroit</td>
                        <td className="border border-gray-400 px-4 py-2">
                          <span>m</span>
                          <span>c</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

//<header className="App-header px-6 py-4">
//  {/*<img src={logo} className="App-logo" alt="logo" />*/}
//  <p>FERMI TUTTI SIETE DEI COGLIONI CALMATEVI</p>
//  <div className="px-6 py-4">
//    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#ALESSIO PAVAN</span>
//    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#FEDERICO GUARDIANO</span>
//    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mt-2">#JONATHAN CANEVESE</span>
//  </div>
//  <div>

//  </div>
//  <div>
//    <div className="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
//      <div className="animate-pulse flex space-x-4">
//        <div className="rounded-full bg-gray-400 h-12 w-12"></div>
//        <div className="flex-1 space-y-4 py-1">
//          <div className="h-4 bg-gray-400 rounded w-3/4"></div>
//          <div className="space-y-2">
//            <div className="h-4 bg-gray-400 rounded"></div>
//            <div className="h-4 bg-gray-400 rounded w-5/6"></div>
//          </div>
//        </div>
//      </div>
//    </div>
//  </div>
//</header>
export default App;
