import React, { useState, useEffect } from "react";
import axios from "axios";
import clsx from "clsx";
import { FileDown, SquarePen, Trash2 } from "lucide-react";
import { ObjectId } from "mongoose";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import toast from "react-hot-toast";

interface Diagnosis {
  _id: string;
  imageName: string;
  imageURL: string;
  diagnosisResult: string;
  confidenceLevel: number;
  createdAt: string;
}

const Table = () => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/history?page=${currentPage}`);
        setDiagnoses(response.data.items);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [currentPage]);

  const deleteRecord = async (id: string) => {
    try {
      const promise = axios.delete(`api/diagnosis?id=${id}`);

      toast.promise(promise, {
        loading: "Deleting Record",
        success: "Done",
        error: (error) => {
          console.log("Upload Error:", error);
          const errorMessage =
            error.response?.data?.error || "Failed to Delete";
          return errorMessage;
        },
      });
      const response = await promise;
      console.log(response.data);
      const fetchData = async () => {
        try {
          const response = await axios.get(`/api/history?page=${currentPage}`);
          setDiagnoses(response.data.items);
          setTotalPages(response.data.totalPages);
        } catch (error) {
          console.error("Failed to fetch data:", error);
        }
      };

      fetchData();
    } catch (error) {
      console.error("Failed to delete data:", error);
    }
  };

  const createPdf = async (diagnosis: Diagnosis) => {
    const pdfDoc = await PDFDocument.create();
    const timesNewRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const fontSize = 20;

    const titleText = "Diagnosis Result";
    const resultText = `Result: ${diagnosis.diagnosisResult}`;
    const confidenceText = `Confidence: ${diagnosis.confidenceLevel}%`;
    const dateText = `Date: ${new Date(diagnosis.createdAt).toLocaleDateString()}`;

    const titleWidth = timesNewRomanFont.widthOfTextAtSize(titleText, fontSize);
    const resultWidth = timesNewRomanFont.widthOfTextAtSize(
      resultText,
      fontSize,
    );
    const confidenceWidth = timesNewRomanFont.widthOfTextAtSize(
      confidenceText,
      fontSize,
    );
    const dateWidth = timesNewRomanFont.widthOfTextAtSize(dateText, fontSize);

    const maxWidth = Math.max(
      titleWidth,
      resultWidth + confidenceWidth,
      dateWidth,
    );

    page.drawText(titleText, {
      x: width / 2 - maxWidth / 2,
      y: height - 50,
      size: fontSize,
      font: timesNewRomanFont,
      color: rgb(0, 0, 0),
    });

    // Fetch image as a blob
    const imageBlob = await fetch(diagnosis.imageURL).then((res) => res.blob());

    // Convert blob to array buffer
    const imageArrayBuffer = await new Response(imageBlob).arrayBuffer();

    // Embed image into PDF document
    const image = await pdfDoc.embedJpg(imageArrayBuffer);

    // Calculate image dimensions
    const imageDims = image.scale(0.5);

    // Draw image on the PDF page
    page.drawImage(image, {
      x: width / 2 - imageDims.width / 2,
      y: height - 150 - imageDims.height,
      width: imageDims.width,
      height: imageDims.height,
    });

    // Draw text on the PDF page
    page.drawText(resultText, {
      x: width / 2 - maxWidth / 2,
      y: height - 150 - imageDims.height - 50,
      size: fontSize,
      font: timesNewRomanFont,
      color: rgb(0, 0, 0),
    });

    page.drawText(confidenceText, {
      x: width / 2 - maxWidth / 2,
      y: height - 150 - imageDims.height - 80,
      size: fontSize,
      font: timesNewRomanFont,
      color: rgb(0, 0, 0),
    });

    page.drawText(dateText, {
      x: width / 2 - maxWidth / 2,
      y: height - 150 - imageDims.height - 110,
      size: fontSize,
      font: timesNewRomanFont,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();

    // Create blob from PDF bytes
    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

    // Create blob URL
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Trigger download
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = `diagnosis_${diagnosis._id}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Revoke blob URL
    URL.revokeObjectURL(pdfUrl);
  };

  const makePdf = async (diagnosis: Diagnosis) => {
    const promise = createPdf(diagnosis);

    toast.promise(promise, {
      loading: "Creating Pdf",
      success: "Done",
      error: (error) => {
        console.log("Upload Error:", error);
        const errorMessage = error.response?.data?.error || "Failed to Create";
        return errorMessage;
      },
    });

    const result = await promise;
  };

  return (
    <div className="overflow-x-auto overflow-y-auto">
      <table className="min-w-full table-fixed border-collapse">
        <thead>
          <tr>
            <th className="w-1/6 border-b border-l border-t border-black10 p-[16px] text-left text-black">
              Name
            </th>
            <th className="w-1/6 border-b border-t border-black10 p-[16px] text-left text-black">
              URL
            </th>
            <th className="w-1/6 border-b border-t border-black10 p-[16px] text-left text-black">
              Result
            </th>
            <th className="w-1/6 border-b border-t border-black10 p-[16px] text-left text-black">
              Confidence
            </th>
            <th className="w-1/6 border-b border-t border-black10 p-[16px] text-left text-black">
              Date Created
            </th>
            <th className="w-1/6 border-b border-r border-t border-black10 p-[16px] text-left text-black">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {diagnoses.map((diagnosis, index) => (
            <tr key={diagnosis._id}>
              <td
                className={clsx(
                  "max-w-[300px] truncate border-l border-black10 p-[16px] text-black75",
                  { "border-b": index === diagnoses.length - 1 },
                )}
              >
                {diagnosis.imageName}
              </td>
              <td
                className={clsx(
                  "max-w-[200px] truncate border-black10 p-[16px] text-black75",
                  { "border-b": index === diagnoses.length - 1 },
                )}
              >
                <a
                  href={diagnosis.imageURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={diagnosis.imageURL}
                  className="text-main"
                >
                  {diagnosis.imageURL}
                </a>
              </td>
              <td
                className={clsx(
                  "border-black10 p-[16px] text-black75",
                  {
                    "text-purple": diagnosis.diagnosisResult === "Viral",
                    "text-secondary": diagnosis.diagnosisResult === "Normal",
                    "text-error": diagnosis.diagnosisResult === "Bacterial",
                  },
                  { "border-b": index === diagnoses.length - 1 },
                )}
              >
                {diagnosis.diagnosisResult}
              </td>
              <td
                className={clsx("border-black10 p-[16px] text-black75", {
                  "border-b": index === diagnoses.length - 1,
                })}
              >
                {diagnosis.confidenceLevel}
              </td>
              <td
                className={clsx("border-black10 p-[16px] text-black75", {
                  "border-b": index === diagnoses.length - 1,
                })}
              >
                {new Date(diagnosis.createdAt).toLocaleDateString()}
              </td>
              <td
                className={clsx(
                  "flex gap-[8px] border-r border-black10 p-[16px] text-black75",
                  { "border-b": index === diagnoses.length - 1 },
                )}
              >
                <button
                  onClick={() => {
                    deleteRecord(diagnosis._id);
                  }}
                >
                  <Trash2 width={25} height={25} className="stroke-black75" />
                </button>
                <button
                  onClick={() => {
                    makePdf(diagnosis);
                  }}
                >
                  <FileDown width={25} height={25} className="stroke-black75" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`mx-1 rounded px-3 py-1 ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Table;
