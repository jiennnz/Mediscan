import React from "react";
import { testData } from "./historyData";
import clsx from "clsx";
import { FileDown, SquarePen, Trash2 } from "lucide-react";

const Table = () => {
  const diagnoses = testData;

  return (
    <div className="overflow-x-auto">
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
                <button onClick={() => console.log("Delete", diagnosis._id)}>
                  <Trash2 width={25} height={25} className="stroke-black75" />
                </button>
                <button onClick={() => console.log("Download", diagnosis._id)}>
                  <FileDown width={25} height={25} className="stroke-black75" />
                </button>
                <button onClick={() => console.log("Edit", diagnosis._id)}>
                  <SquarePen
                    width={25}
                    height={25}
                    className="stroke-black75"
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
