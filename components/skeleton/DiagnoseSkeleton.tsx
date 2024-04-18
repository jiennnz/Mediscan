const DiagnoseSkeleton = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-[32px] lg:flex-row">
      <div className="flex flex-col items-center gap-[8px] lg:hidden">
        <div className="h-[50px] w-[400px] animate-pulse rounded-md bg-gray-200"></div>
        <div className="h-[40px] w-[500px] animate-pulse rounded-md bg-gray-200"></div>
      </div>
      <div className="h-[480px] w-[480px] animate-pulse rounded-md bg-gray-200"></div>
      <div className="hidden flex-col gap-[64px] lg:flex">
        <div className="mb-[64px] flex flex-col gap-[24px]">
          <div className="h-[80px] w-[400px] animate-pulse rounded-md bg-gray-200"></div>
          <div className="h-[60px] w-[300px] animate-pulse rounded-md bg-gray-200"></div>
        </div>

        <div>
          <div className="h-[60px] w-[300px] animate-pulse  rounded-md bg-gray-200"></div>
          <div className="mt-[8px] h-[50px] w-[300px] animate-pulse  rounded-md bg-gray-200"></div>
        </div>
      </div>
      <div className="lg:hidden">
        <div className="h-[60px] w-[300px] animate-pulse  rounded-md bg-gray-200"></div>
        <div className="mt-[8px] h-[50px] w-[300px] animate-pulse  rounded-md bg-gray-200"></div>
      </div>
    </div>
  );
};

export default DiagnoseSkeleton;
