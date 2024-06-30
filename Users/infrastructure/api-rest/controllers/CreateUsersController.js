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
exports.CreateUsersController = void 0;
class CreateUsersController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            try {
                const user = yield this.createUserUseCase.run(data.nombre, data.correo, data.password);
                if (user)
                    res.status(201).send({
                        status: "success",
                        data: {
                            id: user.id,
                            nombre: user.nombre,
                            correo: user.correo,
                            password: user.password
                        },
                    });
                else
                    res.status(204).send({
                        status: "Error de registro",
                        data: "No fue posible agregar el registro",
                    });
            }
            catch (error) {
                res.status(204).send({
                    status: "Error",
                    data: "Ha ocurrido un error",
                    msn: error,
                });
            }
        });
    }
}
exports.CreateUsersController = CreateUsersController;
