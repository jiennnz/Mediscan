import React from "react";

const UnderstandModel = () => {
  return (
    <div className="flex h-full w-full flex-col  px-[16px] pt-[24px] lg:w-[50%]">
      <h1 className="text-h4 font-bold text-black">Understanding the Model</h1>
      <p className="border-b border-b-black25 pb-5 pt-[16px] text-small text-black75">
        Our decision support system employs a Convolutional Neural Network (CNN)
        trained on a comprehensive dataset of chest X-ray images. This CNN model
        has been specifically designed to recognize patterns indicative of
        pneumonia. In this section, we provide an overview of the architecture
        of our CNN model, its training process, and its role in assisting both
        individuals and medical professionals in diagnosing pneumonia.
        Understanding how the model works is essential for interpreting the
        diagnosis provided and ensuring accurate and reliable results.
      </p>
    </div>
  );
};

export default UnderstandModel;
