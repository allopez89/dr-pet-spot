import { FC, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar: FC = (): JSX.Element => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const router = useRouter();

  const isAuthenticated = (): boolean => {
    try {
      const token = localStorage.getItem("token");

      return Boolean(token);
    } catch (error) {
      console.log(error);

      return false;
    }
  };

  const signOut = (): void => {
    try {
      if (isAuthenticated) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");

        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-transparent bg-blue-500 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative  flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <span className="text-sm font-bold cursor-pointer leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white">
              <Link href="/">
                <span>
                  <span>DR</span>
                  Pet Spot
                </span>
              </Link>
            </span>

            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded  block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center text-white" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <span className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                  <Link href="/posts">
                    <span className="cursor-pointer">
                      <i className="fab fa-facebook-square text-lg cursor-pointer leading-lg text-white opacity-75"></i>
                      Posts
                    </span>
                  </Link>
                </span>
              </li>

              {isAuthenticated() ? (
                <li className="nav-item">
                  <span className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                    <button onClick={() => signOut()} className="font-semibold">
                      <span className="cursor-pointer">
                        <i className="fab fa-facebook-square text-lg cursor-pointer leading-lg text-white opacity-75"></i>
                        SIGN OUT
                      </span>
                    </button>
                  </span>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <span className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                      <Link href="/auth/sign-up">
                        <span className="cursor-pointer">
                          <i className="fab fa-facebook-square text-lg cursor-pointer leading-lg text-white opacity-75"></i>
                          Sign Up
                        </span>
                      </Link>
                    </span>
                  </li>
                  <li className="nav-item">
                    <span className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                      <Link href="/auth/sign-in">
                        <span className="cursor-pointer">
                          <i className="fab fa-facebook-square text-lg cursor-pointer leading-lg text-white opacity-75"></i>
                          Sign In
                        </span>
                      </Link>
                    </span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
