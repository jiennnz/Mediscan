"use client";

import CustomLink from "@/components/common/CustomLink";
import { useImageUrlStore } from "@/lib/context/diagnoseFileStore";
import { useResultStore } from "@/lib/context/resultStateStore";
import clsx from "clsx";
import Image from "next/image";

const Result = () => {
  const url = useImageUrlStore((state) => state.url);
  let result = useResultStore((state) => state.result);
  const confidence = useResultStore((state) => state.confidence);

  console.log(`this is the url ${url}`);

  if (result === "Bacterial" || result === "Viral") {
    result += " Pneumonia";
  }

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
      <div className="flex w-[300px] flex-col  pt-[16px] sm:w-[45%] sm:gap-[8px] sm:pt-0 lg:gap-[32px] xl:w-[50%]">
        <div className="flex items-center  gap-[8px] sm:flex-col sm:items-start sm:gap-0">
          <h1 className=" text-p font-light text-black50 lg:text-h5">
            Results:
          </h1>
          <h1
            className={clsx(
              " text-p font-black sm:text-h4 sm:leading-[55px] lg:text-h3 xl:text-h2 xl:leading-[70px]",
              {
                "text-secondary": result === "Normal",
                "text-error": result === "Bacterial Pneumonia",
                "text-purple": result === "Viral Pneumonia",
              },
            )}
          >
            {result}
          </h1>
        </div>

        <div className="flex items-center gap-[8px] sm:flex-col sm:items-start sm:gap-0">
          <h1 className="text-p font-light text-black50 lg:text-h5">
            Confidence Level:
          </h1>
          <h1 className=" text-h6 font-black leading-[50px] text-black sm:text-h3 xl:text-h2 xl:leading-[70px]">
            {confidence}%
          </h1>
        </div>

        <div className="flex justify-center pt-[8px] sm:justify-start">
          <CustomLink
            href="/"
            text="Upload Again"
            className="anim-bg-gradient rounded-xl bg-gradient px-[64px] py-[12px] text-small text-white xl:text-p xl:font-semibold"
          />
        </div>
      </div>
    </section>
  );
};

export default Result;
