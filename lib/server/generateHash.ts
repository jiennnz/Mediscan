import crypto from "crypto";

export function generateHash(imageData: Buffer): string {
  const hash = crypto.createHash("sha512");
  hash.update(imageData);
  return hash.digest("hex");
}
