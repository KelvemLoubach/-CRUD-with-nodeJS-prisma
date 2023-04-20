"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = __importDefault(require("./Routes/router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(router_1.default);
app.listen(process.env.PORT);
console.log(`Servidor rodando na porta: ${process.env.PORT}`);
