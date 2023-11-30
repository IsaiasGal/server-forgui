"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const EstateSchema = new mongoose_1.Schema({
    ImgURL: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String,
        required: true,
        trim: true
    },
    ubication: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: String,
        require: true,
        trim: true
    },
    lapse: {
        type: String,
        required: true,
        trim: true
    },
}, {
    versionKey: false
});
exports.default = (0, mongoose_1.model)('Estate', EstateSchema);
