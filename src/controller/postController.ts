import { Request, Response } from 'express';
import * as services from '../services/postServices';
import * as user from '../services/usersServices';

export const posts = async (req: Request, res: Response) => {

    // Recebe o retorno do service, o await é usado para aguardar a resolução da promisse.
    const allPosts = await services.allPosts.findAllPosts();

    // Constante all recebe um array de strings que é retornado pelo método map() que extrai a propriedade title de cada elemento do array allPosts.
    const all = allPosts.map((post) => post.title);

    return res.status(200).json({ Títulos: `${all}` });
};

export const cretePost = async (req: Request, res: Response) => {

    try {
        const { author, body, title } = req.body;
        // Verificando se as constantes existem.
        if (author && body && title) {
            // Passando um objeto como parâmetro para a função "findUser". Como tudo que é recibido da propriedade "body" do parâmetro "req" é, por padrão, uma string, estamos convertendo a constante "author" para inteiro.
            const userDb = await user.userObjectFunctions.findUser({ id: parseInt(author) })

            if (userDb) {
                // Se o usuário existir então criamos o post.
                const newPost = await services.allPosts.createPost(userDb.idUser, body, title);
                return res.status(201).json({ Post: newPost, Usuário: userDb });

            } else {
                // Auto explicatico ne rsr.
                return res.status(404).json({ Erro: `Usuário não encontrado.` });

            }
        } else {
            // Auto explicatico ne rsr.
            return res.status(404).json({ Erro: `Dados não preenchidos.` });
        }
    } catch (err) {
        return res.status(500).json({ err })
    }
};

export const changePost = async (req: Request, res: Response) => {

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
        };
        // Caso algum campo não tenha sido preenchido.
        return res.status(400).json({ Erro: `Campos não preenchidos.` });

    } catch (err) {
         // Caso ocorra algum erro inesperado.
        return res.status(500).json({ Error: err });
    }
};

export const deletePost = async (req:Request, res:Response) => {
    
    try{
        const {id} = req.params;
        if(id){
            // Enviando no parâmetro da função "deletePost" um objeto com o "id" convertido para inteiro.
           const deletePost =  await services.allPosts.deletePost({
                id:parseInt(id)
            })
            // Operado ternário para verificar se "deletePost" é "undefined" ou não.
            return deletePost !== undefined ? res.status(200).json({deletePost}) : res.status(400).json({Erro:`Post não existe.`})

        }
    }catch(err){
        // Caso ocorra algum erro inesperado.
        return res.status(500).json({err})
    }
}