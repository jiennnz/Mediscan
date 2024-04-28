"use client";

import CustomLink from "@/components/common/CustomLink";
import { useImageUrlStore } from "@/lib/context/diagnoseFileStore";
import { useResultStore } from "@/lib/context/resultStateStore";
import clsx from "clsx";
import Image from "next/image";

const Result = () => {
  const url = useImageUrlStore((state) => state.url);
  const result = useResultStore((state) => state.result);
  const confidence = useResultStore((state) => state.confidence);

  console.log(`this is the url ${url}`);


  return (
    <section className="flex h-full w-full flex-col items-center justify-center  sm:flex-row sm:gap-[32px]">
      <div className="flex items-end  sm:w-[55%] sm:justify-end lg:items-center xl:w-[50%]">
        <div className="relative h-[200px] w-[300px] rounded-xl border-[2px] sm:h-[300px] sm:w-[300px] md:h-[300px] lg:h-[425px] lg:w-[400px] xl:h-[480px] xl:w-[480px]">
          <Image
            alt="X-Ray Image"
            src={url}
            fill
            className="h-full w-full rounded-xl object-cover"
          />
        </div>
      </div>
      <div className="flex w-[80%] flex-col pt-[16px] sm:w-[45%] sm:gap-[24px] sm:pt-0 lg:gap-[40px] xl:w-[50%]">
        <div className="flex items-center gap-[8px] sm:flex-col sm:items-start sm:gap-0">
          <h1 className=" text-p font-semibold text-black50 lg:text-h5 xl:text-h4">
            Results:
          </h1>
          <h1
            className={clsx(
              " text-h6 font-black sm:text-h3 sm:leading-[55px] lg:text-h2 xl:text-h1 xl:leading-[70px]",
              {
                "text-secondary": result === "Normal",
                "text-error": result === "Bacterial",
                "text-purple": result === "Viral",
              },
            )}
          >
            {result}
          </h1>
        </div>

        <div className="flex items-center gap-[8px] sm:flex-col sm:items-start sm:gap-0">
          <h1 className="text-p font-semibold text-black50 lg:text-h5 xl:text-h4">
            Confidence Level:
          </h1>
          <h1 className=" text-h6 font-black leading-[50px] text-black sm:text-h3 xl:text-h2 xl:leading-[70px]">
            {confidence}%
          </h1>
        </div>

        <div className="w-[270px] pt-[8px] sm:pt-0 xl:w-[400px]">
          <CustomLink
            href="/user-guide"
            text="Explore how predictions are generated. Click here for an
                      in-depth explanation."
            className=" text-[.9rem] text-main opacity-85 sm:text-p xl:text-h6"
          />
        </div>
        <div className="mt-[16px] flex justify-center sm:justify-start">
          <CustomLink
            href="/"
            text="Upload Again"
            className="anim-bg-gradient rounded-xl bg-gradient px-[64px] py-[12px] text-small text-white"
          />
        </div>
      </div>
    </section>
  );
};

export default Result;
