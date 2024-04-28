"use client";

import { SingleImageDropzone } from "@/components/external/edgestore/SingleImageDropzone";
import { useImageUrlStore } from "@/lib/context/diagnoseFileStore";
import { useResultStore } from "@/lib/context/resultStateStore";
import { useEdgeStore } from "@/lib/edgestore";
import { generateHash } from "@/lib/server/generateHash";
import axios from "axios";
import { Types } from "mongoose";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type sessionId = {
  userId: Types.ObjectId | null;
};

export const Diagnose = ({ userId }: sessionId) => {
  const { edgestore } = useEdgeStore();
  const [file, setFile] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const setUrl = useImageUrlStore((state) => state.setUrl);
  const setResult = useResultStore((state) => state.setResult);
  const setConfidence = useResultStore((state) => state.setConfidence);
  const router = useRouter();

  const upload = async () => {
    if (!file) {
      toast.error("Please Upload a File!");
      return;
    }
    const fileData = await file.arrayBuffer();
    const buffer = Buffer.from(fileData);
    const hash = generateHash(buffer);

    const edgeStorePromise = edgestore.xrayImage.upload({
      file,
      onProgressChange: (progress) => console.log(progress),
    });

    setIsLoading(!isLoading);

    toast.promise(
      edgeStorePromise,
      {
        loading: "Initializing Diagnosis...",
        success: "File Uploaded",
        error: (error) => {
          console.log("Upload Error:", error);
          return error.response?.data?.error || "Failed to Upload";
        },
      },
      {
        success: {
          duration: 1000,
        },
      },
    );

    const response = await edgeStorePromise;
    const url = response.url;
    setResult("");
    setConfidence("");
    setUrl(url);

    let apiRoute = "diagnose";
    if (userId === null || userId === undefined) {
      apiRoute = "diagnose-no-auth";
    }

    const data = {
      url: url,
      hash: hash,
    };

    const diagnoseApiPromise = axios.post(`/api/${apiRoute}`, data);
    toast.promise(diagnoseApiPromise, {
      loading: "Scanning the Image...",
      success: "Diagnosis Done!",
      error: (error) => {
        console.log("Upload Error:", error);
        const errorMessage = error.response?.data?.error || "Failed to Upload";
        return errorMessage;
      },
    });

    const diagnoseResponse = await diagnoseApiPromise;
    if (diagnoseResponse.data?.success === false) {
      setIsLoading(false);
      toast.error("Something went wrong");
      console.log(diagnoseResponse.data?.error);
    }
    setResult(diagnoseResponse.data?.result?.predicted_label);
    setConfidence(diagnoseResponse.data?.result?.confidence_level);

    if (userId === null && diagnoseResponse.data?.success) {
      const diagnosisJson = sessionStorage.getItem("diagnosis");
      const diagnosis = diagnosisJson ? JSON.parse(diagnosisJson) : {};
      const currentIndex = Object.keys(diagnosis).length;
      const newDiagnosis = {
        ...diagnosis,
        [currentIndex]: {
          predicted_label: diagnoseResponse.data?.result?.predicted_label,
          confidence_level: diagnoseResponse.data?.result?.confidence_level,
          imageUrl: url,
        },
      };
      sessionStorage.setItem("diagnosis", JSON.stringify(newDiagnosis));
    }

    if (diagnoseResponse.data?.success) {
      setIsLoading(false);
      router.push("/diagnose");
    }
  };

  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-[24px] lg:flex-row lg:gap-[32px]">
      <div className="flex w-[80%] flex-col flex-wrap text-center lg:hidden">
        <h1 className="text-[2rem] font-bold text-main sm:text-h1">
          Pneumonia Scanner
        </h1>
        <p className="text-small text-black50 sm:text-p">
          A Decision Support System for Diagnosing Pneumonia from Chest X-Rays
        </p>
      </div>
      <div className="flex w-full items-center justify-center  lg:justify-end">
        <SingleImageDropzone
          value={file}
          onChange={(file) => {
            setFile(file);
          }}
          dropzoneOptions={{
            maxSize: 20 * 1024 * 1024,
          }}
          className="h-[200px] w-[300px] border-[2px] sm:w-[480px] md:h-[300px] lg:h-[425px] lg:w-[400px] xl:h-[480px] xl:w-[480px]"
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center lg:items-start  ">
        <div className="hidden flex-col gap-[24px] lg:mb-[80px] lg:flex ">
          <h1 className="text-h1 font-bold leading-[70px] text-main">
            Pneumonia <br /> Scanner
          </h1>
          <p className="text-p text-black50">
            A Decision Support System for Diagnosing <br />
            Pneumonia from Chest X-Rays
          </p>
        </div>
        <button
          onClick={upload}
          disabled={isLoading}
          className="anim-bg-gradient flex h-[60px] w-[300px] items-center justify-center gap-[12px] rounded-lg bg-gradient text-p font-semibold  text-white disabled:pointer-events-none disabled:opacity-70 sm:w-[480px] lg:w-[300px]"
        >
          {isLoading ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-loader-circle animate-spin text-center text-inherit"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              <p className="text-inherit">Diagnosing</p>
            </>
          ) : (
            "Diagnose"
          )}
        </button>
        <p className="mt-[8px] text-small text-black50">
          Click Diagnose to analyze X-ray and get results.
        </p>
      </div>
    </section>
  );
};
