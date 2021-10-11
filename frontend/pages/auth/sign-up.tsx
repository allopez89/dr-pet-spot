import { FC, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useMutation, gql } from "@apollo/client";
import { NextRouter, useRouter } from "next/router";

type FormData = {
  email: string;
  name: string;
  password: string;
};

const MUTATION_SIGNUP = gql`
  mutation signUp($createUserInput: CreateUserInput!) {
    signUp(createUserInput: $createUserInput) {
      user {
        _id
        name
      }
      message
      token
    }
  }
`;

const SignUp: FC = () => {
  const [signUp] = useMutation(MUTATION_SIGNUP);
  const [customError, setCustomError] = useState<any>();

  const router: NextRouter = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onBlur",
  });

  const name = useWatch({
    control,
    name: "name",
  });

  const email = useWatch({
    control,
    name: "email",
  });

  const password = useWatch({
    control,
    name: "password",
  });

  useEffect(() => {
    setCustomError(null);
  }, [name, email, password]);

  useEffect((): void => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }, []);

  useEffect((): void => setCustomError(null), [name, email, password]);

  const getFullName = (name: string) => name.split(" ");

  const isFullNameEntered = (firstName: string, lastName: string): boolean => {
    return Boolean(firstName) && Boolean(lastName);
  };

  const onSubmit = handleSubmit(async (data): Promise<void> => {
    try {
      setCustomError(null);

      const [firstName, lastName] = getFullName(data.name);

      const isFullNameValid: boolean = isFullNameEntered(firstName, lastName);

      if (!isFullNameValid)
        return setCustomError(
          "The full name is required. Example: 'Porfirio Rodríguez'."
        );

      const { data: result } = await signUp({
        variables: {
          createUserInput: {
            name: firstName,
            lastName: lastName,
            email,
            password,
          },
        },
      });

      localStorage.setItem("token", result.signUp.token);

      localStorage.setItem("userId", result.signUp.user._id);

      router.push("/");
    } catch (error) {
      setCustomError(error && error.message ? error.message : error);
      console.log(error.message);
    }
  });

  return (
    <div
      style={{ marginTop: "12%" }}
      className="flex max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl"
    >
      <div
        className="hidden bg-cover lg:block lg:w-1/2"
        style={{
          backgroundImage:
            'url("https://res.cloudinary.com/dvoo3wu0v/image/upload/v1633905782/sign-up-dogs_y4bmyv.jpg")',
        }}
      />
      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <div>
          {" "}
          <p className="text-blue-500 text-4xl text-center mx-auto">
            <i className="fas fa-signature mb-8"></i>{" "}
          </p>{" "}
          <h2 className="-mt-7 mb-7 text-center text-3xl font-extrabold text-gray-900">
            Create a new account
          </h2>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-semibold text-gray-600 dark:text-gray-200"
              htmlFor="nameLogin"
            >
              Full Name
            </label>

            <input
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              placeholder="Bob Smith"
              {...register("name", {
                required: "The full name is required.",
              })}
            />
            {errors.name ? (
              <span className="text-red-500">{errors.name.message}</span>
            ) : null}
          </div>
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-semibold text-gray-600 dark:text-gray-200"
              htmlFor="LoggingEmailAddress"
            >
              Email Address
            </label>
            <input
              id="LoggingEmailAddress"
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              type="email"
              placeholder="email@gmail.com"
              {...register("email", {
                required: "The email is required.",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Invalid email address.",
                },
              })}
            />
            {errors.email ? (
              <span className="text-red-500">{errors.email.message}</span>
            ) : null}
          </div>
          <div className="mt-4">
            <div className="flex justify-between">
              <label
                className="block mb-2 text-sm font-semibold text-gray-600 dark:text-gray-200"
                htmlFor="loggingPassword"
              >
                Password
              </label>
            </div>
            <input
              id="loggingPassword"
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              type="password"
              {...register("password")}
              placeholder="***********"
              {...register("password", {
                required: "The password is required.",
              })}
            />
            {errors.password ? (
              <span className="text-red-500">{errors.password.message}</span>
            ) : null}
          </div>

          {/* {error ? <p className="text-red-500">{error}</p> : null} */}

          <div className="mt-8">
            <button
              type="submit"
              onClick={() => {}}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg
                  className="h-5 w-5 text-white-500 "
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Sign Up
            </button>
          </div>

          {customError && customError.message ? (
            <p className="text-red-500 font-semibold"> {customError.message}</p>
          ) : customError ? (
            <p className="text-red-500 font-semibold"> {customError}</p>
          ) : null}

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
