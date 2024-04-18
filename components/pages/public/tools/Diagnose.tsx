"use client";

import { SingleImageDropzone } from "@/components/external/edgestore/SingleImageDropzone";
import { useImageUrlStore } from "@/lib/context/diagnoseFileStore";
import { useResultStore } from "@/lib/context/resultStateStore";
import { useEdgeStore } from "@/lib/edgestore";
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

    const promise = edgestore.xrayImage.upload({
      file,
      onProgressChange: (progress) => console.log(progress),
    });

    toast.promise(
      promise,
      {
        loading: "Uploading File...",
        success: "File Uploaded",
        error: (error) => {
          console.log("Upload Error:", error);
          return error.response?.data?.error || "Failed to Upload";
        },
      },
      {
        success: {
          duration: 2000,
        },
      },
    );

    setIsLoading(true);
    const response = await promise;
    const url = response.url;
    setResult("");
    setConfidence("");
    setUrl(url);

    try {
      let apiRoute = "diagnose";
      if (userId === null || userId === undefined) {
        apiRoute = "diagnose-no-auth";
      }

      const urlData = { url: url };
      const promise = axios.post(`/api/${apiRoute}`, urlData);

      toast.promise(promise, {
        loading: "Initiating Diagnosis...",
        success: "Diagnosis Done!",
        error: (error) => {
          console.log("Upload Error:", error);
          const errorMessage =
            error.response?.data?.error || "Failed to Upload";
          return errorMessage;
        },
      });

      const response = await promise;
      setResult(response.data?.result?.predicted_label);
      setConfidence(response.data?.result?.confidence_level);

      if (userId === null || userId === undefined) {
        const diagnosisJson = sessionStorage.getItem("diagnosis");
        const diagnosis = diagnosisJson ? JSON.parse(diagnosisJson) : {};
        const currentIndex = Object.keys(diagnosis).length;
        const newDiagnosis = {
          ...diagnosis,
          [currentIndex]: {
            predicted_label: response.data?.result?.predicted_label,
            confidence_level: response.data?.result?.confidence_level,
            imageUrl: url,
          },
        };
        sessionStorage.setItem("diagnosis", JSON.stringify(newDiagnosis));
      }

      console.log(response.data);
      console.log(userId);
    } catch (error) {
      toast.error("Something went wrong!!");
      console.log(`Something went wrong: ${error}`);
      setIsLoading(false);
      return error;
    }

    router.push("/diagnose");
  };

  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-[32px] lg:flex-row">
      <div className="flex flex-col text-center lg:hidden">
        <h1 className="text-h3 font-semibold text-main">Pneumonia Scanner</h1>
        <p className="text-p text-black50">
          A Decision Support System for Diagnosing Pneumonia from Chest X-Rays
        </p>
      </div>
      <SingleImageDropzone
        width={480}
        height={480}
        value={file}
        onChange={(file) => {
          setFile(file);
        }}
        dropzoneOptions={{
          maxSize: 20 * 1024 * 1024,
        }}
        className=" border-[2px]"
      />
      <div className="hidden flex-col gap-[64px] lg:flex  ">
        <div className="mb-[64px] flex flex-col gap-[24px]">
          <h1 className="text-h1 font-bold leading-[70px] text-main">
            Pneumonia <br /> Scanner
          </h1>
          <p className="text-h6 text-black50">
            A Decision Support System for Diagnosing <br />
            Pneumonia from Chest X-Rays
          </p>
        </div>

        <div>
          <button
            onClick={upload}
            disabled={isLoading}
            className="anim-bg-gradient flex h-[60px] w-[300px] items-center justify-center gap-[8px] rounded-lg bg-gradient  text-h6 font-semibold text-white disabled:pointer-events-none disabled:opacity-70"
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
          <p className="mt-[8px] text-p text-black50">
            Click Diagnose to analyze X-ray and get results.
          </p>
        </div>
      </div>

      <div className="text-center lg:hidden">
        <button
          onClick={upload}
          disabled={isLoading}
          className="anim-bg-gradient flex h-[60px] w-[450px] items-center justify-center gap-[8px] rounded-lg bg-gradient  text-h6 font-semibold text-white disabled:pointer-events-none disabled:opacity-70"
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
        <p className="mt-[8px] text-p text-black50">
          Click Diagnose to analyze X-ray and get results.
        </p>
      </div>
    </section>
  );
};
