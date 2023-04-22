import { Request, Response } from "express";
import * as services from '../services/usersServices';

export const users = async (req:Request, res:Response) => {
    
    // Recebendo todos os usuários.
    const users = await services.userObjectFunctions.findAllUsers();
    // Constante "allUsers" recebe um array de strings que é retornado pelo método "map()" que extrai de cada elemento do array a propriedade email.
    const allUsers = users.map((user) => user.email);

    res.status(200).json({Usuários:`${allUsers}`});

};
