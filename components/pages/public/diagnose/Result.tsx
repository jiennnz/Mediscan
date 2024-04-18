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

  interface Remarks {
    [key: string]: {
      description: string[];
    };
  }

  const remarks: Remarks = {
    Normal: {
      description: ["Your lungs are healthy"],
    },
    Bacterial: {
      description: [
        "Lobar Consolidation**",
        "Air Bronchograms**",
        "Pleural Effusion**",
        "Focal Distribution**",
      ],
    },
    Viral: {
      description: [
        "Diffuse Ground-Glass Opacities (GGO)**",
        "Peribronchial Thickening**",
        "Multifocal Distribution**",
        "Interstitial Patterns**",
      ],
    },
  };

  const resultKey = Object.keys(remarks).find((key) => key === result);
  const descriptions = resultKey ? remarks[resultKey].description : [];

  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-[32px] overflow-y-auto  lg:flex-row">
      <div className="flex w-[50%] lg:justify-end">
        <Image
          alt="X-Ray Image"
          src={url}
          width={400}
          height={400}
          objectFit="cover"
          className="h-[300px] w-[300px] rounded-[15px] md:h-[350x] md:w-[350px] lg:h-[400px] lg:w-[400px] xl:h-[500px] xl:w-[500px]"
        />
      </div>

      <div className="flex w-[60%] flex-col gap-[32px] lg:w-[50%]">
        <div className="flex items-center lg:flex-col lg:items-start">
          <h6 className="text-h5 font-semibold text-black50">Results: </h6>
          <h1
            className={clsx("text-h3 font-black leading-[61px]", {
              "text-secondary": result === "Normal",
              "text-error": result === "Bacterial",
              "text-purple": result === "Viral",
            })}
          >
            {result}
          </h1>
        </div>
        <div className="flex items-center lg:flex-col lg:items-start">
          <h6 className=" text-h5 font-semibold text-black50">
            Confidence Level:
          </h6>
          <h1 className=" text-h5 font-black leading-[61px] text-main lg:text-h3">
            {confidence}%
          </h1>
        </div>
        <div className="flex items-center lg:flex-col lg:items-start">
          <h6 className="text-h5 font-semibold text-black50">Remarks: </h6>
          <ul className="list-inside list-disc pl-5">
            {descriptions.map((description, index) => (
              <li key={index} className="text-h6 font-black text-black">
                {description}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex w-full items-center  lg:flex-col lg:items-start">
          <CustomLink
            href="/user-guide"
            text="Explore how predictions are generated. Click here for an
                      in-depth explanation."
            className="text-p text-main lg:text-h6"
          />
        </div>
      </div>
    </section>
  );
};

export default Result;
