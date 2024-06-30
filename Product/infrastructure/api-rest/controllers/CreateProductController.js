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
exports.CreateProductController = void 0;
class CreateProductController {
    constructor(createProductUseCase) {
        this.createProductUseCase = createProductUseCase;
    }
    run(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            console.log("mensaje " + JSON.stringify(data));
            try {
                const product = yield this.createProductUseCase.run(data.refresco, data.sabrita, data.galletas, data.dulces);
                if (product)
                    res.status(201).send({
                        status: "success",
                        data: {
                            id: product === null || product === void 0 ? void 0 : product.id,
                            refresco: product === null || product === void 0 ? void 0 : product.refresco,
                            sabrita: product === null || product === void 0 ? void 0 : product.sabrita,
                            galletas: product === null || product === void 0 ? void 0 : product.galletas,
                            dulces: product === null || product === void 0 ? void 0 : product.dulces,
                        },
                    });
                else
                    res.status(204).send({
                        status: "error",
                        data: "NO fue posible agregar el registro",
                    });
            }
            catch (error) {
                res.status(204).send({
                    status: "error",
                    data: "Ocurrió un error",
                    msn: error,
                });
            }
        });
    }
}
exports.CreateProductController = CreateProductController;
