import { useInfiniteQuery } from "@tanstack/react-query";
import { SuspenseInfiniteQueryTest } from "../components/utilities/Queries";
import { SuspenseInfiniteType } from "../types/SuspenseType";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const InfiniteSuspense = () => {
  const navigate = useNavigate();
  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    isFetching,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["suspensedata"],
    queryFn: SuspenseInfiniteQueryTest,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col gap-12 min-h-screen">
      <div className="h-[50px] bg-gradient-to-r from-gray-800 to-gray-700 w-full flex items-center justify-between px-5">
        <h1 className="text-gray-100 font-bold text-[20px]">
          Congrats!!! YOU MADE IT TO YOUR First Infinite SUSPENSE
          REQUEST😏💪💪💪
        </h1>

        <button
          className="bg-blue-500 text-white cursor-pointer rounded-2xl h-fit py-2.5 px-8 hover:bg-blue-600"
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </button>
      </div>

      <div className="p-2   overflow-y-auto flex flex-col space-y-4 h-[50vh]">
        {data?.pages.map((page, index) => (
          <div key={index} className="">
            {page.users.map((user: SuspenseInfiniteType) => (
              <div
                key={user.id}
                className="border p-2 mb-2 flex items-center justify-between rounded"
              >
                <p className="font-light">
                  <span className="font-bold text-[18px]">Name:</span>
                  {user.name}
                </p>
                <div className=" h-full w-[40%] ">
                  <p className="font-light ">
                    <span className="font-bold text-[18px]">Email:</span>
                    {user.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))}

        {isFetching && !isFetchingNextPage && (
          <div className="text-center">Fetching...</div>
        )}

        <div ref={loaderRef} className="h-10"></div>
      </div>
      <div className="py-5 w-full flex justify-end px-5">
        {isSuccess && (
          <button
            className="bg-blue-500 text-white cursor-pointer w-fit rounded-2xl py-2.5 px-8 hover:bg-blue-600"
            onClick={() => {
              navigate("/suspensequeries");
            }}
          >
            Continue...
          </button>
        )}
      </div>
    </div>
  );
};

export default InfiniteSuspense;
