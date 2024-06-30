"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const dependencies_1 = require("../dependencies/dependencies");
const dependencies_2 = require("../dependencies/dependencies");
const dependencies_3 = require("../dependencies/dependencies");
const dependencies_4 = require("../dependencies/dependencies");
exports.usersRouter = express_1.default.Router();
exports.usersRouter.post("/crear", dependencies_1.createUserController.run.bind(dependencies_1.createUserController));
exports.usersRouter.post("/login", dependencies_2.loginController.run.bind(dependencies_2.loginController));
exports.usersRouter.get("/get/:id", dependencies_3.getByIdUserController.run.bind(dependencies_3.getByIdUserController));
exports.usersRouter.get("/get", dependencies_1.getAllController.run.bind(dependencies_1.getAllController));
exports.usersRouter.delete("/delete/:id", dependencies_1.deleteUserController.run.bind(dependencies_1.deleteUserController) // Usar la instancia desde dependencies
);
exports.usersRouter.put("/update/:id", dependencies_4.updateUserController.run.bind(dependencies_4.updateUserController));
