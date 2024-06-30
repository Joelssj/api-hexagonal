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
exports.MongodbUsersRepository = void 0;
const mongodb_1 = require("../../../../database/mongodb/mongodb");
const Users_1 = require("../../../domain/Users");
const mongodb_2 = require("mongodb");
class MongodbUsersRepository {
    login(correo, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield mongodb_1.db.collection('users').findOne({ correo, password });
                if (!user)
                    return null;
                return new Users_1.Users(user._id.toString(), user.nombre, user.correo, user.password);
            }
            catch (error) {
                console.error("Error in login:", error);
                return null;
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield mongodb_1.db.collection('users').findOne({ _id: new mongodb_2.ObjectId(id) });
                if (!user)
                    return null;
                return new Users_1.Users(user._id.toString(), user.nombre, user.correo, user.password);
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
                const users = yield mongodb_1.db.collection('users').find().toArray();
                return users.map(user => new Users_1.Users(user._id.toString(), user.nombre, user.correo, user.password));
            }
            catch (error) {
                console.error("Error in getAll:", error);
                return null;
            }
        });
    }
    createUsers(nombre, correo, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = { nombre, correo, password };
                const result = yield mongodb_1.db.collection('users').insertOne(newUser);
                const userId = result.insertedId;
                const savedUser = yield mongodb_1.db.collection('users').findOne({ _id: userId });
                if (!savedUser)
                    return null;
                return new Users_1.Users(savedUser._id.toString(), savedUser.nombre, savedUser.correo, savedUser.password);
            }
            catch (error) {
                console.error("Error in createUsers:", error);
                return null;
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield mongodb_1.db.collection('users').deleteOne({ _id: new mongodb_2.ObjectId(id) });
                return result.deletedCount > 0;
            }
            catch (error) {
                console.error("Error in deleteUser:", error);
                return false;
            }
        });
    }
    updateUsers(id, nombre, correo, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateData = {};
                if (nombre)
                    updateData.nombre = nombre;
                if (correo)
                    updateData.correo = correo;
                if (password)
                    updateData.password = password;
                const result = yield mongodb_1.db.collection('users').updateOne({ _id: new mongodb_2.ObjectId(id) }, { $set: updateData });
                if (result.matchedCount === 0)
                    return null;
                const updatedUser = yield mongodb_1.db.collection('users').findOne({ _id: new mongodb_2.ObjectId(id) });
                if (!updatedUser)
                    return null;
                return new Users_1.Users(updatedUser._id.toString(), updatedUser.nombre, updatedUser.correo, updatedUser.password);
            }
            catch (error) {
                console.error("Error in updateUsers:", error);
                return null;
            }
        });
    }
}
exports.MongodbUsersRepository = MongodbUsersRepository;
