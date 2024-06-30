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
exports.GetAllProductController = void 0;
class GetAllProductController {
    constructor(getAllUsersUseCase) {
        this.getAllUsersUseCase = getAllUsersUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield this.getAllUsersUseCase.run();
                if (products) {
                    res.status(200).json(products.map((product) => {
                        return {
                            id: product.id,
                            refresco: product.refresco,
                            sabrita: product.sabrita,
                            galletas: product.galletas,
                            dulces: product.dulces
                        };
                    }));
                }
                else {
                    res.status(400).json({
                        status: "Error",
                        msn: "Ha ocurrido un problema",
                    });
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
    }
}
exports.GetAllProductController = GetAllProductController;
