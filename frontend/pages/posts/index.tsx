import { useQuery, gql } from "@apollo/client";
import { FC } from "react";
import Loading from "../../components/common/Loading";
import { Post as PostModel } from "../../models/Post";
import Post from "../../components/Post/Post";
import { useRouter } from "next/router";

const QUERY_POSTS = gql`
  query findAllPetPosts {
    findAllPetPosts {
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

const Posts: FC = (): JSX.Element => {
  const { data, loading } = useQuery(QUERY_POSTS);

  const router = useRouter();

  return (
    <div className="container-fluid">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="ml-12">
            <h1 className="lg:text-3xl md:text-2xl text-xl  mb-7 font-bold font-serif">
              Posts
            </h1>
            <button
              onClick={() => router.push("/posts/new")}
              className="bg-transparent mb-10 hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
            >
              <span className="flex">
                Post Lost Pet
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 ml-2 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.findAllPetPosts.map((post: PostModel) => (
              <Post post={post} key={post._id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Posts;
