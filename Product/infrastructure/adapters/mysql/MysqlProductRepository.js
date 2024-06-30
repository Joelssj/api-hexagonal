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
exports.MysqlProductRepository = void 0;
// MysqlSensorRepository.ts
const mysql_1 = require("../../../../database/mysql/mysql");
const Product_1 = require("../../../domain/Product");
class MysqlProductRepository {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM product";
            try {
                const [data] = yield (0, mysql_1.query)(sql, []);
                const dataProducts = Object.values(JSON.parse(JSON.stringify(data)));
                return dataProducts.map((product) => new Product_1.Product(product.id, product.refresco, product.sabrita, product.galletas, product.dulces));
            }
            catch (error) {
                console.error("Error al obtener datos del sensor desde MySQL:", error);
                return null;
            }
        });
    }
    getById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM product WHERE id=?";
            const params = [productId];
            try {
                const [result] = yield (0, mysql_1.query)(sql, params);
                return new Product_1.Product(result[0].id, result[0].refresco, result[0].sabrita, result[0].galletas, result[0].dulces);
            }
            catch (error) {
                return null;
            }
        });
    }
    createProduct(refresco, sabrita, galletas, dulces) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO product (refresco, sabrita, galletas, dulces) VALUES (?, ?, ?, ?)";
            const params = [refresco, sabrita, galletas, dulces];
            try {
                const [result] = yield (0, mysql_1.query)(sql, params);
                return new Product_1.Product(result.insertId, refresco, sabrita, galletas, dulces);
            }
            catch (error) {
                return null;
            }
        });
    }
    deleteProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "DELETE FROM product WHERE id=?";
            const params = [productId];
            try {
                const [result] = yield (0, mysql_1.query)(sql, params);
                return result.affectedRows > 0;
            }
            catch (error) {
                return false;
            }
        });
    }
    updateProduct(id, refresco, sabrita, galletas, dulces) {
        return __awaiter(this, void 0, void 0, function* () {
            const fieldsToUpdate = [];
            const params = [];
            if (refresco) {
                fieldsToUpdate.push("refresco = ?");
                params.push(refresco);
            }
            if (sabrita) {
                fieldsToUpdate.push("sabrita = ?");
                params.push(sabrita);
            }
            if (galletas) {
                fieldsToUpdate.push("galletas = ?");
                params.push(galletas);
            }
            if (dulces) {
                fieldsToUpdate.push("dulces = ?");
                params.push(dulces);
            }
            params.push(id);
            const sql = `UPDATE product SET ${fieldsToUpdate.join(", ")} WHERE id = ?`;
            try {
                const [result] = yield (0, mysql_1.query)(sql, params);
                if (result.affectedRows === 0)
                    return null;
                const updatedProduct = yield this.getById(id);
                return updatedProduct;
            }
            catch (error) {
                console.error("Error in updateProduct:", error);
                return null;
            }
        });
    }
}
exports.MysqlProductRepository = MysqlProductRepository;
