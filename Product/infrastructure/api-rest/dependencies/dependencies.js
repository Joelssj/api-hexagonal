"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductController = exports.deleteProductController = exports.getByIdProductController = exports.getAllProductController = exports.createProductController = exports.updateProductUseCase = exports.deleteProductUseCase = exports.getByIdProductUseCase = exports.getAllUseCase = exports.createProductUseCase = void 0;
const CreateProductUseCase_1 = require("../../../application/CreateProductUseCase");
const GetAllProductUseCase_1 = require("../../../application/GetAllProductUseCase");
const GetByIdProductUseCase_1 = require("../../../application/GetByIdProductUseCase");
const CreateProductController_1 = require("../controllers/CreateProductController");
const GetAllProductController_1 = require("../controllers/GetAllProductController");
const GetByIdProductController_1 = require("../controllers/GetByIdProductController");
const MysqlProductRepository_1 = require("../../adapters/mysql/MysqlProductRepository");
const MongodbProductRepository_1 = require("../../adapters/mongo/MongodbProductRepository");
const DeleteProductController_1 = require("../controllers/DeleteProductController");
const DeleteProductUseCase_1 = require("../../../application/DeleteProductUseCase");
const UpdateProductController_1 = require("../controllers/UpdateProductController");
const UpdateProductUseCase_1 = require("../../../application/UpdateProductUseCase");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let productRepository;
const productoRepository = process.env.DB_TYPE;
if (productoRepository === "mysql") {
    productRepository = new MysqlProductRepository_1.MysqlProductRepository();
}
else {
    productRepository = new MongodbProductRepository_1.MongodbProductRepository();
}
exports.createProductUseCase = new CreateProductUseCase_1.CreateProductUseCase(productRepository);
exports.getAllUseCase = new GetAllProductUseCase_1.GetAllProductUseCase(productRepository);
exports.getByIdProductUseCase = new GetByIdProductUseCase_1.GetByIdProductUseCase(productRepository);
exports.deleteProductUseCase = new DeleteProductUseCase_1.DeleteProductUseCase(productRepository);
exports.updateProductUseCase = new UpdateProductUseCase_1.UpdateProductUseCase(productRepository);
exports.createProductController = new CreateProductController_1.CreateProductController(exports.createProductUseCase);
exports.getAllProductController = new GetAllProductController_1.GetAllProductController(exports.getAllUseCase);
exports.getByIdProductController = new GetByIdProductController_1.GetByIdProductController(exports.getByIdProductUseCase);
exports.deleteProductController = new DeleteProductController_1.DeleteProductController(exports.deleteProductUseCase);
exports.updateProductController = new UpdateProductController_1.UpdateProductController(exports.updateProductUseCase);
