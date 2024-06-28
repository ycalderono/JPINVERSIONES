// utils/s3.ts

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
    region: "us-east-2",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

export async function uploadToS3(file: Buffer, fileName: string) {
    const command = new PutObjectCommand({
        Bucket: "jpwallpapers-content", // Nombre del bucket
        Key: `payment-proofs/${fileName}`,
        Body: file,
      });

  await s3Client.send(command);

  // Generar URL firmada para acceso temporal
  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

  return signedUrl;
}