import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: process.env.S3_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY || "",
    secretAccessKey: process.env.S3_SECRET_KEY || "",
  },
});

/**
 * Generate a presigned URL for uploading a file to S3
 */
export async function generateUploadURL(
  filename: string,
  contentType: string,
  expiresIn: number = 60 * 5 // 5 minutes
): Promise<string> {
  const key = `uploads/${Date.now()}-${filename}`;
  
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });
  
  const signedUrl = await getSignedUrl(s3Client, command, {
    expiresIn,
  });
  
  return signedUrl;
}

/**
 * Get the public URL for a file in S3
 */
export function getFileURL(key: string): string {
  return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/${key}`;
}

/**
 * Extract the S3 key from a full URL
 */
export function getKeyFromURL(url: string): string {
  const regex = new RegExp(`https?://${process.env.S3_BUCKET_NAME}.s3.${process.env.S3_REGION}.amazonaws.com/(.*)`);
  const match = url.match(regex);
  return match ? match[1] : url;
} 