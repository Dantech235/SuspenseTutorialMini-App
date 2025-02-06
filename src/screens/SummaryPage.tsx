import { useState } from "react";
import { SuccessSuspense } from "../components/utilities/hooks/UseQueryHook";
import { useNavigate } from "react-router-dom";
import StateModal from "../components/utilities/StateModal";
import LoadingIcon from "../assets/loading-icon.svg";

const SummaryPage = () => {
  const [feedback, setFeedback] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const { isSuccess, mutate, isPending, isError } = SuccessSuspense();

  const handleSummarySubmit = () => {
    if (!feedback) {
      alert("Please give your feedback");
      return;
    }
    feedback;
    setIsOpen(true);
    mutate(feedback);
  };

  const handleCloseStatusModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-screen h-screen bg-gray-900 flex justify-center items-center">
      <div className="bg-gray-800 text-gray-200 w-[400px] h-fit rounded-2xl p-5 shadow-lg">
        <div className="w-full h-full flex flex-col gap-5 p-2.5 bg-gray-700 rounded-xl">
          <h1 className="text-[20px] font-bold text-gray-100">
            CONGRATULATIONS...😊😊
          </h1>
          <div className="bg-gray-600 flex flex-col gap-4 p-4 rounded-lg">
            <h1 className="text-gray-300">User Feedback:</h1>

            <textarea
              id="feedback"
              rows={5}
              value={feedback}
              onChange={(e) => {
                setFeedback(e.target.value);
              }}
              className="w-full outline-none bg-gray-800 text-gray-200 resize-none rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="bg-gray-700 w-full flex justify-center gap-4 items-center rounded-lg p-2">
            {isSuccess && (
              <button
                className="bg-blue-600 hover:bg-blue-500 text-gray-200 cursor-pointer px-8 rounded-2xl py-3 transition duration-300"
                onClick={() => {
                  navigate("/");
                }}
              >
                Back
              </button>
            )}

            <button
              className={`bg-green-600 hover:bg-green-500 text-gray-200 px-8 cursor-pointer rounded-2xl py-3 transition duration-300 ${
                isSuccess && "hidden"
              } `}
              onClick={handleSummarySubmit}
            >
              Submit
            </button>
            <button
              className={`bg-green-600 hover:bg-green-500 text-gray-200 px-8 cursor-pointer rounded-2xl py-3 transition duration-300 ${
                isSuccess ? "block" : "hidden"
              } `}
              onClick={() => {
                navigate("/infinitesuspense");
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      {isSuccess && isOpen && (
        <div className="fixed z-20 w-full right-4 h-full flex flex-row items-right justify-end top-4">
          <StateModal onClose={handleCloseStatusModal} type="created" />
        </div>
      )}
      {isPending && isOpen && (
        <div className="fixed z-20 w-full right-4 h-full flex flex-row items-right justify-end top-4">
          <StateModal onClose={handleCloseStatusModal} type="pending" />
        </div>
      )}
      {isError && isOpen && (
        <div className="fixed z-20 w-full right-4 h-full flex flex-row items-right justify-end top-4">
          <StateModal onClose={handleCloseStatusModal} type="error" />
        </div>
      )}
      {isPending && (
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
    </div>
  );
};

export default SummaryPage;
