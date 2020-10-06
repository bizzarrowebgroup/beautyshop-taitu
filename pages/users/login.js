import { useState, useContext } from 'react';
import fire from '../../config/fire-config';
import { useRouter } from 'next/router';
import Link from 'next/link';
import RouteContext from '../../config/RouteContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notify, setNotification] = useState('');
  const { ShowNotification } = useContext(RouteContext);
  const router = useRouter();
  const handleLogin = async e => {
    e.preventDefault();
    try {
      await fire.auth()
        .signInWithEmailAndPassword(username, password)
        .catch((err) => {
          return console.log(err);
        });
      setNotification("Login effettuato con success")
      setTimeout(() => {
        setNotification('');
        setUsername('');
        setPassword('');
        router.push("/");
      }, 2000);
    } catch (error) {
      setNotification(error.message)
      setTimeout(() => {
        setNotification(error.message)
      }, 2000);
      console.log("---loginError---", error);
    }
  }
  return (
    <div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className={`${notify == '' ? "hidden" : ""}`} style={{
          position: "absolute",
          top: 20,
          left: 0,
          right: 0,
          zIndex: 9999
        }}>
          {/*<ShowNotification notification={notify} notificationType={0} />*/}
        </div>
        {/*<img className="mx-auto h-12 w-auto" src="" />*/}
        <h2 className="mt-6 text-center text-3xl leading-9 font-bold text-gray-900">
          {"BeautyShop"}
        </h2>
        <p className="mt-2 text-center text-sm leading-5 text-gray-600 max-w">
          <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">{" Non hai un account? Registrati ora"}</Link>
        </p>
      </div>
      <div className="mt-8 mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md">
        <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
          <form className="new_user" id="new_user" action="/users/sign_in" method="post">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                {"Indirizzo Email"}
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  required="required"
                  autoFocus="autofocus"
                  autoComplete="email_address"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  type="email"
                  value={username}
                  name="user[email]"
                  id="user_email"
                  onChange={({ target }) => setUsername(target.value)}
                />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                {"Password"}
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <input
                  required="required"
                  autoComplete="current-password"
                  type="password"
                  name="user[password]"
                  id="user_password"
                  value={password}
                  onChange={({ target }) => setPassword(target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
              </div>
            </div>

            {/*<div className="mt-6 flex items-center justify-between">
              <div className="flex items-center">
                <input className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out" type="checkbox" value="1" name="user[remember_me]" id="user_remember_me" />
                <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900">
                  {"Ricordami"}
                </label>
              </div>

              <div className="text-sm leading-5">
                <a className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150" href="/users/password/new">{"Hai dimenticato la password?"}</a>
              </div>
            </div>*/}

            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
                <input onClick={handleLogin} type="submit" name="commit" value={"Accedi"} className="w-full flex justify-center py-2 px-4  border-transparent text-sm text-gray-700 font-medium rounded-md border border-gray-300 bg-white hover:bg-gray-50 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out" data-disable-with="Sign in" />
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Login
{/*<form onSubmit={handleLogin}>
  Email
  <input type="text" value={username}
    onChange={({ target }) => setUsername(target.value)} />
  <br />
  Password
  <input type="password" value={password}
    onChange={({ target }) => setPassword(target.value)} />
  <br />
  <button type="submit">Accedi</button>
</form>*/}