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
exports.DeleteUsersController = void 0;
class DeleteUsersController {
    constructor(deleteUserUseCase) {
        this.deleteUserUseCase = deleteUserUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            try {
                const result = yield this.deleteUserUseCase.run(userId);
                if (result) {
                    res.status(200).send({
                        status: "success",
                        data: `El usuario con id:${userId} ha sido eliminado.`,
                    });
                }
                else {
                    res.status(404).send({
                        status: "Error",
                        data: `User with ID ${userId} not found.`,
                    });
                }
            }
            catch (error) {
                const errorMessage = error.message || "Unknown error";
                res.status(500).send({
                    status: "Error",
                    data: "An error occurred while trying to delete the user.",
                    message: errorMessage,
                });
            }
        });
    }
}
exports.DeleteUsersController = DeleteUsersController;
