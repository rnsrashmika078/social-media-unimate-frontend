import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
  BlobSASPermissions,
} from "@azure/storage-blob";

export async function GET() {
  const accountName = process.env.AZURE_STORAGE_ACCOUNT!;
  const accountKey = process.env.AZURE_STORAGE_KEY!;
  const containerName = "social-media-container";

  const credential = new StorageSharedKeyCredential(accountName, accountKey);

  const blobName = `image-${Date.now()}.jpg`;

  const sasToken = generateBlobSASQueryParameters(
    {
      containerName,
      blobName,
      permissions: BlobSASPermissions.parse("cw"), // create + write
      expiresOn: new Date(new Date().valueOf() + 5 * 60 * 1000), // 5 mins
    },
    credential,
  ).toString();

  const url = `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}?${sasToken}`;

  return Response.json({ url });
}
