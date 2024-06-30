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
exports.MysqlUsersRepository = void 0;
const mysql_1 = require("../../../../database/mysql/mysql");
const Users_1 = require("../../../domain/Users");
class MysqlUsersRepository {
    login(correo, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM users WHERE correo=? and password=?";
            const params = [correo, password];
            try {
                const result = yield (0, mysql_1.query)(sql, params);
                const user = result[0][0];
                console.log(user);
                return user;
            }
            catch (error) {
                return null;
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM users WHERE id=?";
            const params = [id];
            try {
                const result = yield (0, mysql_1.query)(sql, params);
                const user = result[0][0];
                console.log(user);
                return new Users_1.Users(user.id, user.nombre, user.correo, user.password);
            }
            catch (error) {
                return null;
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "SELECT * FROM users";
            try {
                const [data] = yield (0, mysql_1.query)(sql, []);
                const dataUsers = Object.values(JSON.parse(JSON.stringify(data)));
                return dataUsers.map((user) => new Users_1.Users(user.id, user.nombre, user.correo, user.password));
            }
            catch (error) {
                return null;
            }
        });
    }
    createUsers(nombre, correo, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "INSERT INTO users (nombre, correo, password) VALUES (?, ?, ?)";
            const params = [nombre, correo, password];
            try {
                const [result] = yield (0, mysql_1.query)(sql, params);
                return new Users_1.Users(result.insertId, nombre, correo, password);
            }
            catch (error) {
                return null;
            }
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = "DELETE FROM users WHERE id=?";
            const params = [userId];
            try {
                const [result] = yield (0, mysql_1.query)(sql, params);
                return result.affectedRows > 0;
            }
            catch (error) {
                return false;
            }
        });
    }
    updateUsers(id, nombre, correo, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const fieldsToUpdate = [];
            const params = [];
            if (nombre) {
                fieldsToUpdate.push("nombre = ?");
                params.push(nombre);
            }
            if (correo) {
                fieldsToUpdate.push("correo = ?");
                params.push(correo);
            }
            if (password) {
                fieldsToUpdate.push("password = ?");
                params.push(password);
            }
            params.push(id);
            const sql = `UPDATE users SET ${fieldsToUpdate.join(", ")} WHERE id = ?`;
            try {
                const [result] = yield (0, mysql_1.query)(sql, params);
                if (result.affectedRows === 0)
                    return null;
                const updatedUser = yield this.getById(id);
                return updatedUser;
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.MysqlUsersRepository = MysqlUsersRepository;
