import React from "react";

const Introduction = () => {
  return (
    <div className="flex h-full w-full flex-col px-[16px] pt-[24px] lg:w-[50%]">
      <h1 className="text-h4 font-bold text-black">Introduction</h1>
      <p className="pt-[16px] text-small text-black75">
        Welcome to the Decision Support System for Pneumonia Diagnosis
        Documentation.
      </p>
      <div className="w-full border-b border-b-black25 pt-[32px]"></div>
      <h1 className="pt-[24px] text-h5 font-bold text-black">Objective</h1>
      <p className="pt-[16px] text-small text-black75">
        Our system utilizes Convolutional Neural Networks (CNNs) to assist both
        individuals and medical professionals in understanding chest X-ray
        images and making informed decisions.
      </p>
      <p className="pt-[12px] text-small text-black75">
        Our goal is to provide a user-friendly tool that enables individuals to
        assess their chest X-ray images and prompts them to seek medical advice
        when necessary, ultimately aiding in the early detection and treatment
        of pneumonia.
      </p>
      <p className="pt-[12px] text-small text-black75">
        By leveraging the computing power of a computer for faster scanning and
        the pattern recognition capabilities of the CNN model, our system aims
        to support doctors in diagnosing pneumonia solely based on chest X-ray
        images.
      </p>
    </div>
  );
};

export default Introduction;
