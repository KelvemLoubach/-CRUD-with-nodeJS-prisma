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
exports.deletePost = exports.changePost = exports.cretePost = exports.posts = void 0;
const services = __importStar(require("../services/postServices"));
const user = __importStar(require("../services/usersServices"));
const posts = async (req, res) => {
    // Recebe o retorno do service, o await é usado para aguardar a resolução da promisse.
    const allPosts = await services.allPosts.findAllPosts();
    // Constante all recebe um array de strings que é retornado pelo método map() que extrai a propriedade title de cada elemento do array allPosts.
    const all = allPosts.map((post) => post.title);
    return res.status(200).json({ Títulos: `${all}` });
};
exports.posts = posts;
const cretePost = async (req, res) => {
    try {
        const { author, body, title } = req.body;
        // Verificando se as constantes existem.
        if (author && body && title) {
            // Passando um objeto como parâmetro para a função "findUser". Como tudo que é recibido da propriedade "body" do parâmetro "req" é, por padrão, uma string, estamos convertendo a constante "author" para inteiro.
            const userDb = await user.userObjectFunctions.findUser({ id: parseInt(author) });
            if (userDb) {
                // Se o usuário existir então criamos o post.
                const newPost = await services.allPosts.createPost(userDb.idUser, body, title);
                return res.status(201).json({ Post: newPost, Usuário: userDb });
            }
            else {
                // Auto explicatico né rsr.
                return res.status(404).json({ Erro: `Usuário não encontrado.` });
            }
        }
        else {
            // Auto explicatico né rsr.
            return res.status(404).json({ Erro: `Dados não preenchidos.` });
        }
    }
    catch (err) {
        return res.status(500).json({ err });
    }
};
exports.cretePost = cretePost;
const changePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, body } = req.body;
        if (id && title && body) {
            // Const "postChange" recebe o retorno de services que por sua vez passa como parâmetro um objeto convertendo "id" para number.
            const postChange = await services.allPosts.changePost({
                id: parseInt(id),
                title,
                body
            });
            // Operador ternário que retorna o post alterado ou "post não encontrado".
            return postChange ? res.status(201).json({ postChange }) : res.status(409).json({ Erro: `Post não encontrado!` });
        }
        ;
        // Caso algum campo não tenha sido preenchido.
        return res.status(400).json({ Erro: `Campos não preenchidos.` });
    }
    catch (err) {
        // Caso ocorra algum erro inesperado.
        return res.status(500).json({ Error: err });
    }
};
exports.changePost = changePost;
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            // Enviando no parâmetro da função "deletePost" um objeto com o "id" convertido para inteiro.
            const deletePost = await services.allPosts.deletePost({
                id: parseInt(id)
            });
            // Operado ternário para verificar se "deletePost" é "undefined" ou não.
            return deletePost !== undefined ? res.status(200).json({ deletePost }) : res.status(400).json({ Erro: `Post não existe.` });
        }
    }
    catch (err) {
        // Caso ocorra algum erro inesperado.
        return res.status(500).json({ err });
    }
};
exports.deletePost = deletePost;
