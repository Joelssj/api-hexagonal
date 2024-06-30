"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserController = exports.deleteUserController = exports.loginController = exports.getByIdUserController = exports.getAllController = exports.createUserController = exports.updateUserUseCase = exports.deleteUserUseCase = exports.loginUseCase = exports.getByIdUserUseCase = exports.getAllUseCase = exports.createUserUseCase = void 0;
const MysqlUsersRepository_1 = require("../../adapters/mysql/MysqlUsersRepository");
const MongodbUsersRepository_1 = require("../../adapters/mongo/MongodbUsersRepository");
const CreateUsersUseCase_1 = require("../../../application/CreateUsersUseCase");
const GetByIdUsersUseCase_1 = require("../../../application/GetByIdUsersUseCase");
const GetAllUsersUseCase_1 = require("../../../application/GetAllUsersUseCase");
const LoginUseCase_1 = require("../../../application/LoginUseCase");
const DeleteUserCase_1 = require("../../../application/DeleteUserCase");
const CreateUsersController_1 = require("../controllers/CreateUsersController");
const GetAllUsersController_1 = require("../controllers/GetAllUsersController");
const GetByIdUsersController_1 = require("../controllers/GetByIdUsersController");
const LoginController_1 = require("../controllers/LoginController");
const DeleteUserController_1 = require("../controllers/DeleteUserController");
const UpdateUsersControllers_1 = require("../controllers/UpdateUsersControllers");
const UpdateUsersCaseUse_1 = require("../../../application/UpdateUsersCaseUse");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let usersRepository;
const userRepository = process.env.DB_TYPE;
if (userRepository === "mysql") {
    usersRepository = new MysqlUsersRepository_1.MysqlUsersRepository();
}
else {
    usersRepository = new MongodbUsersRepository_1.MongodbUsersRepository();
}
exports.createUserUseCase = new CreateUsersUseCase_1.CreateUsersUseCase(usersRepository);
exports.getAllUseCase = new GetAllUsersUseCase_1.GetAllUsersUseCase(usersRepository);
exports.getByIdUserUseCase = new GetByIdUsersUseCase_1.GetByIdUsersUseCase(usersRepository);
exports.loginUseCase = new LoginUseCase_1.LoginUseCase(usersRepository);
exports.deleteUserUseCase = new DeleteUserCase_1.DeleteUsersUseCase(usersRepository);
exports.updateUserUseCase = new UpdateUsersCaseUse_1.UpdateUsersUseCase(usersRepository);
exports.createUserController = new CreateUsersController_1.CreateUsersController(exports.createUserUseCase);
exports.getAllController = new GetAllUsersController_1.GetAllUsersController(exports.getAllUseCase);
exports.getByIdUserController = new GetByIdUsersController_1.GetByIdUsersController(exports.getByIdUserUseCase);
exports.loginController = new LoginController_1.LoginController(exports.loginUseCase);
exports.deleteUserController = new DeleteUserController_1.DeleteUsersController(exports.deleteUserUseCase);
exports.updateUserController = new UpdateUsersControllers_1.UpdateUsersController(exports.updateUserUseCase);
