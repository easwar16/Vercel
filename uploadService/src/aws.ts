import { S3 } from "aws-sdk";
import fs from "fs";
// ID - 0ff03fefef5715bec83234830cdb0e9d
// secret - 20c1d57129da4b0bafcab0cf5330bd8851c68e8f0072f45c781c7af2e4f97706
// endpoint - https://82927d1b30378ebfd7e35bfb259c47f2.r2.cloudflarestorage.com
const s3 = new S3({
  accessKeyId: "0ff03fefef5715bec83234830cdb0e9d",
  secretAccessKey:
    "20c1d57129da4b0bafcab0cf5330bd8851c68e8f0072f45c781c7af2e4f97706",
  endpoint: "https://82927d1b30378ebfd7e35bfb259c47f2.r2.cloudflarestorage.com",
});
export const uploadFile = async (fileName: string, localfilePath: string) => {
  const fileContent = fs.readFileSync(localfilePath);
  const response = await s3
    .upload({
      Body: fileContent,
      Bucket: "vercel",
      Key: fileName,
    })
    .promise();
  console.log(response);
};
