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
      <h2 className="mt-[16px] text-h6 font-bold text-black">
        Interpretation Guidelines:
      </h2>
      <p className=" pt-[16px] text-small text-black75">
        In this section, we provide interpretation guidelines to help you
        understand the diagnosis provided by our Convolutional Neural Network
        (CNN) model and the associated confidence level. Whether the result is
        normal, viral, or bacterial, knowing how to interpret the diagnosis
        ensures that you can take appropriate actions based on the results
        obtained.
      </p>
      <h3 className="mt-[16px] text-h6 font-bold text-black">
        Confidence Level
      </h3>
      <p className="pt-[8px] text-small text-black75">
        The confidence level provided with the diagnosis indicates the certainty
        of the model&apos;s prediction. A higher confidence level indicates a
        higher certainty of the diagnosis.
      </p>
      <h3 className="mt-[16px] text-h6 font-bold text-secondary">Normal</h3>
      <p className="pt-[8px] text-small text-black75">
        If the diagnosis indicates {"'Normal'"}, it suggests that no significant
        abnormalities related to pneumonia are detected in the chest X-ray
        image. However, if you are experiencing symptoms such as persistent
        cough, fever, or difficulty breathing, it is advisable to consult a
        medical professional for further evaluation.
      </p>
      <h3 className="mt-[16px] text-h6 font-bold text-purple">Viral</h3>
      <p className="pt-[8px] text-small text-black75">
        If the diagnosis indicates {"'Viral'"}, it suggests that the pneumonia
        is likely caused by a viral infection. Viral pneumonia is often
        associated with symptoms such as fever, dry cough, and difficulty
        breathing. It is important to seek medical advice for appropriate
        treatment and management.
      </p>
      <h3 className="mt-[16px] text-h6 font-bold text-error">Bacterial</h3>
      <p className="pt-[8px] text-small text-black75">
        If the diagnosis indicates {"'Bacterial'"}, it suggests that the
        pneumonia is likely caused by a bacterial infection. Bacterial pneumonia
        is often associated with symptoms such as high fever, productive cough
        with yellow or green mucus, and difficulty breathing. It is important to
        seek immediate medical attention for appropriate treatment with
        antibiotics.
      </p>
    </div>
  );
};

export default InterpretResults;
