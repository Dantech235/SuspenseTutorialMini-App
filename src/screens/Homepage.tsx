import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Information } from "../components/utilities/hooks/UseQueryHook";
import { SuspenseType } from "../types/SuspenseType";
import StateModal from "../components/utilities/StateModal";
import LoadingIcon from "../assets/loading-icon.svg";

const Homepage = () => {
  const { data, isLoading, isPending, isError, isSuccess } = Information();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleCloseStatusModal = () => {
    setIsOpen(false);
  };

  console.log("the data is", data);
  console.log("loading?", isPending);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black w-full overflow-x-hidden min-h-screen text-gray-200">
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 z-30 fixed top-0 w-full py-5 px-5 font-bold text-[30px] text-center text-white shadow-lg">
        Welcome to Danny Suspense Tutorials
      </div>

      <div className="flex flex-wrap gap-6 justify-center pt-[100px] pb-8">
        {data?.map((info: SuspenseType) => (
          <div
            key={info.id}
            className="bg-gray-800 w-[350px] shadow-md hover:shadow-lg flex flex-col gap-4 p-4 h-[300px] rounded-lg transform hover:scale-105 transition-all duration-300"
          >
            <div className="h-full w-full text-xl font-semibold text-white">
              {info.title}
            </div>

            <div className="h-full w-full bg-gray-700 text-gray-400 p-2 rounded-md">
              {info.title}
            </div>
            {/* Buttons */}
            <div className="h-fit flex gap-4 justify-end items-center">
              <button className="px-4 py-2 cursor-pointer rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-md transition-all duration-200">
                Cancel
              </button>
              <button
                className="px-4 py-2 cursor-pointer rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all duration-200"
                onClick={() => {
                  navigate("/body");
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        ))}
      </div>
      {isLoading && (
        <div className="w-screen fixed z-30   h-screen text-blue-400 font-bold text-[24px] flex  items-center justify-center">
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
        <div className="w-screen h-screen text-blue-400 font-bold text-[24px] flex item-center justify-center">
          Error...
        </div>
      )}

      {isSuccess && isOpen && (
        <div className="fixed z-20 w-full right-4 h-full flex flex-row items-right justify-end top-[15%]">
          <StateModal onClose={handleCloseStatusModal} type="getrequest" />
        </div>
      )}
      {isError && isOpen && (
        <div className="fixed z-20 w-full right-4 h-full flex flex-row items-right justify-end top-[15%]">
          <StateModal onClose={handleCloseStatusModal} type="error" />
        </div>
      )}
    </div>
  );
};

export default Homepage;
