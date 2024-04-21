import crypto from "crypto";

// Function to generate SHA-256 hash for an image
export function generateHash(imageData: Buffer): string {
  const hash = crypto.createHash("sha256");
  hash.update(imageData);
  return hash.digest("hex");
}
