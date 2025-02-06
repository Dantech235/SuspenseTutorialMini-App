import { useNavigate } from "react-router-dom";
import { SuspenseInformation } from "../components/utilities/hooks/UseQueryHook";
import { SuspensePostsType } from "../types/SuspenseType";
import manImage from "../assets/man-image.avif";
import LoadingIcon from "../assets/loading-icon.svg";
import { useState } from "react";
import StateModal from "../components/utilities/StateModal";

const DannySuspense = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const handleCloseStatusModal = () => {
    setIsOpen(false);
  };

  const { data, isLoading, isError, isSuccess } = SuspenseInformation();

  console.log("suspense data is?", data);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data. Please try again later.</div>;

  return (
    <div className="bg-gray-900 w-screen overflow-x-hidden h-screen text-gray-100">
      <div className="bg-gray-800 fixed top-0 z-30 w-full py-5 px-5 flex justify-between items-center shadow-lg">
        <h1 className="text-gray-100 font-bold text-[20px]">
          HURRAY!!! YOU MADE IT TO YOUR FIRST SUSPENSE REQUEST😏💪💪💪{" "}
        </h1>

        <button
          className="py-2.5 px-5 rounded-full bg-emerald-600 text-gray-100 hover:bg-emerald-500 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Home
        </button>
      </div>

      <div className="bg-gray-800 min:h-screen w-full pt-[100px] px-5">
        <div className="h-fit w-[50%] flex flex-wrap   gap-8 overflow-y-auto">
          {data?.map((info: SuspensePostsType) => (
            <div className="bg-gray-700 h-[300px] rounded-md p-5 w-[300px] shadow-md">
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
        <div className="fixed  z-30 top-[14%] right-3 h-full">
          <img
            src={manImage}
            alt="man"
            className="w-[600px] h-[600px] object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
      {isLoading && (
        <div className="w-screen fixed z-30 bg-black/70  h-screen text-blue-400 font-bold text-[24px] flex  items-center justify-center">
          <div>
            <img
              src={LoadingIcon}
              className="suspense-loading-icon w-[100px] h-[100px]"
              alt="Loading"
            />
          </div>
        </div>
      )}
      {isError && (
        <div className="fixed z-50 w-full h-full flex justify-center items-center bg-black/70">
          Error
        </div>
      )}

      {isSuccess && isOpen && (
        <div className="fixed z-20 w-full right-4 h-full flex flex-row items-right justify-end top-[15%]">
          <StateModal onClose={handleCloseStatusModal} type="getrequest" />
        </div>
      )}
    </div>
  );
};

export default DannySuspense;
