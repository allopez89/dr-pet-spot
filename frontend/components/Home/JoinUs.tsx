import Link from "next/link";
import { FC } from "react";

const JoinUs: FC = (): JSX.Element => {
  return (
    <section className="px-4 py-7 mt-10 mx-auto max-w-7xl">
      <div className="grid items-center grid-cols-1 mb-24 md:grid-cols-2 gap-y-10 md:gap-y-32 gap-x-10 md:gap-x-24">
        <div>
          <h2 className="mb-4 text-2xl font-serif tracking-tight text-center text-black md:leading-tight sm:text-left md:text-4xl">
            Post your lost pet <span className="text-blue-600"> for free</span>
          </h2>
          <p className="mb-12 text-base text-center text-gray-600 sm:text-left md:text-lg">
            Tired of paying for posting? DR Pet Spot allows you to post your
            lost pets for free!
          </p>
          <span className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            <Link href="/auth/sign-up">Sign up, and start posting</Link>
          </span>
        </div>

        <img
          className="max-w-md"
          src="https://res.cloudinary.com/dvoo3wu0v/image/upload/v1633984775/find-it_pfos8p.jpg"
          alt="w-full h-full py-48 bg-gray-200"
        />
      </div>
      <div className="grid flex-col-reverse items-center grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-y-32 gap-x-10 md:gap-x-24">
        <div className="order-none md:order-2">
          <h2 className="mb-4 text-2xl font-serif tracking-tight text-center text-black md:leading-tight sm:text-left md:text-4xl">
            You will <span className="text-blue-600">find it</span>
          </h2>
          <p className="mb-5 text-base text-center text-gray-600 sm:text-left md:text-lg">
            90% percent of publishers in DR Pet Spot find their lost pet within
            the first week of posting.
          </p>

          <span className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            <Link href="/posts">See Posts</Link>
          </span>
        </div>
        <img
          className="max-w-sm"
          src="https://res.cloudinary.com/dvoo3wu0v/image/upload/v1633984771/post-4-free_bo0qoe.jpg"
          alt="w-full h-full py-48 bg-gray-200"
        />
      </div>
    </section>
  );
};

export default JoinUs;
