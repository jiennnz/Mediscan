import Image from "next/image";
import React from "react";

const HowToUse = () => {
  return (
    <div className="flex h-full w-full flex-col  px-[16px] pt-[24px] lg:w-[50%]">
      <h1 className="text-h4 font-bold text-black">How to Use</h1>
      <p className="border-b border-b-black25 pb-5 pt-[16px] text-small text-black75">
        Using our system is simple. Start by navigating to the Home Page of the
        website, and then click on the Upload Image button to select a chest
        X-ray image from your device. Once you have uploaded the image, click
        the Diagnose button to initiate the analysis. Our system will process
        the image using our trained CNN model, and you will receive a
        preliminary diagnosis along with a confidence level.
      </p>
      <div className="mt-[32px] h-[300px] w-full sm:h-[400px] 2xl:h-[500px] 2xl:w-[800px]">
        <Image
          src={"/howToUse.gif"}
          alt="how to use gif"
          height={300}
          width={300}
          className="h-full w-full rounded-lg"
        />
      </div>
    </div>
  );
};

export default HowToUse;
