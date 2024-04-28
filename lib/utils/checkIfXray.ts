export const checkIfXray = async (file: File): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === "string") {
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) {
            resolve(false);
            return;
          }
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          // Define the ROI (central square covering 80% of the image)
          const roiSize = Math.min(canvas.width, canvas.height) * 0.8;
          const roiX = (canvas.width - roiSize) / 2;
          const roiY = (canvas.height - roiSize) / 2;

          // Get image data from ROI
          const roiImageData = ctx.getImageData(roiX, roiY, roiSize, roiSize);
          const totalPixels = roiImageData.width * roiImageData.height;

          // Initialize counts for different color categories
          let xrayColorCount = 0;
          let nonXrayColorCount = 0;

          // Categorize pixels based on color
          for (let i = 0; i < roiImageData.data.length; i += 4) {
            const r = roiImageData.data[i];
            const g = roiImageData.data[i + 1];
            const b = roiImageData.data[i + 2];

            // Check if the pixel is grayscale (within a grayscale range)
            if (
              Math.abs(r - g) < 10 &&
              Math.abs(g - b) < 10 &&
              Math.abs(b - r) < 10
            ) {
              xrayColorCount++;
            } else {
              nonXrayColorCount++;
            }
          }

          // Calculate percentages of different color categories
          const xrayColorPercentage = (xrayColorCount / totalPixels) * 100;
          const nonXrayColorPercentage =
            (nonXrayColorCount / totalPixels) * 100;

          // Threshold for considering the image as an X-ray (adjust as needed)
          const xrayColorThreshold = 80;

          // Check if the image meets the criteria for an X-ray
          const isXray = nonXrayColorPercentage <= xrayColorThreshold;

          resolve(isXray);
        };

        img.onerror = () => resolve(false);
        img.src = result;
      } else {
        resolve(false);
      }
    };

    reader.onerror = () => resolve(false);
    reader.readAsDataURL(file);
  });
};
