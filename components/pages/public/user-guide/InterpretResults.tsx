import React from "react";

const InterpretResults = () => {
  return (
    <div className="flex h-full w-full flex-col  px-[16px] pt-[24px] lg:w-[50%]">
      <h1 className="text-h4 font-bold text-black">Interpreting Results</h1>
      <p className="border-b border-b-black25 pb-5 pt-[16px] text-small text-black75">
        Once the analysis is complete, understanding the results provided by our
        decision support system is crucial for making informed decisions. In
        this section, we explain how to interpret the diagnosis provided by our
        system and the associated confidence level. Understanding the
        interpretation of results ensures that users can utilize our system
        effectively and take appropriate actions based on the diagnosis
        provided.
      </p>
    </div>
  );
};

export default InterpretResults;
