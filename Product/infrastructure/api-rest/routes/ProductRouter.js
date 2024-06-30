"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("../dependencies/dependencies");
const dependencies_2 = require("../dependencies/dependencies");
exports.productRouter = express_1.default.Router();
exports.productRouter.post("/crear", dependencies_1.createProductController.run.bind(dependencies_1.createProductController));
exports.productRouter.get("/get", dependencies_1.getAllProductController.run.bind(dependencies_1.getAllProductController));
exports.productRouter.get("/get/:id", dependencies_1.getByIdProductController.run.bind(dependencies_1.getByIdProductController));
exports.productRouter.delete("/delete/:id", dependencies_2.deleteProductController.run.bind(dependencies_2.deleteProductController));
exports.productRouter.put("/update/:id", dependencies_1.updateProductController.run.bind(dependencies_1.updateProductController));
