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
exports.compositeStorage = void 0;
const localStorage_1 = require("../../adapters/storage/local-ec2/localStorage");
const s3Storage_1 = require("../../adapters/storage/s3/s3Storage");
class compositeStorage {
    constructor() {
        this.local = new localStorage_1.localStorage();
        this.s3 = new s3Storage_1.s3Storage();
    }
    upload(archivo, nombreArchivo) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all([
                this.local.upload(archivo, nombreArchivo),
                this.s3.upload(archivo, nombreArchivo),
            ]);
        });
    }
}
exports.compositeStorage = compositeStorage;
