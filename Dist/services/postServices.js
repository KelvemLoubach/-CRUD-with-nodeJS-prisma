"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allPosts = void 0;
const client_1 = require("@prisma/client");
// Constante prisma recebe uma nova instância de prismaClient.
const prisma = new client_1.PrismaClient();
// Exportadno o objeto allPosts que contêm propriedades com valores que são funções assincrônas que fazem buscas no db.
exports.allPosts = {
    findAllPosts: async () => {
        // Retornado com o método nativo do prisma "findMany" os posts que possuem o campo "published" com o valor true.
        return await prisma.post.findMany({
            where: {
                published: true
            }
        });
    },
    createPost: async (authorId, body, title) => {
        // Retornando o post criado com o método nativo do ORM prisma, "create". 
        return await prisma.post.create({
            data: {
                authorId,
                body,
                title
            }
        });
    },
    // Alterando um post.
    changePost: async (data) => {
        // Verificando se o post existe no db.
        const post = await prisma.post.findUnique({
            where: { idPost: data.id }
        });
        // Se existir usamos a condição "where" para recupar o post e depois passamos para o segundo parâmetro do update "data" que recebe um objeto com as propriedade a serem alteradas, essas propriedades recebem os novos valores do objeto "data" e suas respectivas propriedades.
        if (post) {
            return await prisma.post.update({
                // Primeiro parâmetro.
                where: { idPost: data.id },
                // Segundo parâmetro. 
                data: {
                    //Data é o parametro recibido pela função.
                    body: data.body,
                    title: data.title
                }
            });
        }
        ;
    },
    deletePost: async (data) => {
        const postDelete = await prisma.post.delete({
            where: { idPost: data.id }
        });
        if (postDelete) {
            return postDelete;
        }
    },
    deleteUserAndPosts: async (id) => {
        await prisma.post.deleteMany({
            where: { authorId: id }
        });
    }
};
