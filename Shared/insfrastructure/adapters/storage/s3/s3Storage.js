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
Object.defineProperty(exports, "__esModule", { value: true });
exports.s3Storage = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const lib_storage_1 = require("@aws-sdk/lib-storage");
const s3Client = new client_s3_1.S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        sessionToken: process.env.AWS_SESSION_TOKEN, // Puede ser opcional si no estás usando sesiones temporales
    },
});
class s3Storage {
    upload(archivo, nombreArchivo) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                Bucket: 'mantessj',
                Key: nombreArchivo,
                Body: archivo,
            };
            try {
                const parallelUploads3 = new lib_storage_1.Upload({
                    client: s3Client,
                    params: params,
                });
                parallelUploads3.on('httpUploadProgress', (progress) => {
                    console.log(progress);
                });
                yield parallelUploads3.done();
                console.log('File uploaded to S3 successfully');
            }
            catch (err) {
                console.error('Error uploading to S3:', err);
                throw err;
            }
        });
    }
}
exports.s3Storage = s3Storage;
