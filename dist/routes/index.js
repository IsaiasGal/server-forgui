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
const express_1 = require("express");
const EstateModel_1 = __importDefault(require("../models/EstateModel"));
const UsersModel_1 = __importDefault(require("../models/UsersModel"));
const bcrypt = require('bcrypt');
const router = (0, express_1.Router)();
router.get("/Estate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield EstateModel_1.default.find();
    res.send(task);
}));
router.get("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield UsersModel_1.default.find();
    res.send(task);
}));
router.post("/Estate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ImgURL, title, author, date, ubication, type, status, description, price, lapse } = req.body;
    const estate = new EstateModel_1.default({ ImgURL, title, author, date, ubication, type, status, description, price, lapse });
    yield estate.save();
    res.json(estate);
}));
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, username, email, passw, imgURL, description, phone } = req.body;
        // Verificar si el usuario ya está registrado
        /*const existingUser = await User.findOne({ username });
        if (existingUser) {
          return res.status(409).json({ error: 'El usuario ya existe' });
        }*/
        const hashedPassword = yield bcrypt.hash(passw, 10);
        const newUser = new UsersModel_1.default({
            name,
            username,
            email,
            passw: hashedPassword,
            imgURL,
            description,
            phone,
        });
        yield newUser.save();
        res.json(newUser);
    }
    catch (error) {
        return res.status(500).send(error);
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, passw } = req.body;
        // Buscar al usuario en la base de datos
        const user = yield UsersModel_1.default.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        // Verificar la contraseña
        const isPasswordValid = yield bcrypt.compare(passw, user.passw);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        return res.status(200).json({ message: 'Inicio de sesión exitoso' });
    }
    catch (error) {
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
}));
router.get("/Estate/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estate = yield EstateModel_1.default.findById(req.params.id);
        if (!estate)
            return res.status(404).json({ message: "Task not found" });
        return res.send(estate);
    }
    catch (error) {
        return res.status(500).send(error);
    }
}));
router.delete("/Estate/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estate = yield EstateModel_1.default.findByIdAndDelete(req.params.id);
        if (!estate)
            return res.status(404).json({ message: "Task not found" });
        return res.send(estate);
    }
    catch (error) {
        return res.status(500).send(error);
    }
}));
router.put("/Estate/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedEstate = yield EstateModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    });
    res.json(updatedEstate);
}));
exports.default = router;
