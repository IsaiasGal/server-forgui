"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    passw: {
        type: String,
        required: true,
    },
    imgURL: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('User', UserSchema);
