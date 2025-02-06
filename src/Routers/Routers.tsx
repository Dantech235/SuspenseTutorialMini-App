import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

import Homepage from "../screens/Homepage";
import Body from "../screens/Body";
import DannySuspense from "../screens/DannySuspense";
import SummaryPage from "../screens/SummaryPage";
import InfiniteSuspense from "../screens/InfiniteSuspense";
import SuspenseQueries from "../screens/SuspenseQueries";
import LoadingIcon from "../assets/loading-icon.svg";


export const ErrorFallback = ({
  resetErrorBoundary,
}: {
  resetErrorBoundary: () => void;
}) => (
  <div className="flex flex-col items-center justify-center h-screen bg-red-100">
    <h1 className="text-2xl font-bold text-red-500">Something went wrong!</h1>
    <button
      onClick={resetErrorBoundary}
      className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
    >
      Try Again
    </button>
  </div>
);

const Routers = () => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
          <Suspense fallback={<div className="w-screen fixed z-30   h-screen text-blue-400 font-bold text-[24px] flex  items-center justify-center">
            <div>
            <img
              src={LoadingIcon}
              className="suspense-loading-icon w-[100px] h-[100px]"
              alt="Loading"
            />
          </div>
          </div>}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/body" element={<Body />} />
              <Route path="/dannysuspense" element={<DannySuspense />} />
              <Route path="/summary" element={<SummaryPage />} />
              <Route path="/infinitesuspense" element={<InfiniteSuspense />} />
              <Route path="/suspensequeries" element={<SuspenseQueries />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default Routers;
