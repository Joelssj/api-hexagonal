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
exports.UpdateProductController = void 0;
class UpdateProductController {
    constructor(updateProductUseCase) {
        this.updateProductUseCase = updateProductUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const data = req.body;
            console.log("mensaje " + JSON.stringify(data));
            try {
                const product = yield this.updateProductUseCase.run(id, data.refresco, data.sabrita, data.galletas, data.dulces);
                if (product) {
                    res.status(200).send({
                        status: "success",
                        data: {
                            id: product.id,
                            refresco: product.refresco,
                            sabrita: product.sabrita,
                            galletas: product.galletas,
                            dulces: product.dulces,
                        },
                    });
                }
                else {
                    res.status(404).send({
                        status: "error",
                        data: "No fue posible actualizar el registro",
                    });
                }
            }
            catch (error) {
                res.status(500).send({
                    status: "error",
                    data: "Ocurrió un error",
                    msn: error,
                });
            }
        });
    }
}
exports.UpdateProductController = UpdateProductController;
