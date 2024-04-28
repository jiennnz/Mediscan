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

          // Downscale the image to reduce memory usage
          const MAX_SIZE = 1000;
          let width = img.width;
          let height = img.height;
          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          // Define the number of regions and their sizes
          const numRegions = 4; // Dividing the image into 4 regions
          const regionSize = {
            width: Math.ceil(canvas.width / 2),
            height: Math.ceil(canvas.height / 2),
          };

          // Initialize counts for different color categories
          const xrayColorCounts = Array(numRegions).fill(0);

          // Categorize pixels based on color for each region
          for (let regionIndex = 0; regionIndex < numRegions; regionIndex++) {
            const regionX = (regionIndex % 2) * regionSize.width;
            const regionY = Math.floor(regionIndex / 2) * regionSize.height;

            for (let y = regionY; y < regionY + regionSize.height; y++) {
              for (let x = regionX; x < regionX + regionSize.width; x++) {
                const pixel = ctx.getImageData(x, y, 1, 1).data;
                const r = pixel[0];
                const g = pixel[1];
                const b = pixel[2];

                // Check if the pixel is grayscale (within a grayscale range)
                if (
                  Math.abs(r - g) < 10 &&
                  Math.abs(g - b) < 10 &&
                  Math.abs(b - r) < 10
                ) {
                  xrayColorCounts[regionIndex]++;
                }
              }
            }
          }

          // Calculate percentages of X-ray colors for each region
          const regionTotalPixels = regionSize.width * regionSize.height;
          const xrayColorPercentages = xrayColorCounts.map(
            (count) => (count / regionTotalPixels) * 100,
          );

          // Check if all percentages meet the criteria
          const isXray = xrayColorPercentages.every(
            (percentage) => percentage >= 70,
          );

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
