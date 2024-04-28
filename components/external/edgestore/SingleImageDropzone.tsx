"use client";

import { X } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { useDropzone, type DropzoneOptions } from "react-dropzone";
import { twMerge } from "tailwind-merge";
import toast from "react-hot-toast";
import { checkIfXray } from "@/lib/utils/checkIfXray";

const variants = {
  base: "relative rounded-md flex justify-center items-center flex-col cursor-pointer min-h-[150px] min-w-[200px] border border-dashed border-gray-400 dark:border-gray-300 transition-colors duration-200 ease-in-out",
  image:
    "border-0 p-0 min-h-0 min-w-0 relative shadow-md bg-slate-200 dark:bg-slate-900 rounded-md",
  active: "border-2",
  disabled:
    "bg-gray-200 border-gray-300 cursor-default pointer-events-none bg-opacity-30 dark:bg-gray-700",
  accept: "border border-blue-500 bg-blue-500 bg-opacity-10",
  reject: "border border-red-700 bg-red-700 bg-opacity-10",
};

type InputProps = {
  width?: number;
  height?: number;
  className?: string;
  value?: File | string;
  onChange?: (file?: File) => void | Promise<void>;
  disabled?: boolean;
  dropzoneOptions?: Omit<DropzoneOptions, "disabled">;
};

const ERROR_MESSAGES = {
  fileTooLarge(maxSize: number) {
    return `The file is too large. Max size is ${formatFileSize(maxSize)}.`;
  },
  fileInvalidType() {
    return "Invalid file type.";
  },
  tooManyFiles(maxFiles: number) {
    return `You can only add ${maxFiles} file(s).`;
  },
  fileNotSupported() {
    return "The file is not supported.";
  },
};

const SingleImageDropzone = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { dropzoneOptions, width, height, value, className, disabled, onChange },
    ref,
  ) => {
    const imageUrl = React.useMemo(() => {
      if (typeof value === "string") {
        // in case a url is passed in, use it to display the image
        return value;
      } else if (value) {
        // in case a file is passed in, create a base64 url to display the image
        return URL.createObjectURL(value);
      }
      return null;
    }, [value]);

    // dropzone configuration
    const {
      getRootProps,
      getInputProps,
      acceptedFiles,
      fileRejections,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      accept: { "image/jpeg": [] },
      multiple: false,
      disabled,
      onDrop: (acceptedFiles) => {
        const file = acceptedFiles[0];

        const acceptImage = async () => {
          const validateIfXray = async () => {
            if (acceptedFiles.length > 0) {
              const file = acceptedFiles[0];
              const result = await checkIfXray(file);
           

              if (!result) {
                toast.error("The uploaded image is not a valid X-ray.");
                return true;
              } else {
                return false;
              }
            }
          };

          const result = await validateIfXray();

          if (!result) {
            void onChange?.(file);
          }
        };

        acceptImage();
      },
      ...dropzoneOptions,
    });

    // styling
    const dropZoneClassName = React.useMemo(
      () =>
        twMerge(
          variants.base,
          className,
          isFocused && variants.active,
          disabled && variants.disabled,
          imageUrl && variants.image,
          (isDragReject ?? fileRejections[0]) && variants.reject,
          isDragAccept && variants.accept,
        ).trim(),
      [
        isFocused,
        imageUrl,
        fileRejections,
        isDragAccept,
        isDragReject,
        disabled,
        className,
      ],
    );

    // Handle and display toast messages based on file rejections
    React.useEffect(() => {
      if (fileRejections.length > 0) {
        const { errors } = fileRejections[0];
        errors.forEach((error) => {
          switch (error.code) {
            case "file-invalid-type":
              toast.error(ERROR_MESSAGES.fileInvalidType());
              break;
            case "file-too-large":
              toast.error(
                ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0),
              );
              break;
            case "too-many-files":
              toast.error(
                ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0),
              );
              break;
            default:
              toast.error(ERROR_MESSAGES.fileNotSupported());
              break;
          }
        });
      }
    }, [fileRejections, dropzoneOptions, acceptedFiles, onChange]);
    return (
      <div>
        <div
          {...getRootProps({
            className: dropZoneClassName,
            style: {
              background: isDragAccept ? "#fff" : "transparent", // Set background color to white when a .dcm file is dropped
            },
          })}
        >
          {/* Main File Input */}
          <input ref={ref} {...getInputProps()} />

          {imageUrl ? (
            // Image Preview

            <Image
              className="h-full w-full rounded-md object-cover"
              src={imageUrl}
              alt={acceptedFiles[0]?.name}
              fill
            />
          ) : (
            // Upload Icon
            <div className="flex flex-col items-center justify-center text-xs text-gray-400">
              <div className="flex flex-col items-center justify-center gap-[8px] md:gap-[16px]">
                <div className="h-[50px] w-[50px] sm:h-[60px] sm:w-[60px] md:h-[75px] md:w-[75px] lg:h-[125px] lg:w-[125px] xl:h-[180px] xl:w-[180px] ">
                  <Image
                    src="/x-ray.png"
                    alt="x-ray upload image"
                    width={180}
                    height={180}
                    className="-rotate-3"
                    layout="responsive"
                  />
                </div>
                <h1 className="text-p font-semibold text-black75 sm:text-h6 md:text-[1.5rem] lg:text-h6">
                  Click To Upload X-Ray Image
                </h1>
                <div className="flex flex-col items-center gap-[4px] xl:gap-[8px]">
                  <p className="text-smaller text-black75  ">
                    Supported file type: JPEG (.jpg, .jpeg).
                  </p>
                  <p className="text-smaller text-black75">
                    Maximum file size:{" "}
                    <span className="text-red-500">20 MB</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Remove Image Icon */}
          {imageUrl && !disabled && (
            <div
              className="group absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 transform"
              onClick={(e) => {
                e.stopPropagation();
                void onChange?.(undefined);
              }}
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-md border border-solid border-gray-500 bg-white transition-all duration-300 hover:h-6 hover:w-6 dark:border-gray-400 dark:bg-black">
                <X
                  className="text-gray-500 dark:text-gray-400"
                  width={16}
                  height={16}
                />
              </div>
            </div>
          )}
        </div>

        {/* Error Text */}
      </div>
    );
  },
);
SingleImageDropzone.displayName = "SingleImageDropzone";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      className={twMerge(
        // base
        "focus-visible:ring-ring inline-flex cursor-pointer items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50",
        // color
        "border border-gray-400 text-gray-400 shadow hover:bg-gray-100 hover:text-gray-500 ",
        // size
        "h-6 rounded-md px-2 text-xs",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

function formatFileSize(bytes?: number) {
  if (!bytes) {
    return "0 Bytes";
  }
  bytes = Number(bytes);
  if (bytes === 0) {
    return "0 Bytes";
  }
  const k = 1024;
  const dm = 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export { SingleImageDropzone };
