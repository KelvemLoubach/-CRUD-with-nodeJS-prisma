"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.createUser = exports.users = void 0;
const services = __importStar(require("../services/usersServices"));
const users = async (req, res) => {
    // Recebendo todos os usuários.
    const users = await services.userObjectFunctions.findAllUsers();
    // Constante "allUsers" recebe um array de strings que é retornado pelo método "map()" que extrai de cada elemento do array a propriedade email.
    const allUsers = users.map((user) => user.email);
    res.status(200).json({ Usuários: `${allUsers}` });
};
exports.users = users;
const createUser = async (req, res) => {
    // Extraindo através do "destructuring" os valores correspondentes da propriedade "body". 
    const { email, name, age } = req.body;
    // Enviando um objeto com as constantes como parâmetro para a "userObjectFunction".
    const newUser = await services.userObjectFunctions.userCreate({
        email,
        name,
        age: parseInt(age)
    });
    //Operador ternário: Se "newUser" for diferente de "undefined" retorna o novo usuário, senão retorna "usuário já cadastrado".
    return newUser !== undefined ? res.status(201).json({ newUser }) : res.status(409).json({ Erro: `Usuário já cadastrado!` });
};
exports.createUser = createUser;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            // Se existir um "id" enviamos um objeto com "id" convertido para inteiro para "deleteUser" em services.
            const userDelete = await services.userObjectFunctions.deleteUser({
                id: parseInt(id)
            });
            // Se userDelete for diferente de "undefined" retornaremos o usuário deletado, senão retornaremos um erro.
            return userDelete !== undefined ? res.status(200).json({ userDelete }) : res.status(409).json({ Erro: `Usuário não encontrado.` });
        }
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};
exports.deleteUser = deleteUser;
