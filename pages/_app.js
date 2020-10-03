import '../assets/css/tailwind.css';
import '../assets/css/index.css';
//import 'react-table/react-table.css';

import NavPc from '../components/NavPc';
import NavMobile from '../components/NavMobile';
import BreadCrumb from '../components/BreadCrumb';

export default function MyApp({ Component, pageProps }) {
  //console.log("---pageProps---", JSON.stringify(Component))
  return (
    <div className="h-full lg:flex xl:justify-center bg-gray-100">
      <NavMobile />
      <div className="max-w-5xl flex flex-col flex-1 overflow-hidden">
        <NavPc />
        <main className="relative z-0 overflow-y-auto focus:outline-none bg-gray-100">
          <div className="xl:mx-0 pb-6 px-4 sm:px-6 md:px-6">
            <BreadCrumb />
            <Component {...pageProps} />
          </div>
        </main>
      </div>
    </div>
  );
}