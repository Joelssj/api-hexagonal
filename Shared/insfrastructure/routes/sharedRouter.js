"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const fileUploadController_1 = require("../api-rest/controllers/fileUploadController");
const sharedRouter = (0, express_1.Router)();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log('Received fieldname:', file.fieldname);
        if (file.fieldname === 'file') {
            cb(null, true);
        }
        else {
            console.error(`Unexpected field: ${file.fieldname}`);
            cb(new multer_1.default.MulterError('LIMIT_UNEXPECTED_FILE', file.fieldname));
        }
    }
});
const fileUploadController = new fileUploadController_1.FileUploadController();
sharedRouter.post('/upload', (req, res) => {
    console.log('Handling /upload route');
    upload.single('file')(req, res, function (err) {
        if (err instanceof multer_1.default.MulterError) {
            console.error(`MulterError: ${err.message}`);
            return res.status(400).send(`MulterError: ${err.message}`);
        }
        else if (err) {
            console.error(`Error: ${err.message}`);
            return res.status(500).send(`Error: ${err.message}`);
        }
        // Subida exitosa
        console.log('File uploaded successfully');
        fileUploadController.upload(req, res);
    });
});
exports.default = sharedRouter;
