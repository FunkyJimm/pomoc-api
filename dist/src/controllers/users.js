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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../db/models/user"));
// get all users list
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    user_1.default.find()
        .then(users => {
        if (Object.keys(users).length === 0) {
            return res.status(404).send({
                message: 'Error. Users list are empty.'
            });
        }
        const usersList = users.map(user => ({
            id: user._id,
            name: user.name,
            email: user.email,
        }));
        res.send(usersList);
    }).catch(err => {
        res.status(500).send({
            message: err.message || 'Something went wrong with the server :( Try again later.'
        });
    });
});
// get user details
const getUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.userId;
    user_1.default.findById(id)
        .then(user => {
        if (!user) {
            return res.status(404).send({
                message: `User with Id: ${id} is not found.`
            });
        }
        res.send(user);
    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: `User with Id: ${id} is not found.`
            });
        }
        return res.status(500).send({
            message: `Error retrieving user with Id: ${id}. Try again later!`
        });
    });
});
// add a user
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.name && !req.body.password && !req.body.email) {
        return res.status(400).send({
            message: 'User content can not be empty.'
        });
    }
    const { name, password, email } = req.body;
    const user = new user_1.default({ name, password, email });
    user.save(err => {
        if (err) {
            res.status(500).send(err.message || 'Error. User can not be added.');
        }
        else {
            res.send('User has been successfully added.');
        }
    });
});
// update a user
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.name && !req.body.password && !req.body.email) {
        return res.status(400).send({
            message: 'User content can not be empty.'
        });
    }
    const id = req.params.userId;
    const { name, password, email } = req.body;
    const options = {
        runValidator: true,
        upsert: false,
    };
    user_1.default.findByIdAndUpdate(id, { name, password, email }, options, (err) => {
        if (err) {
            res.status(404).send({
                message: `User with Id: ${id} is not found.`
            });
        }
        else {
            res.send('User has been updated.');
        }
    });
});
// delete a user
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.userId;
    user_1.default.findByIdAndDelete(id, null, (err) => {
        if (err) {
            res.status(404).send({
                message: `User with Id: ${id} is not found.`
            });
        }
        else {
            res.send('User has been deleted.');
        }
    });
});
exports.default = {
    getUsers,
    getUserDetails,
    addUser,
    updateUser,
    deleteUser,
};
