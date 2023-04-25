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
// Usando o middleware nativo do express "urlencoded". Esse middleware analisa solicitações post com enctype definido como "application/x-www-form-urlencoded" para tornar os dados recebidos pelo body facilmente acessíveis do lado do servidor.
// Extended: true --> Permiti o uso de objetos e matrizes aninhados, se houver.
app.use(express_1.default.urlencoded({ extended: true }));
app.use(router_1.default);
app.listen(process.env.PORT);
console.log(`Servidor rodando na porta: ${process.env.PORT}`);
