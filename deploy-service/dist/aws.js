"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadS3Folder = void 0;
const aws_sdk_1 = require("aws-sdk");
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const s3 = new aws_sdk_1.S3({
    accessKeyId: "0ff03fefef5715bec83234830cdb0e9d",
    secretAccessKey: "20c1d57129da4b0bafcab0cf5330bd8851c68e8f0072f45c781c7af2e4f97706",
    endpoint: "https://82927d1b30378ebfd7e35bfb259c47f2.r2.cloudflarestorage.com",
});
function downloadS3Folder(prefix) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const allFiles = yield s3
            .listObjectsV2({
            Bucket: "vercel",
            Prefix: prefix,
        })
            .promise();
        //
        const allPromises = ((_a = allFiles.Contents) === null || _a === void 0 ? void 0 : _a.map(({ Key }) => __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                if (!Key) {
                    resolve("");
                    return;
                }
                const finalOutputPath = path_1.default.join(__dirname, Key);
                const outputFile = fs_1.default.createWriteStream(finalOutputPath);
                const dirName = path_1.default.dirname(finalOutputPath);
                if (!fs_1.default.existsSync(dirName)) {
                    fs_1.default.mkdirSync(dirName, { recursive: true });
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
            }));
        }))) || [];
        console.log("awaiting");
        console.log(express_1.response);
        yield Promise.all(allPromises === null || allPromises === void 0 ? void 0 : allPromises.filter((x) => x !== undefined));
    });
}
exports.downloadS3Folder = downloadS3Folder;
