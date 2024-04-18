import React from "react";

const AuthSkeleton = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col gap-[32px] sm:rounded-[20px] sm:bg-white sm:p-[56px] sm:shadow-card">
        <div className="flex items-center justify-center">
          <div className="h-[49px] w-[225px] animate-pulse rounded-md bg-gray-200"></div>
        </div>
        <div className="flex flex-col items-start gap-[16px]">
          <div className="h-[45px] w-[300px] animate-pulse rounded-md bg-gray-200"></div>
          <div className="h-[45px] w-[300px] animate-pulse rounded-md bg-gray-200"></div>
          <div className="my-[4px] h-[30px] w-[150px] animate-pulse rounded-md bg-gray-200"></div>
          <div className="h-[45px] w-[300px] animate-pulse rounded-md bg-gray-200"></div>
        </div>
        <div className="flex flex-row justify-center gap-[4px]">
          <div className="h-[30px] w-[150px] animate-pulse rounded-md bg-gray-200"></div>
          <div className="h-[30px] w-[100px] animate-pulse rounded-md bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

export default AuthSkeleton;
