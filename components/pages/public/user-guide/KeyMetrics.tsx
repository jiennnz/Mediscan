import React from "react";

const KeyMetrics = () => {
  return (
    <div className="flex h-full w-full flex-col  px-[16px] pt-[24px] lg:w-[50%]">
      <h1 className="text-h4 font-bold text-black">Key Metrics</h1>
      <p className="border-b border-b-black25 pb-5 pt-[16px] text-small text-black75">
        Evaluating the performance of the decision support system is crucial to
        ensure its accuracy and reliability. In this section, we discuss the key
        metrics used to assess the performance of our Convolutional Neural
        Network (CNN) model. These metrics include accuracy, precision, recall,
        and F1-score. Understanding these metrics is essential for interpreting
        the effectiveness of our system in diagnosing pneumonia accurately.
      </p>
    </div>
  );
};

export default KeyMetrics;
