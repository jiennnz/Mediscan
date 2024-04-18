import React from "react";

const ResultSkeleton = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-[75%] w-full items-center justify-center gap-[32px]">
        <div className="flex w-[50%] lg:justify-end">
          <div className="h-[300px] w-[300px] animate-pulse rounded-lg bg-gray-200 md:h-[350x] md:w-[350px] lg:h-[400px] lg:w-[400px] xl:h-[500px] xl:w-[500px]"></div>
        </div>
        <div className="flex w-[60%] flex-col gap-[32px] lg:w-[50%]">
          <div className="flex items-center gap-[16px] lg:flex-col lg:items-start">
            <div className="h-[45px] w-[200px] animate-pulse rounded-lg bg-gray-200"></div>
            <div className="h-[45px] w-[300px] animate-pulse rounded-lg bg-gray-200"></div>
          </div>
          <div className="flex items-center gap-[16px] lg:flex-col lg:items-start">
            <div className="h-[45px] w-[200px] animate-pulse rounded-lg bg-gray-200"></div>
            <div className="h-[45px] w-[300px] animate-pulse rounded-lg bg-gray-200"></div>
          </div>
          <div className="flex items-center gap-[16px] lg:flex-col lg:items-start">
            <div className="h-[45px] w-[200px] animate-pulse rounded-lg bg-gray-200"></div>
            <div className="h-[80px] w-[300px] animate-pulse rounded-lg bg-gray-200"></div>
          </div>
          <div className="flex items-center gap-[16px] lg:flex-col lg:items-start">
            <div className="h-[45px] w-[500px] animate-pulse rounded-lg bg-gray-200"></div>
          </div>
        </div>
      </div>
      <div className="flex h-[25%] w-full items-center justify-center ">
        <div className="h-[50%] w-[50%] animate-pulse rounded-lg bg-gray-200 md:w-[500px] "></div>
      </div>
    </div>
  );
};

export default ResultSkeleton;
