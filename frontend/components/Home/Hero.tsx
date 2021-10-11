import { FC } from "react";

const Hero: FC = (): JSX.Element => (
  <>
    <header className=" dark:bg-gray-800">
      <div className="container px-6 py-16 mx-auto">
        <div className="items-center md:flex">
          <div className="w-full md:w-1/2">
            <div className="max-w-lg">
              <h1 className="text-2xl font-extrabold text-gray-800 font-serif dark:text-white md:text-3xl">
                Find your <span className="text-blue-600">lost pet </span>{" "}
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                <h3>
                  Through DR Pet Spot, hundreds of people post their lost pets, and
                  they have a high success rate finding them.
                </h3>
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center w-full mt-6 md:mt-0 md:w-1/2">
            <img
              className="cover object-fill"
              src="https://res.cloudinary.com/dvoo3wu0v/image/upload/v1633983956/animals_mfvo4x.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
      <nav className="border-t-4 border-white-300"></nav>
    </header>
  </>
);

export default Hero;
