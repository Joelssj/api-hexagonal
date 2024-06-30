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
exports.MongodbProductRepository = void 0;
const mongodb_1 = require("../../../../database/mongodb/mongodb");
const Product_1 = require("../../../domain/Product");
const mongodb_2 = require("mongodb");
class MongodbProductRepository {
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield mongodb_1.db.collection('product').findOne({ _id: new mongodb_2.ObjectId(id) });
                if (!product)
                    return null;
                return new Product_1.Product(product._id.toString(), product.refresco, product.sabrita, product.galletas, product.dulces);
            }
            catch (error) {
                console.error("Error in getById:", error);
                return null;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield mongodb_1.db.collection('product').find().toArray();
                return products.map(product => new Product_1.Product(product._id.toString(), product.refresco, product.sabrita, product.galletas, product.dulces));
            }
            catch (error) {
                console.error("Error in getAll:", error);
                return null;
            }
        });
    }
    createProduct(refresco, sabrita, galletas, dulces) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newProduct = { refresco, sabrita, galletas, dulces };
                const result = yield mongodb_1.db.collection('product').insertOne(newProduct);
                const productId = result.insertedId;
                const savedProduct = yield mongodb_1.db.collection('product').findOne({ _id: productId });
                if (!savedProduct)
                    return null;
                return new Product_1.Product(savedProduct._id.toString(), savedProduct.refresco, savedProduct.sabrita, savedProduct.galletas, savedProduct.dulces);
            }
            catch (error) {
                console.error("Error in createProduct:", error);
                return null;
            }
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield mongodb_1.db.collection('product').deleteOne({ _id: new mongodb_2.ObjectId(id) });
                return result.deletedCount > 0;
            }
            catch (error) {
                console.error("Error in deleteProduct:", error);
                return false;
            }
        });
    }
    updateProduct(id, refresco, sabrita, galletas, dulces) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateData = {};
                if (refresco)
                    updateData.refresco = refresco;
                if (sabrita)
                    updateData.sabrita = sabrita;
                if (galletas)
                    updateData.galletas = galletas;
                if (dulces)
                    updateData.dulces = dulces;
                const result = yield mongodb_1.db.collection('product').updateOne({ _id: new mongodb_2.ObjectId(id) }, { $set: updateData });
                if (result.matchedCount === 0)
                    return null;
                const updatedProduct = yield mongodb_1.db.collection('product').findOne({ _id: new mongodb_2.ObjectId(id) });
                if (!updatedProduct)
                    return null;
                return new Product_1.Product(updatedProduct._id.toString(), updatedProduct.refresco, updatedProduct.sabrita, updatedProduct.galletas, updatedProduct.dulces);
            }
            catch (error) {
                console.error("Error in updateProduct:", error);
                return null;
            }
        });
    }
}
exports.MongodbProductRepository = MongodbProductRepository;
