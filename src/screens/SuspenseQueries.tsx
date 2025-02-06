import { useNavigate } from "react-router-dom";
import { useQueries } from "@tanstack/react-query";
import {
  SuspenseQueryTest,
  SuspenseQueriesTest,
} from "../components/utilities/Queries";
import { SuspenseInfiniteType, SuspensePostsType } from "../types/SuspenseType";
import manImage from "../assets/space-img.jpg";

const SuspenseQueries = () => {
  const navigate = useNavigate();

  const results = useQueries({
    queries: [
      {
        queryKey: ["posts"],
        queryFn: SuspenseQueryTest,
      },
      {
        queryKey: ["users"],
        queryFn: SuspenseQueriesTest,
      },
    ],
  });

  const posts = results[0]?.data as SuspensePostsType[];
  const users = results[1]?.data as SuspenseInfiniteType[];

  if (results[0]?.isLoading || results[1]?.isLoading)
    return <div>Loading...</div>;
  if (results[0]?.isError || results[1]?.isError)
    return <div>Error loading data!</div>;

  return (
    <div className="bg-gray-900 w-screen overflow-x-hidden h-screen text-gray-100">
      <div className="bg-gray-800 fixed top-0 z-30 w-full py-5 px-5 flex justify-between items-center shadow-lg">
        <h1 className="text-gray-100 font-bold text-[20px]">
          Congrats!!! YOU MADE IT TO YOUR Suspense Requests😏💪💪💪{" "}
        </h1>

        <button
          className="py-2.5 px-5 rounded-full bg-emerald-600 text-gray-100 hover:bg-emerald-500 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </div>

      <div className="bg-gray-800 min:h-screen w-full pt-[100px] px-5">
        <div className="">
          <div className=" h-[50%] w-[50%] flex flex-wrap gap-8 overflow-y-auto">
            {posts?.map((info) => (
              <div
                key={info.id}
                className="bg-gray-700 h-[300px] rounded-md p-5 w-[300px] shadow-md"
              >
                <div className="bg-gray-600 flex flex-col gap-3 w-full h-full rounded-md p-3">
                  <h1 className="font-bold text-[18px] text-emerald-400">
                    View User Details (Suspense)
                  </h1>
                  <div className="bg-gray-700 h-[40%] truncate w-full p-2 rounded text-gray-200">
                    UserId is: {info.userId}
                  </div>
                  <div className="bg-gray-700 h-[40%] truncate p-2 rounded text-gray-200">
                    Title: {info.title}
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="px-4 py-2 cursor-pointer rounded-lg bg-emerald-600 hover:bg-emerald-500 text-gray-100 shadow-md transition-all duration-200"
                      onClick={() => {
                        navigate("/summary");
                      }}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="h-[50%] w-[50%] flex flex-wrap gap-8 overflow-y-auto">
            {users?.map((info) => (
              <div
                key={info.id}
                className="bg-gray-700 h-[300px] rounded-md p-5 w-[300px] shadow-md"
              >
                <div className="bg-gray-600 flex flex-col gap-3 w-full h-full rounded-md p-3">
                  <h1 className="font-bold text-[18px] text-emerald-400">
                    View User Queries Details (Suspense)
                  </h1>
                  <div className="bg-gray-700 h-[40%] truncate w-full p-2 rounded text-gray-200">
                    UserId name: {info.name}
                  </div>
                  <div className="bg-gray-700 h-[40%] truncate p-2 rounded text-gray-200">
                    Title: {info.email}
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="px-4 py-2 cursor-pointer rounded-lg bg-emerald-600 hover:bg-emerald-500 text-gray-100 shadow-md transition-all duration-200"
                      onClick={() => {
                        navigate("/summary");
                      }}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="fixed z-30 top-[14%] right-3 h-full">
          <img
            src={manImage}
            alt="man"
            className="w-[600px] h-[600px] object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default SuspenseQueries;
