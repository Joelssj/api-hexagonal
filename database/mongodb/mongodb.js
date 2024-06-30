"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.mongoose = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.mongoose = mongoose_1.default;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
    throw new Error('MONGO_URI no está definida en el archivo .env');
}
mongoose_1.default.connect(mongoUri)
    .then(() => {
    console.log('MongoDB conectado correctamente');
})
    .catch((error) => {
    console.error('Connection error:', error.message);
});
const db = mongoose_1.default.connection;
exports.db = db;
db.on('error', console.error.bind(console, 'Connection error:'));
