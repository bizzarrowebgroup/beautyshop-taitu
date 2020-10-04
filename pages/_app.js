import '../assets/css/tailwind.css';
import '../assets/css/index.css';
//import 'react-table/react-table.css';
import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router'

import NavPc from '../components/NavPc';
import NavMobile from '../components/NavMobile';
import BreadCrumb from '../components/BreadCrumb';
import RouteContext from '../config/RouteContext';
import fire from '../config/fire-config';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [actualRoute, setRoute] = useState(router.route);
  const [enabledIcon, setEnabled] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fire.auth()
      .onAuthStateChanged((user) => {
        if (user) {
          setLoggedIn(true)
        } else {
          setLoggedIn(false)
          router.push("/users/login");
        }
      });
  }, [])

  const handleLogout = () => {
    fire.auth()
      .signOut()
      .then(() => {
        console.log("---logOut ok---");
        //setNotification('Logged out')
        //setTimeout(() => {
        //  setNotification('')
        //}, 2000)
      });
  }
  const RenderTitle = useMemo(() => {
    let title = "", subTitle = "";
    console.log("--router--", router.pathname)
    //console.log("--actualRoute--", actualRoute)
    switch (router.pathname) {
      case "/":
        title = "";
        subTitle = "";
        setEnabled(false);
        break;
      case "/prenotazioni":
        title = "Prenotazioni";
        subTitle = "";
        setEnabled(false);
        break;
      case "/commercianti":
        title = "Commercianti";
        subTitle = "";
        setEnabled(true);
        break;
      case "/commercianti/new":
        title = "Commercianti";
        subTitle = "Nuovo";
        setEnabled(false);
        break;
      case "/users/login":
        title = "Login";
        break;
      //default:
      //  title = "";
      //  subTitle = "";
      //  setEnabled(false);
      //  break;
    }
    //setRoute(title);
    return {
      title,
      subTitle
    };
  }, [actualRoute, router.pathname]);
  const ShowNotification = ({ notification, notificationType }) => {
    return (
      <div className={`${notificationType == 0 ?
        "bg-red-100 border-red-400 text-red-700" : notificationType == 1 ?
          "bg-orange-100 border-orange-400 text-orange-700" : notificationType == 2 ?
            "bg-green-100 border-green-400 text-green-700" : notificationType == 3 ?
              "bg-blue-100 border-blue-400 text-blue-700" : ""} border px-4 py-3 rounded relative`} role="alert">
        <strong className="font-bold">
          {
            notificationType == 0 ?
              "Errore" : notificationType == 1 ?
                "Occhio" : notificationType == 2 ?
                  "Bravo" : notificationType == 3 ?
                    "Informazione" : ""
          }
        </strong>
        <br />
        <span className="block sm:inline">{notification}</span>
        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg className={`fill-current h-6 w-6  ${notificationType == 0 ?
            "text-red-500" : notificationType == 1 ?
              "text-orange-500" : notificationType == 2 ?
                "text-green-500" : notificationType == 3 ?
                  "text-blue-500" : ""}`} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <title>Chiudi</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </span>
      </div>
    );
  }
  //let bgImg = "https://images.unsplash.com/photo-1468429496510-236edfeeed4d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9";
  return (
    <RouteContext.Provider value={{
      RenderTitle: RenderTitle,
      enabledIcon: enabledIcon,
      loggedIn,
      handleLogout,
      ShowNotification
    }}>
      <div className="h-full lg:flex xl:justify-center bg-gray-100"
      //style={{
      //  background: RenderTitle.title == 'Login' ? `url(${bgImg}) center center no-repeat` : null,
      //  backgroundRepeat: "no-repeat",
      //  backgroundAttachment: "fixed",
      //  backgroundPosition: "center",
      //}}
      >
        {loggedIn && <NavMobile />}
        <div className="max-w-5xl flex flex-col flex-1 overflow-hidden">
          {loggedIn && <NavPc />}
          <main className="relative z-0 overflow-y-auto focus:outline-none bg-gray-100">
            <div className="xl:mx-0 pb-6 px-4 sm:px-6 md:px-6">
              {loggedIn && <BreadCrumb />}
              <Component {...pageProps} />
            </div>
          </main>
        </div>
      </div>
    </RouteContext.Provider >
  );
}