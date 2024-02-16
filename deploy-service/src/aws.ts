import { S3 } from "aws-sdk";
import { response } from "express";
import fs from "fs";
import path from "path";
const s3 = new S3({
  accessKeyId: "0ff03fefef5715bec83234830cdb0e9d",
  secretAccessKey:
    "20c1d57129da4b0bafcab0cf5330bd8851c68e8f0072f45c781c7af2e4f97706",
  endpoint: "https://82927d1b30378ebfd7e35bfb259c47f2.r2.cloudflarestorage.com",
});

export async function downloadS3Folder(prefix: string) {
  const allFiles = await s3
    .listObjectsV2({
      Bucket: "vercel",
      Prefix: prefix,
    })
    .promise();

  //
  const allPromises =
    allFiles.Contents?.map(async ({ Key }) => {
      return new Promise(async (resolve) => {
        if (!Key) {
          resolve("");
          return;
        }
        const finalOutputPath = path.join(__dirname, Key);
        const outputFile = fs.createWriteStream(finalOutputPath);
        const dirName = path.dirname(finalOutputPath);
        if (!fs.existsSync(dirName)) {
          fs.mkdirSync(dirName, { recursive: true });
        }
        s3.getObject({
          Bucket: "vercel",
          Key,
        })
          .createReadStream()
          .pipe(outputFile)
          .on("finish", () => {
            resolve("");
          });
      });
    }) || [];
  console.log("awaiting");
  console.log(response);
  await Promise.all(allPromises?.filter((x) => x !== undefined));
}
