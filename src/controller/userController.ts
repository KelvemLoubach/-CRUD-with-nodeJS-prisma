import { Request, Response } from "express";
import * as services from '../services/usersServices';

export const users = async (req: Request, res: Response) => {

    // Recebendo todos os usuários.
    const users = await services.userObjectFunctions.findAllUsers();
    // Constante "allUsers" recebe um array de strings que é retornado pelo método "map()" que extrai de cada elemento do array a propriedade email.
    const allUsers = users.map((user) => user.email);

    res.status(200).json({ Usuários: `${allUsers}` });

};

export const createUser = async (req: Request, res: Response) => {
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

