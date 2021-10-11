import { NextRouter, useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import InputError from "../../components/common/InputError";
import { gql, useMutation } from "@apollo/client";

interface NewPost {
  name: string;
  age: string;
  description: string;
  lastSeenAt: string;
  image: string;
  contactDetails: string;
  reward: string;
}

const MUTATION_NEW_POST = gql`
  mutation createPetPost($createPetPostInput: CreatePetPostInput!) {
    createPetPost(createPetPostInput: $createPetPostInput) {
      _id
      age
      contactDetails
      createdAt
      description
      image
      lastSeenAt
      name
      publisher {
        _id
        name
      }
      reward
    }
  }
`;

const New: FC = (): JSX.Element => {
  const [createPost] = useMutation(MUTATION_NEW_POST);

  const [pending, setIsPending] = useState<boolean>(false);

  const [error, setError] = useState<{ message: string | undefined }>({
    message: undefined,
  });

  const router: NextRouter = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPost>({
    mode: "onBlur",
  });

  const name = useWatch({
    control,
    name: "name",
  });

  const age = useWatch({
    control,
    name: "age",
  });

  const description = useWatch({
    control,
    name: "description",
  });

  const lastSeenAt = useWatch({
    control,
    name: "lastSeenAt",
  });

  const image = useWatch({
    control,
    name: "image",
  });

  const contactDetails = useWatch({
    control,
    name: "contactDetails",
  });

  const reward = useWatch({
    control,
    name: "reward",
  });

  useEffect(() => {
    setError(undefined);
  }, [name, age, description, lastSeenAt, image, contactDetails, reward]);

  const onSubmit = handleSubmit(async (data): Promise<void> => {
    try {
      setError(undefined);

      await createPost({
        variables: {
          createPetPostInput: {
            name: data.name,
            age: data.age,
            description: data.description,
            lastSeenAt: data.lastSeenAt,
            image: data.image,
            reward: data.reward,
            contactDetails: data.contactDetails,
          },
        },
      });

      router.push("/posts");
    } catch ({ message }) {
      setError(() => ({ message }));
    }
  });

  return (
    <div
      style={{ marginTop: "12%" }}
      className="w-full max-w-2xl px-6 py-4 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800"
    >
      <form onSubmit={onSubmit}>
        <h2 className="text-3xl font-serif font-semibold text-center text-gray-800 dark:text-white">
          Post a lost pet
        </h2>

        <div className="mt-8 ">
          <div className="items-center -mx-2 md:flex">
            <div className="w-full mx-2">
              <label className="block mb-2 font-serif text-sm font-bold text-gray-600 dark:text-gray-200">
                Name
              </label>
              <input
                {...register("name", {
                  required: "The name field is required.",
                })}
                className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                type="text"
              />
              {errors.name ? (
                <span className="text-red-500">{errors.name.message}</span>
              ) : null}
            </div>
            <div className="w-full mx-2 mt-4 md:mt-0">
              <label className="block mb-2 font-serif text-sm font-bold text-gray-600 dark:text-gray-200">
                Age
              </label>
              <input
                {...register("age", {
                  required: "The age is required.",
                })}
                className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
              {errors.age ? (
                <span className="text-red-500">{errors.age.message}</span>
              ) : null}
            </div>
          </div>
          <div className="items-center mt-3 -mx-2 md:flex">
            <div className="w-full mx-2">
              <label className="block mb-2 text-sm font-bold font-serif text-gray-600 dark:text-gray-200">
                Description
              </label>
              <textarea
                {...register("description", {
                  required: "The post description is required.",
                })}
                rows={3}
                className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
              {errors.description ? (
                <span className="text-red-500">
                  {errors.description.message}
                </span>
              ) : null}
            </div>
          </div>
          <div className="items-center mt-3 -mx-2 md:flex">
            <div className="w-full mx-2">
              <label className="block mb-2 text-sm font-bold font-serif text-gray-600 dark:text-gray-200">
                Last seen at
              </label>
              <input
                {...register("lastSeenAt", {
                  required: "The last seen at field is required.",
                })}
                className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
              {errors.lastSeenAt ? (
                <span className="text-red-500">
                  {errors.lastSeenAt.message}
                </span>
              ) : null}
            </div>
            <div className="w-full mx-2 mt-4 md:mt-0">
              <label className="block mb-2 text-sm font-bold font-serif text-gray-600 dark:text-gray-200">
                Image
              </label>
              <input
                {...register("image", {
                  required: "The image is required.",
                })}
                className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
              {errors.image ? (
                <span className="text-red-500">{errors.image.message}</span>
              ) : null}
            </div>
          </div>

          <div className="items-center mt-3 -mx-2 md:flex">
            <div className="w-full mx-2">
              <label className="block mb-2 font-serif text-sm font-bold text-gray-600 dark:text-gray-200">
                Reward
              </label>
              <input
                {...register("reward", {
                  required: "The reward field is required.",
                })}
                className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                type="text"
              />
              {errors.reward ? (
                <span className="text-red-500">{errors.reward.message}</span>
              ) : null}
            </div>
            <div className="w-full mx-2 mt-4 md:mt-0">
              <label className="block mb-2 font-serif text-sm font-bold text-gray-600 dark:text-gray-200">
                Contact Details
              </label>
              <input
                {...register("contactDetails", {
                  required: "The contact details field is required.",
                })}
                className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              />
              {errors.contactDetails ? (
                <span className="text-red-500">
                  {errors.contactDetails.message}
                </span>
              ) : null}
            </div>
          </div>
          {/* <div className="w-full mt-4">
            <label className="block mb-2 text-sm font-bold font-serif text-gray-600 dark:text-gray-200">
              Contact Details
            </label>
            <input
              {...register("contactDetails", {
                required: "This field is required.",
              })}
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              type="text"
            />
            {errors?.contactDetails ? (
              <span className="text-red-500">
                {errors.contactDetails.message}
              </span>
            ) : null}
          </div>
          <div className="-mx-3 md:flex mb-2 mt-5">
            <div className="md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block  tracking-wide font-serif font-bold text-grey-darker text-xs font-bold mb-2"
                htmlFor="grid-city"
              >
                Reward
              </label>
              <input
                {...register("reward", {
                  required: "The reward is required.",
                })}
                className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                id="grid-city"
                type="text"
              />
              {errors?.reward ? (
                <span className="text-red-500">{errors.reward.message}</span>
              ) : null}
            </div>
          </div> */}

          {error ? <InputError error={error.message} /> : null}

          <div className="flex justify-center mt-6">
            <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                />
              </svg>
              {pending && (
                <div className="animate-spin h-5 w-5 mr-3">
                  <i className="fas fa-spinner"></i>
                </div>
              )}
              {pending ? "Loading..." : "Create"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default New;
