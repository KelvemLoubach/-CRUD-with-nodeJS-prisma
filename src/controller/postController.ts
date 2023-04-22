import {Request, Response } from 'express';
import * as services from '../services/postServices';
import * as user from '../services/usersServices';




export const posts = async (req:Request, res:Response ) =>{

    // Recebe o retorno do service, o await é usado para aguardar a resolução da promisse.
    const allPosts = await services.allPosts.findAllPosts();

    // Constante all recebe um array de strings que é retornado pelo método map() que extrai a propriedade title de cada elemento do array allPosts.
    const all = allPosts.map((post) => post.title);

   return res.status(200).json({Títulos:`${all}`});
};

export const cretePost = async (req:Request, res:Response) =>{

    const {author, body, title} = req.body;
   // Verificando se as constantes existem.
    if(author && body && title){
         // Passando um objeto como parâmetro para a função findUser. Como tudo que é recibido da propriedade "body" do parâmetro "req" é, por padrão, uma string estamos convertendo a constante "author" para inteiro.
        const userDb = await user.userObjectFunctions.findUser({id:parseInt(author)})
        
        if(userDb){

            const newPost = await services.allPosts.createPost(userDb.idUser,body, title);
            return res.status(201).json({Post:newPost,Usuário:userDb});

        }else{

          return  res.status(404).json({Erro:`Usuário não encontrado.`});

        }
    }else{
        return res.status(404).json({Erro:`Dados não preenchidos.`});
    }

    
}