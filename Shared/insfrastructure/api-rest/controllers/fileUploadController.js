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
exports.FileUploadController = void 0;
const fileUploadService_1 = require("../../../application/fileUploadService");
const compositeStorage_1 = require("../compositeStorage/compositeStorage");
const storage = new compositeStorage_1.compositeStorage();
const fileUploadService = new fileUploadService_1.FileUploadService(storage);
const fileNameCounters = {}; // Contador en memoria
function generateUniqueName(baseName, extension) {
    if (!fileNameCounters[baseName]) {
        fileNameCounters[baseName] = 1;
    }
    else {
        fileNameCounters[baseName]++;
    }
    return `${baseName}-${fileNameCounters[baseName]}.${extension}`;
}
class FileUploadController {
    upload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Received file:', req.file);
                if (!req.file) {
                    console.log('No file uploaded');
                    res.status(400).send({ status: 'error', message: 'No file uploaded' });
                    return;
                }
                const archivo = req.file.buffer;
                const originalName = req.file.originalname;
                const fileExtension = originalName.split('.').pop(); // Obtener la extensión del archivo
                const baseName = originalName.replace(`.${fileExtension}`, ''); // Obtener el nombre base sin extensión
                const uniqueName = generateUniqueName(baseName, fileExtension); // Generar un nombre único basado en el contador
                yield fileUploadService.uploadFile(archivo, uniqueName);
                res.status(200).send({ status: 'success', message: 'File uploaded successfully', fileName: uniqueName });
            }
            catch (error) {
                console.error('Error uploading file:', error);
                res.status(500).send({ status: 'error', message: 'File upload failed', error });
            }
        });
    }
}
exports.FileUploadController = FileUploadController;
