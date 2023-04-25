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
exports.userObjectFunctions = void 0;
const client_1 = require("@prisma/client");
const servicesPost = __importStar(require("../services/postServices"));
const prisma = new client_1.PrismaClient();
exports.userObjectFunctions = {
    // Retorndo todos os usuários.
    findAllUsers: async () => {
        return await prisma.user.findMany({});
    },
    findUser: async (data) => {
        // Retornando apenas um usuário. Essa função assincrôna recebe como parâmetro um objeto chamado "data" do tipo "findOneData".
        return await prisma.user.findUnique({
            // Condição where recebe um objeto com a propriedade "idUser" que recebe a propriedade id do objeto data.
            where: { idUser: data.id }
        });
    },
    userCreate: async (data) => {
        // Verificando de existe um usuário cadastrado.
        const user = await prisma.user.findUnique({
            where: { email: data.email }
        });
        // Se "user" for "null", cria um usuário passando como parâmetro o objeto "data". Senão, retorna o usuário existente no db.
        if (!user) {
            return await prisma.user.create({
                data
            });
        }
    },
    deleteUser: async (data) => {
        // Verificamos se o usuário existe de fato no db. Esse método nativo do primsa "findUnique" retorna uma instâcia de um usuário ou "null".
        const userDelete = await prisma.user.findUnique({
            where: { idUser: data.id }
        });
        if (userDelete) {
            // Se "userDelete" existir vamos enviar o "id" do objeto "data" como parâmetro para a função "deleteUserAndPosts", pois como há uma relação entes as tabelas "users" e "posts" não podemos excluir um usuário sem antes excluir seus posts.
            await servicesPost.allPosts.deleteUserAndPosts(data.id);
            // Então depois de excluir os posts do usuário excluímos o usuário.
            return await prisma.user.delete({
                where: { idUser: data.id }
            });
        }
    }
};
